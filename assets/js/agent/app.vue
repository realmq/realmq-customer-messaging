<template>
  <div class="rmq-agent">
    <div class="rmq-window">
      <div class="rmq-window-nav">
        <div class="rmq-nav-item rmq-nav-logo">
          <img src="https://realmq.com/img/logo.svg">
        </div>
        <div class="rmq-nav-title">Agent Chat - Customer Chat Example</div>
      </div>
      <div class="rmq-window-body">
        <div class="rmq-channels">
          <h3>Customer Chats</h3>

          <div class="rmq-channel-list" v-if="channels.length">
            <template v-for="channel in channels">
              <div class="rmq-list-item" :class="{'rmq-is-active': activeChat.channel === channel.id}" @click="activateChannel(channel)">
                {{ channel.name }}<br>
                <small>{{ channel.dateFormatted }}</small>
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
  import Chat from '../components/chat.vue';
  import moment from 'moment';

  const loadAllChannels = function(realmq, callback, limit, offset, channels) {
    limit = limit || 20;
    offset = offset || 0;
    channels = channels || [];
    realmq.channels.list({limit: limit, offset: offset})
      .then(function (list) {
        channels = channels.concat(list.items);
        if (list.offset + list.count >= list.total) {
          return callback(null, channels);
        }
        loadAllChannels(realmq, callback, limit, offset + limit, channels);
      })
      .catch(function (err) {
        callback(err);
      });
  };

  export default {
    name: 'app',
    components: {
      chat: Chat
    },
    props: {
      realmq: {
        required: true
      }
    },
    data() {
      return {
        channels: [],
        chats: {},
        activeChat: null,
        userId: null
      }
    },
    created() {
      this.loadUser();
      this.loadChannels();
      this.syncSubscriptions();
    },
    methods: {
      loadChannels() {
        const $data = this.$data;
        const me = this;

        loadAllChannels(this.realmq, function (err, channels) {
          if (err) {
            $data.channels = [];
            return;
          }
          $data.channels = channels.sort(function (a, b) {
            return a.createdAt < b.createdAt ? 1 : -1;
          }).map(me.getChannelViewModel);
          me.activateChannel(channels.length && channels[0]);
        });
      },

      getChannelViewModel(channel) {
        const channelName = (channel.properties || {}).name || channel.id;
        const viewModel = {
          id: channel.id,
          name: channelName.length > 30
            ? channelName.substr(0, 20) + '...'
            : channelName,
          dateFormatted: moment(channel.createdAt).format('LLL'),
          createdAt: channel.createdAt,
          updatedAt: channel.updatedAt,
        };

        return viewModel;
      },

      onSubscriptionUpdated(subscription) {
        const me = this;
        const channels = this.channels;
        const channelId = subscription.channelId;

        this.realmq.channels.retrieve(channelId)
          .then(function(channel) {
            let existentChannel = channels.find(function(channel) {
              return channel.id === channelId;
            });

            if (!existentChannel) {
              existentChannel = me.getChannelViewModel(channel);
              channels.unshift(existentChannel);
            }
          });
      },

      onSubscriptionRemoved(subscription) {
        const channelId = subscription.channelId;
        const channelIndex = this.channels.findIndex(function(channel) {
          return channel.id === channelId;
        })

        if (channelIndex > -1) {
          this.channels.splice(channelIndex, 1);
        }

        const chat = this.chats[channelId];

        if (chat) {
          delete this.$data.chats[channelId];

          if (this.channels.length) {
            this.activateChannel(this.channels[0]);
          }
        }
      },

      syncSubscriptions() {
        const rtm = this.realmq.rtm;

        rtm.on('subscription-created', this.onSubscriptionUpdated.bind(this));
        rtm.on('subscription-updated', this.onSubscriptionUpdated.bind(this));
        rtm.on('subscription-deleted', this.onSubscriptionRemoved.bind(this));
      },

      loadUser() {
        const $data = this.$data;

        this.realmq.me.user.retrieve().then(function(user) {
          $data.userId = user.id;
        });
      },

      activateChannel(channel) {
        const chats = this.$data.chats;
        const chatId = channel.id;

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
      background: rgba(255, 255, 255, 0.4);
      padding: 0.5rem;
      margin: 0 0.5rem 0.5rem 0;


      &.rmq-is-active {
        color: $primary;
      }
    }
  }
</style>
