'use strict';

var Vue = require('vue');
var VueChatScroll = require('vue-chat-scroll');
var App = require('./widget/app.vue');

var VueApp = Vue.extend(App);
var widgetNode = document.createElement('div');

document.body.appendChild(widgetNode);
Vue.use(VueChatScroll);

module.exports = new VueApp({
  el: widgetNode,
  propsData: {
    realmqHost: process.env.REALMQ_HOST
  }
});
