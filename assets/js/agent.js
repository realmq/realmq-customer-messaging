'use strict';

var Vue = require('vue');
var RealMQ = require('../../../realmq-web-sdk/dist/realmq-0.0.0');
var App = require('./agent/app.vue');

var VueApp = Vue.extend(App);
var appNode = document.getElementById('app');

var realmq = new RealMQ(appNode.dataset.authToken);

module.exports = new VueApp({
  el: appNode,
  propsData: {
    realmq: realmq
  }
});
