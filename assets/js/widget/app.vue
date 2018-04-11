<template>
  <div class="rmq-widget">
    <transition name="rmq-fade-in">
      <div v-if="isOpen" class="rmq-widget-chat">
        <nav class="rmq-widget-nav">
          <div class="rmq-default-nav">
            <div class="rmq-main-nav">
              <div class="rmq-nav-toggle"></div>
              <div class="rmq-main-nav-item">
                <a class="rmq-main-nav-item-link" href="#">Alrik</a>
              </div>
              <div class="rmq-nav-options"></div>
            </div>
          </div>
        </nav>
        <div class="rmq-widget-body">
          <div class="rmq-widget-content">
            <div class="rmq-message-wrapper rmq-is-them">
              <div class="rmq-circle-wrapper animated bounceIn"></div>
              <div class="rmq-text-wrapper animated fadeIn">Howdy!</div>
            </div>
            <div class="rmq-message-wrapper rmq-is-them">
              <div class="rmq-circle-wrapper rmq-is-animated rmq-is-bounceIn"></div>
              <div class="rmq-text-wrapper rmq-is-animated rmq-is-fadeIn">How can we support you?</div>
            </div>
            <div class="rmq-message-wrapper rmq-is-me">
              <div class="rmq-circle-wrapper rmq-is-animated rmq-is-bounceIn"></div>
              <div class="rmq-text-wrapper rmq-is-animated rmq-is-fadeIn">Can I install RealMQ on my own hardware?</div>
            </div>
          </div>
        </div>
        <div class="rmq-widget-bottom">
          <textarea class="rmq-widget-input"></textarea>
          <div class="rmq-widget-send"></div>
        </div>
      </div>
    </transition>
    <div v-bind:class="{'rmq-is-open': isOpen}" v-on:click="isOpen = !isOpen" class="rqm-widget-toggle"></div>
  </div>
</template>

<script>
  module.exports = {
    name: 'app',
    data: function() {
      return {
        isOpen: false,
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "styles/variables";

  .rmq-widget {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    font-family: 'Dosis', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .rmq-widget-chat {
    height: 520px;
    width: 320px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0px 3px 3px 0px rgba(50, 50, 50, 0.5);
    position: relative;

    .rmq-widget-body {
      overflow: scroll;
      height: 520px;
      padding-top: $navHeight;
      background: darken($white, 5%);

      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      //gotta hide windows scrollbars

      &::-webkit-scrollbar {
        width: 0 !important
      }

      .rmq-widget-content {
        padding: ($navHeight - ($navHeight/1.5)) / 2;
        position: relative;
        margin-bottom: $navHeight/2;
      }
    }

    transition: $trans;
  }

  .rmq-widget-nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $navHeight;
    z-index: $nav;

    .rmq-default-nav {
      height: $navHeight;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: $nav + 10;

      background-color: $primary;
      border-bottom: 3px solid darken($primary, 10%);;
      color: $white;

      -webkit-box-shadow: 0px 3px 3px 0px rgba(50, 50, 50, 0.1);
      -moz-box-shadow:    0px 3px 3px 0px rgba(50, 50, 50, 0.1);
      box-shadow:         0px 3px 3px 0px rgba(50, 50, 50, 0.1);

      .rmq-main-nav {
        position: absolute;
        left: 0;
        width: 100%;
        height: $navHeight;
        top: 0;

        margin: 0;
        padding: 0;

        list-style: none;

        .rmq-nav-toggle {
          height: 32px;
          width: 32px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMjAgMTFINy44M2w1LjU5LTUuNTlMMTIgNGwtOCA4IDggOCAxLjQxLTEuNDFMNy44MyAxM0gyMHYtMnoiLz48L3N2Zz4=);
          background-repeat: no-repeat;
          background-position: center;
          background-size: $navHeight/2.5;
          margin: 16px;
          float: left;

          &:hover {
            cursor: pointer;
          }
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

          &:hover {
            cursor: pointer;
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

      transition: $trans;
    }

    transition: $trans;
  }

  .rmq-widget-bottom {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: $navHeight;
    background: $white;

    /* box-shadow: 0px -3px 3px 0px rgba(50, 50, 50, 0.1); */

    .rmq-widget-input {
      height: $navHeight;
      background: $white;
      border: none;
      width: calc(100% - #{$navHeight});
      position: absolute;
      left: 0;
      top: 0;
      padding: 0 5%;
      resize: none;
      overflow: scroll;
      padding-top: ($navHeight/2) - 8;
      font-weight: 300;

      &:focus {
        outline: none;
      }

      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      //gotta hide windows scrollbars

      &::-webkit-scrollbar {
        width: 0 !important
      }
    }

    .rmq-widget-send {
      position: absolute;
      height: $navHeight/1.5;
      width: $navHeight/1.5;
      border-radius: 50%;
      border: 0;
      background: $primary;
      color: $white;

      bottom: ($navHeight - ($navHeight/1.5)) / 2;
      right: ($navHeight - ($navHeight/1.5)) / 2;

      &:before {
        content: '';
        background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTIuMDEgMjFMMjMgMTIgMi4wMSAzIDIgMTBsMTUgMi0xNSAyeiIvPiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: $navHeight/2.5;
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
      }

      &:focus {
        outline: none;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .rmq-message-wrapper {
    position: relative;
    overflow: hidden;

    width: 100%;
    margin: (($navHeight - ($navHeight/1.5)) / 2) 0;
    padding: (($navHeight - ($navHeight/1.5)) / 2) 0;

    .rmq-circle-wrapper {
      height: $navHeight/1.5;
      width: $navHeight/1.5;
      border-radius: 50%;
    }

    .rmq-text-wrapper {
      padding: ($navHeight - ($navHeight/1.5)) / 2;
      min-height: $navHeight/1.5;
      width: 60%;
      margin: 0 ($navHeight - ($navHeight/1.5)) / 2;
      box-shadow: 0px 1px 0px 0px rgba(50, 50, 50, 0.3);
      border-radius: 2px;
      font-weight: 300;
      position: relative;

      &:before {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
      }
    }

    &.rmq-is-them {
      .rmq-circle-wrapper, .rmq-text-wrapper {
        background: $primary;
        float: left;
        color: $white;
      }

      .rmq-text-wrapper {
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
      .rmq-circle-wrapper, .rmq-text-wrapper {
        background: $white;
        float: right;
        color: $black;
      }

      .rmq-text-wrapper {
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

  .rqm-widget-toggle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: $primary;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTIwIDJINGMtMS4xIDAtMiAuOS0yIDJ2MThsNC00aDE0YzEuMSAwIDItLjkgMi0yVjRjMC0xLjEtLjktMi0yLTJ6Ii8+ICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0px 3px 3px 0px rgba(50, 50, 50, 0.5);
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
    .rmq-widget-chat {
      position: fixed;
      width: 100%;
      height: auto;
      top: 0;
      left: 0;
      bottom: 5rem;
      transform: translateX(0);

      .rmq-widget-body {
        height: 100%;
      }
    }
  }
</style>
