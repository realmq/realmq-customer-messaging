'use strict';

module.exports = handler => (req, res, next, ...args) =>
  Promise.resolve(handler(req, res, next, ...args)).catch(next);
