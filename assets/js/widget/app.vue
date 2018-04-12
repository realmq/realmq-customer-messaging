<template>
  <div class="rmq-widget">
    <transition name="rmq-fade-in">
      <div v-if="isOpen" class="rmq-widget-window">
        <div class="rmq-widget-nav">
          <div class="rmq-nav-toggle"></div>
          <div class="rmq-main-nav-item">
            <a class="rmq-main-nav-item-link" href="#">Alrik</a>
          </div>
          <div class="rmq-nav-options" v-on:click="isMenuOpen = !isMenuOpen">
            <transition name="rmq-fade-in">
              <div v-if="isMenuOpen" class="rmq-widget-menu">
                <a @click="isOpen = false" class="rmq-widget-menu-item">Close</a>
              </div>
            </transition>
          </div>
        </div>
        <div class="rmq-widget-body">
          <widget-chat :realmq="realmq"></widget-chat>
        </div>
        <div class="rmq-widget-footer"></div>
      </div>
    </transition>
    <div :class="{'rmq-is-open': isOpen}" @click="isOpen = !isOpen" class="rqm-widget-toggle"></div>
  </div>
</template>

<script>
  var RealMQ = require('@realmq/web-sdk/lib/realmq');
  var Chat = require('./chat.vue');

  var apiClient = new RealMQ.ApiClient(null, { baseUrl: '/' });

  module.exports = {
    name: 'app',
    components: {
      'widget-chat': Chat,
    },
    data: function() {
      return {
        session: null,
        isOpen: false,
        isMenuOpen: false,
        realmq: null
      };
    },
    created: function() {
      this.loadSession().then(this.initializeRealmq.bind(this));
    },
    methods: {
      loadSession: function() {
        var $data = this.$data;

        return apiClient.get({ path: 'session' }).then(function(session) {
          $data.session = session;

          return session;
        })
      },
      initializeRealmq: function() {
        this.$data.realmq = new RealMQ(this.session.token, { autoSubscribe: true });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "styles/variables";

  .rmq-widget {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    font-family: $font-sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .rmq-widget-window {
    display: flex;
    flex-direction: column;
    height: 520px;
    width: 320px;
    overflow: hidden;
    background-color: white;
    position: relative;
    @include material-shadow(3);

    .rmq-widget-body {
      flex-grow: 1;
      overflow: scroll;
      height: 520px;
      padding: ($navHeight - ($navHeight/1.5)) / 2;
      background: darken($white, 5%);

      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;

      &::-webkit-scrollbar {
        width: 0 !important
      }
    }

    transition: $trans;
  }

  .rmq-widget-nav {
    height: $navHeight;
    z-index: $nav;
    background-color: $primary;
    border-bottom: 3px solid darken($primary, 10%);;
    color: $white;

    @include material-shadow(1);

    .rmq-nav-toggle {
      height: 32px;
      width: 32px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMjAgMTFINy44M2w1LjU5LTUuNTlMMTIgNGwtOCA4IDggOCAxLjQxLTEuNDFMNy44MyAxM0gyMHYtMnoiLz48L3N2Zz4=);
      background-repeat: no-repeat;
      background-position: center;
      background-size: $navHeight/2.5;
      margin: 16px;
      float: left;
      cursor: pointer;
    }

    .rmq-nav-options {
      height: 32px;
      width: 32px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTIgOGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMiAuOS0yIDIgLjkgMiAyIDJ6bTAgMmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6bTAgNmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6Ii8+PC9zdmc+);
      background-repeat: no-repeat;
      background-position: center;
      background-size: $navHeight/2.5;
      margin: 16px;
      position: absolute;
      right: 0;
      cursor: pointer;
    }

    .rmq-widget-menu {
      background: $white;
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      color: $black;
      @include material-shadow(3);

      .rmq-widget-menu-item {
        padding: 1rem;
        display: inline-block;
      }
    }

    .rmq-main-nav-item {
      float: left;
      height: $navHeight;
      margin-right: 50px;
      position: relative;

      // text-align: center;
      line-height: $navHeight;

      .rmq-main-nav-item-link {
        display: block;
        position: relative;
        height: $navHeight;
        width: 100%;

        text-align: center;
        line-height: $navHeight;
        text-decoration: none;
        color: inherit;

        transition: $trans;
      }

      transition: $trans;
    }

    transition: $trans;
  }

  .rqm-widget-toggle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: $primary;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTIwIDJINGMtMS4xIDAtMiAuOS0yIDJ2MThsNC00aDE0YzEuMSAwIDItLjkgMi0yVjRjMC0xLjEtLjktMi0yLTJ6Ii8+ICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    @include material-shadow(2);
    cursor: pointer;
    margin-top: 1rem;
    float: right;
    transition: $trans;

    &.rmq-is-open {
      background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnoiLz4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==);
    }
  }

  .rmq-fade-in-enter-active,
  .rmq-fade-in-leave-active {
    transition: all .5s ease;
  }
  .rmq-fade-in-enter, .rmq-fade-in-leave-to  {
    transform: translateX(10px);
    opacity: 0;
  }

  @media (max-width: 560px) {
    .rmq-widget {
      bottom: 1rem;
      right: 1rem;
    }
    .rmq-widget-window {
      position: fixed;
      width: 100%;
      height: auto;
      top: 0;
      left: 0;
      bottom: 5rem;
      transform: translateX(0);
    }
  }
</style>
