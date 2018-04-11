'use strict';

const dotenv = require('dotenv');

dotenv.config();

const {env} = process;

module.exports = {
  port: env.PORT || 8080,

  agent: {
    username: env.AGENT_USERNAME || 'agent',
    password: env.AGENT_PASSWORD || 'password',
  },

  realmq: {
    token: env.REALMQ_TOKEN,
  },
};
