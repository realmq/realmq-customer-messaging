'use strict';

const dotenv = require('dotenv');

dotenv.config();

const {env} = process;

module.exports = {
  port: env.PORT || 8080,
};
