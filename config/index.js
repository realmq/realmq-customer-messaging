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
    sslEnabled: env.DB_USE_SSL === 'true',
  },

  agent: {
    username: env.AGENT_USERNAME || 'agent',
    password: env.AGENT_PASSWORD || 'password',
  },

  realmq: {
    token: env.REALMQ_TOKEN,
  },

  session: {
    customerSessionSecret: env.SESSION_CUSTOMER_SECRET || 'none',
    customerSessionName:
      env.SESSION_CUSTOMER_NAME || 'realmq-customer-messaging-customer-session',
  },
};
