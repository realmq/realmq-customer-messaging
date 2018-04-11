'use strict';

const {agent: agentConfig} = require('../config');
const {toAgentUserName} = require('../lib/agent');

// Only required until we have proper session storage.
const authCache = new Map([
  [
    agentConfig.username,
    {
      token: agentConfig.token,
      userId: toAgentUserName(agentConfig.username),
    },
  ],
]);

module.exports = {
  async index(req, res) {
    const {realmq} = req.app.locals;
    const {user} = req.auth;

    if (!authCache.has(user)) {
      const token = await realmq.tokens.create({
        userId: toAgentUserName(user),
        description: 'Agent Session',
      });
      authCache.set(user, token);
    }

    res.render('agent/index', {
      authToken: authCache.get(user).token,
    });
  },
};
