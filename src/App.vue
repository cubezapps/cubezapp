<template>
  <div id="app">
    <apptopbar></apptopbar>
  </div>
</template>

<script>
import apptopbar from './components/app-topbar/app-topbar.vue'

export default {
  name: 'app',
  components: {
    apptopbar
  },
  mounted () {
    this.$WebSDK('win.resize', 300, 550)
    this.$WebSDK('win.move', 4)
    this.$WebSDK('win.setDragArea', [[0, 0, 300, 30]])
  },
  methods: {
    closeWindow () {
      window.close()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0px;
}

body{
  margin:0;
  padding:0;
}
</style>
