'use strict';

var Vue = require('vue');
var App = require('./widget/app.vue');

var widget = document.createElement('div');
document.body.appendChild(widget);

module.exports = new Vue({
  el: widget,
  render: function(h) {
    return h(App);
  }
});
