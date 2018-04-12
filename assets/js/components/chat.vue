<template>
  <div class="rmq-chat">
    <template v-if="realmq && isConnected">
      <div class="rmq-messages">
        <div class="rmq-message rmq-is-them">
          <div class="rmq-message-sender"></div>
          <div class="rmq-message-body">Howdy!</div>
        </div>
        <div class="rmq-message rmq-is-them">
          <div class="rmq-message-sender"></div>
          <div class="rmq-message-body">How can we support you?</div>
        </div>
        <div class="rmq-message rmq-is-me">
          <div class="rmq-message-sender"></div>
          <div class="rmq-message-body rmq-is-animated rmq-is-fadeIn">Can I install RealMQ on my own hardware?</div>
        </div>
      </div>
      <div class="rmq-chat-input">
        <textarea class="rmq-message-input"></textarea>
        <div class="rmq-message-submit"></div>
      </div>
    </template>
    <template v-else>
      <div class="rmq-loading">
        Connecting...
      </div>
    </template>
  </div>
</template>
<script>
  module.exports = {
    name: "widget-chat",
    props: {
      realmq: {
        required: true,
      }
    },
    data: function() {
      return {
        isConnected: false,
      };
    },
    created: function() {
      var realmq = this.realmq;
      var $data = this.$data;

      realmq.rtm.on('connected', function() {
        $data.isConnected = true;
      });

      realmq.rtm.on('disconnected', function() {
        $data.isConnected = false;
      });

      realmq.rtm.on('reconnected', function() {
        $data.isConnected = true;
      });

      $data.isConnected = realmq.rtm.isConnected;
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/variables";

  .rmq-chat {
    position: relative;
    display: flex;
    flex-direction: column;
    color: $black;
  }

  .rmq-loading {
    padding-top: 8rem;
    text-align: center;
  }

  .rmq-messages {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .rmq-chat-input {
    background: $white;

    .rmq-message-input {
      height: $navHeight;
      background: $white;
      border: none;
      width: calc(100% - #{$navHeight});
      padding: 5%;
      resize: none;
      overflow: scroll;
      padding-top: ($navHeight/2) - 8;
      font-weight: 300;
      font-family: $font-sans-serif;

      &:focus {
        outline: none;
      }

      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;

      &::-webkit-scrollbar {
        width: 0 !important
      }
    }

    .rmq-message-submit {
      position: absolute;
      height: $navHeight * 0.625;
      width: $navHeight * 0.625;
      border-radius: 50%;
      border: 0;
      background: $primary;
      background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTIuMDEgMjFMMjMgMTIgMi4wMSAzIDIgMTBsMTUgMi0xNSAyeiIvPiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: $navHeight * 0.375;
      color: $white;

      bottom: $navHeight * (1 - 0.625) / 2;
      right: $navHeight * (1 - 0.625) / 2;

      &:focus {
        outline: none;
      }

      cursor: pointer;
    }
  }

  .rmq-messages {
    position: relative;
    overflow: hidden;

    width: 100%;
    margin: 1rem 0;
  }

  .rmq-message-body {
    padding: 1rem;
    min-height: $navHeight/1.5;
    margin: 0 1rem;
    @include material-shadow(1);
    border-radius: 2px;
    font-weight: 300;
    width: 60%;
    position: relative;

    &:before {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
    }
  }

  .rmq-message {
    display: flex;
    margin: 1rem;

    .rmq-message-sender {
      height: $navHeight/1.5;
      width: $navHeight/1.5;
      border-radius: 50%;
    }

    &.rmq-is-them {
      .rmq-message-sender, .rmq-message-body {
        background: $primary;
        color: $white;
      }

      .rmq-message-body {
        &:before {
          border-width: 0 10px 10px 0;
          border-color: transparent $primary transparent transparent;
          position: absolute;
          top: 0;
          left: -9px;
        }
      }
    }

    &.rmq-is-me {
      flex-direction: row-reverse;

      .rmq-message-sender, .rmq-message-body {
        background: $white;
        color: $black;
      }

      .rmq-message-body {
        &:before {
          border-width: 10px 10px 0 0;
          border-color: $white transparent transparent transparent;
          position: absolute;
          top: 0;
          right: -9px;
        }
      }
    }
  }
</style>