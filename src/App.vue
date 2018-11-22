<template>
  <div id="app">
    <apptopbar></apptopbar>
    <appinfo></appinfo>
    <appmain></appmain>
    <appbottombar></appbottombar>
  </div>
</template>

<script>
import apptopbar from './components/app-topbar/app-topbar.vue'
import appinfo from './components/app-info/app-info.vue'
import appmain from './components/app-main/app-main.vue'
import appbottombar from './components/app-bottombar/app-bottombar.vue'

export default {
  name: 'app',
  components: {
    apptopbar,
    appinfo,
    appmain,
    appbottombar
  },
  mounted () {
    this.$WebSDK('win.resize', 300, 550)
    this.$WebSDK('win.move', 4)
    this.$WebSDK('win.setDragArea', [[0, 0, 300, 30]])
    this.$WebSDK('win.setResizeBorderWidth', 2)
    this.$WebSDK('win.setMinSize', 300, 550)
    this.$WebSDK('win.needResizable')
  },
  methods: {
    closeWindow () {
      window.close()
    }
  }
}
</script>

<style lang='scss'>
html, body{
  margin:0;
  padding:0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: lightblue;
  padding: 0;
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
}
</style>
