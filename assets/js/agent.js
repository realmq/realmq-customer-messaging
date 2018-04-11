'use strict';

var Vue = require('vue');
var App = require('./agent/app.vue');

module.exports = new Vue({
  el: '#app',
  render: function(h) {
    return h(App);
  }
});
