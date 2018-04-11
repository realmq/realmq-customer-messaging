
<template>
  <div id="app">
    <img src="https://realmq.com/img/logo.svg">
    <h1>{{ title }}</h1>
    <p>{{ lead }}</p>

    <h2>Channels</h2>

    <ul v-if="channelList.count">
      <li v-for="channel in channelList.items">
        {{ channel.id }}
      </li>
    </ul>
    <p v-else>
      There are no channels
    </p>
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

<style scoped>
  #app {
    font-family: 'Dosis', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #323d47;
    margin-top: 60px;
  }
  h1 {
    font-weight: normal;
  }
  a {
    color: #3ac955;
  }
</style>
