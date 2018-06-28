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
 * @return {Promise.<{userId: string, channelId: string, token: string, channelName: string}>}
 */
async function fetchCustomerSession({
  sessionContainer,
  tokenResource: {create: createToken},
  channelResource,
  subscriptionResource,
}) {
  if (!sessionContainer.customerSession) {
    const userId = uuid.v4();
    const {channelId, channelName} = await fetchCustomerSubscription({
      userId,
      channelResource,
      subscriptionResource,
    });

    sessionContainer.customerSession = {
      userId,
      channelId,
      channelName,
    };
  }

  // Always create new token
  const {token} = await createToken({
    userId: sessionContainer.customerSession.userId,
    description: 'Customer session token',
  });

  return {...sessionContainer.customerSession, token};
}

/**
 * Tries to fetch the customer subscription and creates a new one if none exists
 *
 * @param {string} userId
 * @param {Function} retrieveSubscription
 * @param {Function} createSubscription
 * @param {Function} retrieveChannel
 * @param {Function} createChannel
 * @return {Promise.<{channelId: string, channelName: string}>}
 */
async function fetchCustomerSubscription({
  userId,
  subscriptionResource: {
    retrieve: retrieveSubscription,
    create: createSubscription,
  },
  channelResource: {retrieve: retrieveChannel, create: createChannel},
}) {
  const subscriptionId = `subscription-${userId}`;
  const channelId = `customer-channel-${userId}`;
  let subscription;
  let channel;

  try {
    subscription = await retrieveSubscription(subscriptionId);
    channel = await retrieveChannel(channelId);
  } catch (err) {
    if (err.code !== 'UnknownSubscription') {
      throw err;
    }

    channel = await createChannel({
      id: channelId,
      properties: {
        name: generateChannelName(),
      },
      features: {
        persistence: {
          enabled: true,
        },
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

  return {
    channelId: subscription.channelId,
    channelName:
      channel.properties && channel.properties.name
        ? channel.properties.name
        : 'anonymous',
  };
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
      if (err.code !== 'UnknownSubscription') {
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

    const {userId, token, channelId, channelName} = await fetchCustomerSession({
      sessionContainer: req.session,
      tokenResource: realmq.tokens,
      channelResource: realmq.channels,
      subscriptionResource: realmq.subscriptions,
    });

    console.log({userId, token, channelId, channelName});

    // Run in background
    ensureAgentSubscription({
      subscriptionCache: agentSubscriptionCache,
      agentId: toAgentUserName(agent.username),
      channelId,
      subscriptionResource: realmq.subscriptions,
    });

    res.json({
      userId,
      token,
      channelId,
      channelName,
    });
  },
};
