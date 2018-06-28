'use strict';

var Vue = require('vue');
var VueChatScroll = require('vue-chat-scroll');
var RealMQ = require('@realmq/web-sdk/lib/realmq');
var App = require('./agent/app.vue');

var VueApp = Vue.extend(App);
var appNode = document.getElementById('app');

var realmq = new RealMQ(appNode.dataset.authToken, {
  host: process.env.REALMQ_HOST,
  autoSubscribe: true
});

Vue.use(VueChatScroll);

module.exports = new VueApp({
  el: appNode,
  propsData: {
    realmq: realmq
  }
});
