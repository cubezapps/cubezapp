<template>
  <div id="app">
    <apptopbar></apptopbar>
    <appinfo></appinfo>
    <appmain></appmain>
    <appbottombar></appbottombar>
  </div>
</template>

<script>
import apptopbar from './app-topbar/app-topbar.vue'
import appinfo from './app-info/app-info.vue'
import appmain from './app-main/app-main.vue'
import appbottombar from './app-bottombar/app-bottombar.vue'

export default {
  name: 'app',
  metaInfo: {
        title: 'my vue app mainframe', // set a title
        meta: [{                 // set meta
          name: 'keyWords',
          content: 'My Example App'
         }],
        htmlAttrs: {
          lang: 'zh-CN'
        }
  },
  components: {
    apptopbar,
    appinfo,
    appmain,
    appbottombar
  },
  mounted () {
    this.$WebSDK('win.resize', 300, 550)
    this.$WebSDK('win.move', 4)
    this.$WebSDK('win.setResizeBorderWidth', 2)
    this.$WebSDK('win.setMinSize', 300, 550)
    this.$WebSDK('win.needResizable', true)
    this.$WebSDK('sdk.hideLoading')
    this.$WebSDK('win.show')
    this.$WebSDK('win.needShadow')
    this.$TrayIcon.init()
  },
  methods: {
    closeWindow () {
      window.close()
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(189, 205, 211);
  padding: 0;
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
}
</style>
