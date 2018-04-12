'use strict';

var Vue = require('vue');
var RealMQ = require('@realmq/web-sdk/lib/realmq');
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
