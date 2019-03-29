<template>
  <div id="app">
    <apptopbar></apptopbar>
    <!--<appinfo></appinfo>-->
    <appmain></appmain>
    <appbottombar></appbottombar>
  </div>
</template>

<script>
import apptopbar from './app-topbar/app-topbar.vue'
//import appinfo from './app-info/app-info.vue'
import appmain from './app-main/app-main.vue'
import appbottombar from './app-bottombar/app-bottombar.vue'
import i18n from '@/i18n'

export default {
  name: 'app',
  metaInfo: {
        title: 'Mainframe', // set a title
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
    //appinfo,
    appmain,
    appbottombar
  },
  data() {
    return {
      trayMenuId: 0
    }
  },
  async mounted () {
    this.$WebSDK('win.resize', 326, 600)
    //this.$WebSDK('win.move', 4)
    this.$WebSDK('win.setResizeBorderWidth', 2)
    this.$WebSDK('win.setMinSize', 326, 600)
    this.$WebSDK('win.setMaxSize', 486, 1000)
    this.$WebSDK('win.needSystemAutoMinMax', false)
    this.$WebSDK('win.needTaskBar', true)
    this.$WebSDK('win.needShadow', true)
    this.$WebSDK('win.setTopHide', true)
    this.$WebSDK('win.needAlwaysFront', true)
    this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
      switch (uri) {
        case this.$DataUri.MainFrame_ShowWindow:
          this.showWindow()
          break
        case this.$DataUri.App_CloseAllWindow:
          window.close()
          break
        case this.$DataUri.APP_LanguageChange:
          i18n.setLocale(data)
          break
      }
    }, this)
    this.$WebSDK('common.trayIconLeftClickListener', () => {
        this.showWindow()
    }, this)

    let browserObj = await this.$WebSDK('sdk.openWindow', '/traymenu', 'traymenuframe', 'left=9999,top=9999,resizable:0,shadow:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:0,windowvisible:0,offscreenrendering:1,guardapp:0')
    this.trayMenuId = await browserObj.winId()
    /* this.$WebSDK('sdk.openWindow', '/traymenu', 'traymenuframe', 'left=9999,top=9999,resizable:0,shadow:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:0,windowvisible:0,offscreenrendering:1,guardapp:0').then(
        (ret) => {
          ret.winId().then(
            (id) => {
              this.trayMenuId = id
            }
          )
        }
      )*/
    this.$WebSDK('sdk.openWindow', '/popupmenu', 'popupmenuframe', 'left=9999,top=9999,resizable:0,shadow:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:0,windowvisible:0,offscreenrendering:1,guardapp:0')
    this.$WebSDK('sdk.openWindow', '/clipmenu', 'clipmenuframe', 'left=9999,top=9999,resizable:0,shadow:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:0,windowvisible:0,offscreenrendering:0,guardapp:0')
    this.$WebSDK('common.trayIconShow')
    this.$WebSDK('common.trayIconToolTip', 'My Cubez')
    document.body.oncontextmenu = (e) => {
        return false
    }
  },
  methods: {
    closeWindow() {
      window.close()
    },
    showWindow() {
      this.$WebSDK('win.setTopHide', false)
      this.$WebSDK('win.restore')
      this.$WebSDK('win.forefront')
      this.$WebSDK('win.show')
      this.timeId = window.setTimeout(() => {
          window.clearTimeout(this.timeId)
          this.$WebSDK('win.setTopHide', true)
          this.$WebSDK('win.forefront')
          this.$WebSDK('win.show')
      }, 2000)
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
$back-color: linear-gradient(to bottom, rgb(2, 137, 240), rgb(2, 122, 221));
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: $back-color;
  padding: 0;
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
}
</style>
