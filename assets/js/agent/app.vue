
<template>
  <div id="app">
    <img src="https://realmq.com/img/logo.svg">
    <h1>{{ title }}</h1>
    <p>{{ lead }}</p>
  </div>
</template>

<script>
  module.exports = {
    name: 'app',
    data: function() {
      return {
        title: 'Agent Dashboard',
        lead: 'Manage your customer cummunications.'
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
