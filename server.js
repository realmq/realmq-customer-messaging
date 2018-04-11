'use strict';

const path = require('path');
const basicAuth = require('express-basic-auth');
const chalk = require('chalk');
const express = require('express');
const logger = require('morgan');
const RealMQ = require('@realmq/node-sdk');

try {
  const config = require('./config');
  const {agent, home} = require('./controllers');

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

  app.use(logger('dev'));
  app.use(express.static('public'));

  app.get('/', home);
  app.get('/agent', restrictAccess, agent.index);

  app.listen(app.get('port'), () => {
    console.log(
      '%s App is running at http://localhost:%d in %s mode',
      chalk.green('✓'),
      app.get('port'),
      app.get('env')
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
