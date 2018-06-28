'use strict';

const {toAgentUserName} = require('../lib/agent');

async function fetchAgentSession({agentId, tokenResource: {create}}) {
  const token = await create({
    userId: agentId,
    description: 'Agent Session',
  });
  return token;
}

module.exports = {
  async index(req, res) {
    const {realmq} = req.app.locals;
    const {user} = req.auth;

    const session = await fetchAgentSession({
      agentId: toAgentUserName(user),
      tokenResource: realmq.tokens,
    });

    res.render('agent/index', {
      authToken: session.token,
    });
  },
};
