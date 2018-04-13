'use strict';

const {customer, agent} = require('../config');

const sessionCache = new Map();
const subscriptionCache = new Map();
const agentSubscriptionCache = new Map();
const {toAgentUserName} = require('../lib/agent');

async function fetchCustomerSession({
  cache,
  customerId,
  tokenResource: {retrieve, create},
}) {
  if (!cache.has(customerId)) {
    try {
      cache.set(customerId, await retrieve(customerId));
    } catch (err) {
      if (err.code !== 'RESOURCE_NOT_FOUND') {
        throw err;
      }

      cache.set(
        customerId,
        await create({
          id: customerId,
          userId: customerId,
          description: 'Customer Session',
        })
      );
    }
  }

  return cache.get(customerId);
}

async function fetchCustomerSubscription({
  cache,
  customerId,
  subscriptionResource: {retrieve, create},
}) {
  if (!cache.has(customerId)) {
    try {
      cache.set(customerId, await retrieve(customerId));
    } catch (err) {
      if (err.code !== 'RESOURCE_NOT_FOUND') {
        throw err;
      }

      cache.set(
        customerId,
        await create({
          id: customerId,
          channelId: customerId,
          userId: customerId,
          allowWrite: true,
          allowRead: true,
        })
      );
    }
  }

  return cache.get(customerId);
}

async function ensureAgentSubscription({
  cache,
  agentId,
  channelId,
  subscriptionResource: {retrieve, create},
}) {
  const subscriptionKey = `${agentId}-${channelId}`;
  if (!cache.has(subscriptionKey)) {
    try {
      cache.set(subscriptionKey, await retrieve(subscriptionKey));
    } catch (err) {
      if (err.code !== 'RESOURCE_NOT_FOUND') {
        throw err;
      }

      cache.set(
        subscriptionKey,
        await create({
          id: subscriptionKey,
          channelId,
          userId: agentId,
          allowWrite: true,
          allowRead: true,
        })
      );
    }
  }

  return cache.get(subscriptionKey);
}

module.exports = {
  async retrieve(req, res) {
    const {realmq} = req.app.locals;
    const customerId = customer.userId;

    const session = await fetchCustomerSession({
      cache: sessionCache,
      customerId,
      tokenResource: realmq.tokens,
    });

    const subscription = await fetchCustomerSubscription({
      cache: subscriptionCache,
      customerId,
      subscriptionResource: realmq.subscriptions,
    });

    // Run in background
    ensureAgentSubscription({
      cache: agentSubscriptionCache,
      agentId: toAgentUserName(agent.username),
      channelId: customerId,
      subscriptionResource: realmq.subscriptions,
    });

    res.json({
      userId: customerId,
      token: session.token,
      channel: subscription.channelId,
    });
  },
};
