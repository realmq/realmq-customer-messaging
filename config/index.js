'use strict';

const dotenv = require('dotenv');

dotenv.config();

const {env} = process;

module.exports = {
  port: env.PORT || 8080,

  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    name: env.DB_NAME,
    user: env.DB_USER,
    pass: env.DB_PASS,
    sslEnabled: Boolean(env.ENABLE_SSL),
  },

  agent: {
    username: env.AGENT_USERNAME || 'agent',
    password: env.AGENT_PASSWORD || 'password',
  },

  realmq: {
    token: env.REALMQ_TOKEN,
  },
};
