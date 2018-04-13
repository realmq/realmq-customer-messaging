'use strict';

const path = require('path');
const basicAuth = require('express-basic-auth');
const chalk = require('chalk');
const expressSession = require('express-session');
const express = require('express');
const logger = require('morgan');
const RealMQ = require('@realmq/node-sdk');
const asyncRoute = require('./lib/async-route');

try {
  const config = require('./config');
  const {agent, session, home} = require('./controllers');

  const app = express();

  const {username, password} = config.agent;
  const restrictAccess = basicAuth({
    users: {[username]: password},
    challenge: true,
  });
  app.locals.realmq = new RealMQ(config.realmq.token);

  app.set('port', config.port);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  // Create session handler for /session route
  app.use(
    expressSession({
      name: 'realmq-customer-messaging',
      proxy: true,
      resave: false,
      saveUninitialized: false,
      secret: 'realmq-customer-messaging-secret',
      cookie: {
        path: '/session',
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
