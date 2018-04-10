'use strict';

const path = require('path');
const chalk = require('chalk');
const express = require('express');
const logger = require('morgan');
const config = require('./config');
const {home} = require('./controllers');

const app = express();

app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.get('/', home);

app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});
