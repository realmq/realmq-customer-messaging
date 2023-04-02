<template>
  <div class="rmq-widget">
    <transition name="rmq-fade-in">
      <div v-show="isOpen" class="rmq-window">
        <div class="rmq-window-nav">
          <div class="rmq-nav-title">{{ session.channelName || 'anonymous' }}</div>
          <div class="rmq-nav-close" v-on:click="isOpen = false"></div>
        </div>
        <div class="rmq-window-body">
          <widget-chat v-if="realmq" class="rmq-chat" :realmq="realmq" :channel="session && session.channelId" :user-id="session && session.userId"></widget-chat>
        </div>
        <div class="rmq-window-footer"></div>
      </div>
    </transition>
    <div :class="{'rmq-is-open': isOpen}" @click="isOpen = !isOpen" class="rqm-widget-toggle"></div>
  </div>
</template>

<script>
  import RealMQ from '@realmq/web-sdk';
  import Chat from '../components/chat.vue';

  const apiClient = new RealMQ.ApiClient(null, { baseUrl: '/' });
  apiClient.basePath = '';

  export default {
    name: 'app',
    components: {
      'widget-chat': Chat,
    },
    props: {
      realmqHost: {
        required: true
      }
    },
    data() {
      return {
        session: {
          channelName: 'anonymous',
        },
        isOpen: false,
        isMenuOpen: false,
        realmq: null
      };
    },
    created() {
      console.warn('APP created')
      this.loadSession().then(this.initializeRealmq.bind(this));
    },
    methods: {
      loadSession() {
        var $data = this.$data;

        return apiClient.get({ path: 'session' }).then(function(session) {
          $data.session = session;

          return session;
        })
      },
      initializeRealmq() {
        this.$data.realmq = new RealMQ(this.session.token, { host: this.realmqHost, autoSubscribe: true });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/window";

  .rmq-widget {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    font-family: $font-sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    .rmq-window {
      height: 520px;
      width: 320px;
    }

    .rmq-window-body {
      height: 432px;
    }
  }

  .rmq-widget {
    .rmq-chat {
      height: 100%;
    }
  }

  .rmq-window-nav {
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

      .rqm-window {
        position: fixed;
        width: 100%;
        height: auto;
        top: 0;
        left: 0;
        bottom: 5rem;
        transform: translateX(0);
      }
    }
  }
</style>
