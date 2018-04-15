<template>
  <div class="rmq-agent">
    <div class="rmq-window">
      <div class="rmq-window-nav">
        <div class="rmq-nav-item rmq-nav-logo">
          <img src="https://realmq.com/img/logo.svg">
        </div>
      </div>
      <div class="rmq-window-body">
        <div class="rmq-channels">
          <h3>Channels</h3>

          <div class="rmq-channel-list" v-if="channelList.count">
            <template v-for="channel in channelList.items">
              <div class="rmq-list-item" :class="{'rmq-is-active': activeChat.channel === channel.id}" @click="activateChannel(channel)">
                {{ (channel.properties || {}).name || channel.id }}<br>
                {{ channel.createdAt }}
              </div>
            </template>
          </div>
          <p v-else>
            There are no channels
          </p>
        </div>
        <template v-for="chat in chats">
          <chat v-show="chat.active" class="rmq-chat" :realmq="realmq" :channel="chat.channel" :user-id="userId"></chat>
        </template>
      </div>
      <div class="rmq-window-footer"></div>
    </div>
  </div>
</template>

<script>
  var Chat = require('../components/chat.vue');

  module.exports = {
    name: 'app',
    components: {
      chat: Chat
    },
    props: {
      realmq: {
        required: true
      }
    },
    data: function() {
      return {
        channelList: {},
        chats: {},
        activeChat: null,
        userId: null
      }
    },
    created: function() {
      this.loadUser();
      this.loadChannels();
    },
    methods: {
      loadChannels: function() {
        var $data = this.$data;
        var me = this;

        this.realmq.channels.list().then(function (channelList) {
          channelList.items.sort(function (a, b) {
            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
          });
          $data.channelList = channelList;
          me.activateChannel(channelList.count && channelList.items[0]);
        });
      },

      loadUser: function() {
        var $data = this.$data;

        this.realmq.me.user.retrieve().then(function(user) {
          $data.userId = user.id;
        });
      },

      activateChannel: function(channel) {
        var chats = this.$data.chats;
        var chatId = channel.id;

        if (!chats[chatId]) {
          chats[chatId] = {
            channel: channel.id,
          };
        }

        if (this.activeChat) {
          this.activeChat.active = false;
        }

        chats[chatId].active = true;
        this.$data.activeChat = chats[chatId];
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/window";

  .rmq-agent {
    font-family: 'Dosis', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #323d47;

    .rmq-window {
      height: 100%;
    }
  }

  .rmq-window-body {
    display: flex;
    flex-direction: row;

    .rmq-channels {
      width: 20%;
      min-width: 275px;
    }

    .rmq-chat {
      flex-grow: 1;
      @include material-shadow(1);
      padding: 1rem;
    }
  }

  .rmq-channels {
    overflow: auto;

    .rmq-list-item {
      cursor: pointer;
      padding: 0.5rem 0;

      &.rmq-is-active {
        color: $primary;
      }
    }
  }
</style>
