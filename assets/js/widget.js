'use strict';

var Vue = require('vue');
var VueChatScroll = require('vue-chat-scroll');
var App = require('./widget/app.vue');

var widget = document.createElement('div');
document.body.appendChild(widget);

Vue.use(VueChatScroll);

module.exports = new Vue({
  el: widget,
  render: function(h) {
    return h(App);
  }
});
