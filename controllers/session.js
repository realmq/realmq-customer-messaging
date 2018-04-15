'use strict';

const uuid = require('uuid');
const Moniker = require('moniker');
const {agent} = require('../config');

const agentSubscriptionCache = new Map();
const {toAgentUserName} = require('../lib/agent');

const generateChannelName = () => {
  return Moniker.generator([Moniker.adjective, Moniker.noun]).choose();
};

/**
 * Tries to fetch customer session from session storage and creates a new one if none exists
 *
 * @param {Object} sessionContainer
 * @param {Function} createToken
 * @param {Object} channelResource
 * @param {Object} subscriptionResource
 * @return {Promise.<{userId: string, channel: string, token : string}>}
 */
async function fetchCustomerSession({
  sessionContainer,
  tokenResource: {create: createToken},
  channelResource,
  subscriptionResource,
}) {
  if (!sessionContainer.customer) {
    const userId = uuid.v4();
    const {channelId} = await fetchCustomerSubscription({
      userId,
      channelResource,
      subscriptionResource,
    });

    sessionContainer.customer = {
      userId,
      channel: channelId,
    };
  }

  // Always create new token
  const {token} = await createToken({
    userId: sessionContainer.customer.userId,
    description: 'Customer session token',
  });

  return {...sessionContainer.customer, token};
}

/**
 * Tries to fetch the customer subscription and creates a new one if none exists
 *
 * @param {string} userId
 * @param {Function} retrieveSubscription
 * @param {Function} createSubscription
 * @param {Function} createChannel
 * @return {Promise.<{channelId: string}>}
 */
async function fetchCustomerSubscription({
  userId,
  subscriptionResource: {
    retrieve: retrieveSubscription,
    create: createSubscription,
  },
  channelResource: {create: createChannel},
}) {
  const subscriptionId = `subscription-${userId}`;
  const channelId = `customer-channel-${userId}`;
  let subscription;

  try {
    subscription = await retrieveSubscription(subscriptionId);
  } catch (err) {
    if (err.code !== 'RESOURCE_NOT_FOUND') {
      throw err;
    }

    const channel = await createChannel({
      id: channelId,
      properties: {
        name: generateChannelName(),
      },
    });

    subscription = await createSubscription({
      id: subscriptionId,
      channelId: channel.id,
      userId,
      allowWrite: true,
      allowRead: true,
    });
  }

  return subscription;
}

/**
 * Ensures that the agent is also subscribed to the customer chat channel
 *
 * @param {Map} subscriptionCache
 * @param {string} agentId
 * @param {string} channelId
 * @param {Function} retrieveSubscription
 * @param {Function} createSubscription
 * @return {Promise.<Object>}
 */
async function ensureAgentSubscription({
  subscriptionCache,
  agentId,
  channelId,
  subscriptionResource: {
    retrieve: retrieveSubscription,
    create: createSubscription,
  },
}) {
  const subscriptionKey = `${agentId}-${channelId}`;
  if (!subscriptionCache.has(subscriptionKey)) {
    try {
      subscriptionCache.set(
        subscriptionKey,
        await retrieveSubscription(subscriptionKey)
      );
    } catch (err) {
      if (err.code !== 'RESOURCE_NOT_FOUND') {
        throw err;
      }

      subscriptionCache.set(
        subscriptionKey,
        await createSubscription({
          id: subscriptionKey,
          channelId,
          userId: agentId,
          allowWrite: true,
          allowRead: true,
        })
      );
    }
  }

  return subscriptionCache.get(subscriptionKey);
}

module.exports = {
  async retrieve(req, res) {
    const {realmq} = req.app.locals;

    const {userId, token, channel} = await fetchCustomerSession({
      sessionContainer: req.session,
      tokenResource: realmq.tokens,
      channelResource: realmq.channels,
      subscriptionResource: realmq.subscriptions,
    });

    // Run in background
    ensureAgentSubscription({
      subscriptionCache: agentSubscriptionCache,
      agentId: toAgentUserName(agent.username),
      channelId: channel,
      subscriptionResource: realmq.subscriptions,
    });

    res.json({
      userId,
      token,
      channel,
    });
  },
};
