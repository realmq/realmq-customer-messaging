'use strict';

const Vue = require('vue');
const App = require('./agent/app.vue');

module.exports = new Vue({
  el: '#app',
  render: h => h(App),
});
