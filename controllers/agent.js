'use strict';

const {toAgentUserName} = require('../lib/agent');

// Only required until we have proper session storage.
const authCache = new Map();

async function fetchAgentSession({
  cache,
  agentId,
  tokenResource: {retrieve, create},
}) {
  if (!cache.has(agentId)) {
    try {
      cache.set(agentId, await retrieve(agentId));
    } catch (err) {
      if (err.code !== 'RESOURCE_NOT_FOUND') {
        throw err;
      }

      cache.set(
        agentId,
        await create({
          id: agentId,
          userId: agentId,
          description: 'Agent Session',
        })
      );
    }
  }

  return cache.get(agentId);
}

module.exports = {
  async index(req, res) {
    const {realmq} = req.app.locals;
    const {user} = req.auth;

    const session = await fetchAgentSession({
      agentId: toAgentUserName(user),
      cache: authCache,
      tokenResource: realmq.tokens,
    });

    res.render('agent/index', {
      authToken: session.token,
    });
  },
};
