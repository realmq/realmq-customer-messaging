'use strict';

import {createApp} from 'vue';
import ChatScroll from 'vue3-chat-scroll';
import App from './widget/app.vue';

const widgetNode = document.createElement('div');
document.body.appendChild(widgetNode);

const app = createApp(App, {
  realmqHost: process.env.REALMQ_HOST
});

app.use(ChatScroll);
app.mount(widgetNode);
