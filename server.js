'use strict';

const path = require('path');
const basicAuth = require('express-basic-auth');
const chalk = require('chalk');
const expressSession = require('express-session');
const express = require('express');
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(
  expressSession.Store
);
const logger = require('morgan');
const RealMQ = require('@realmq/node-sdk');
const asyncRoute = require('./lib/async-route');

const initSessionStorage = dbConfig => {
  // Init Sequelize
  const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: dbConfig.sslEnabled,
    },
    logging: false,
  });
  const sequelizeSessionStore = new SequelizeStore({db: sequelize});
  sequelizeSessionStore.sync();

  return sequelizeSessionStore;
};

try {
  const config = require('./config');
  const {agent, session, home} = require('./controllers');

  const app = express();

  const {username, password} = config.agent;
  const restrictAccess = basicAuth({
    users: {[username]: password},
    challenge: true,
  });
  app.locals.realmq = new RealMQ(config.realmq.token, {
    host: config.realmq.host,
  });

  app.set('port', config.port);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  // Create session handler for /session route
  app.use(
    expressSession({
      name: config.session.customerSessionSecret,
      proxy: true,
      resave: false,
      saveUninitialized: false,
      store: initSessionStorage(config.db),
      secret: config.session.customerSessionSecret,
      cookie: {
        path: '/session',
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      },
    })
  );

  app.use(logger('dev'));
  app.use(express.static('public'));

  app.get('/', asyncRoute(home));
  app.get('/agent', asyncRoute(restrictAccess), asyncRoute(agent.index));
  app.get('/session', asyncRoute(session.retrieve));

  app.listen(app.get('port'), () => {
    console.log(
      chalk.green('✓'),
      'App is running at',
      `http://localhost:${app.get('port')}`,
      `in ${app.get('env')} mode`
    );
    console.log('  Press CTRL-C to stop\n');
  });
} catch (err) {
  console.log(
    'App could not be started due to the following error:',
    chalk.red('⚠'),
    err
  );
}
