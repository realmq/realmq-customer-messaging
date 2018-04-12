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
            <div class="rmq-list-item" v-for="channel in channelList.items">
              {{ channel.id }}
            </div>
          </div>
          <p v-else>
            There are no channels
          </p>
        </div>
        <div class="rmq-chat">

        </div>
      </div>
      <div class="rmq-window-footer"></div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    name: 'app',
    props: {
      realmq: {
        required: true
      }
    },
    data: function() {
      return {
        channelList: {},
        title: 'Agent Dashboard',
        lead: 'Manage your customer cummunications.'
      }
    },
    created: function() {
      this.loadChannels();
    },
    methods: {
      loadChannels: function() {
        var $data = this.$data;

        this.realmq.channels.list().then(function (channelList) {
          $data.channelList = channelList
        });
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
    }
  }

  .rmq-channels .rmq-list-item {
    cursor: pointer;
    padding: 0.5rem 0;
  }
</style>
