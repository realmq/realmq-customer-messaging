'use strict';

import {createApp} from 'vue';
import ChatScroll from 'vue3-chat-scroll';
import RealMQ from '@realmq/web-sdk';
import App from './agent/app.vue';

const appNode = document.getElementById('app');
const realmq = new RealMQ(appNode.dataset.authToken, {
  host: process.env.REALMQ_HOST,
  autoSubscribe: true
});
const app = createApp(App, {
  realmq,
});

app.use(ChatScroll);
app.mount(appNode);

