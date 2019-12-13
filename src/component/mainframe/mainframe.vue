<template>
  <div id="app">
    <apptopbar ref="topBar"></apptopbar>
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
      trayMenuId: 0,
      settingWindow: null,
      trayWindow: null,
      popupWindow: null,
      clipWindow: null,
      calendarWindow: null,
      aboutWindow: null
    }
  },
  async mounted () {
    this.$Logger.log('mainframe start')
    this.$WebSDK('sdk.webReady')
    this.$WebSDK('win.resize', 342, 600)
    //this.$WebSDK('win.move', 4)
    this.$WebSDK('win.setResizeBorderWidth', 3)
    this.$WebSDK('win.setMinSize', 342, 600)
    this.$WebSDK('win.setMaxSize', 508, 1000)
    this.$WebSDK('win.needSystemMinimize', false)
    this.$WebSDK('win.needSystemMaximize', false)
    this.$WebSDK('win.needTaskBar', false)
    this.$WebSDK('win.needShadow', true)
    this.$WebSDK('win.setTopHide', true)
    this.$WebSDK('win.needAlwaysFront', true)
    this.$WebSDK('win.move', screen.width / 2 - 342, 0)
    window.onresize = () => {
        this.setCaptionArea()
      }
      this.setCaptionArea()
    this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
      switch (uri) {
        case this.$DataUri.MainFrame_ShowWindow:
          this.showWindow()
          this.$Logger.log('mainframe show')
          break
        case this.$DataUri.MainFrame_ResetWindow:
          this.$WebSDK('win.show')
          this.$WebSDK('win.move', screen.width / 2 - 326, 0)
          this.showWindow()
          break
        case this.$DataUri.App_CloseAllWindow:
          window.close()
          break
        case this.$DataUri.APP_LanguageChange:
          i18n.setLocale(data)
          this.$WebSDK('common.trayIconToolTip', this.$t('My Cubez'))
          break
      }
    }, this)
    this.$WebSDK('common.trayIconLeftClickListener', () => {
        this.showWindow()
    }, this)

    window.setTimeout(() => {
        if(this.trayWindow == null) {
          this.$WebSDK('sdk.openWindow', '/#/traymenu', 'traymenuframe', 'left=9999,top=9999,minimizeresizable:0,maximizeresizable:0,shadow:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:0,windowvisible:0,offscreenrendering:1,guardapp:0').then(r =>{
            this.trayWindow = r
          })
        }
        if(this.settingWindow == null) {
          this.$WebSDK('sdk.openWindow', '/#/setting', 'settingframe', 'left=9999,top=9999,minimizeresizable:0,maximizeresizable:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:0,windowvisible:0,offscreenrendering:0,guardapp:0').then(r => {
            this.settingWindow = r
          })
        }
        if(this.aboutWindow == null) {
          this.$WebSDK('sdk.openWindow', '/#/about', 'aboutframe', 'left=9999,top=9999,minimizeresizable:1,maximizeresizable:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:1,windowvisible:0,offscreenrendering:0,guardapp:0').then(r => {
            this.aboutWindow = r
          })
        }
        if(this.calendarWindow == null) {
          this.$WebSDK('sdk.openWindow', '/#/calendar', 'calendarframe', 'left=9999,top=9999,minimizeresizable:0,maximizeresizable:0,forbidsystemclose:1,titlebar:0,topmost:0,taskbaricon:1,windowvisible:0,offscreenrendering:0,guardapp:0').then(r => {
            this.calendarWindow = r
          })
        }
        if(this.popupWindow == null){
          this.$WebSDK('sdk.openWindow', '/#/popupmenu', 'popupmenuframe', 'left=9999,top=9999,minimizeresizable:0,maximizeresizable:0,shadow:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:0,windowvisible:0,offscreenrendering:1,guardapp:0').then(r => {
            this.popupWindow = r
          })
        }
        if(this.clipWindow == null) {
          this.$WebSDK('sdk.openWindow', '/#/clipmenu', 'clipmenuframe', 'left=9999,top=9999,minimizeresizable:0,maximizeresizable:0,shadow:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:0,windowvisible:0,offscreenrendering:0,guardapp:0').then(r => {
            this.clipWindow = r
          })
        }
    }, 1000)
    
   //this.trayMenuId = await browserObj.winId()
    /* this.$WebSDK('sdk.openWindow', '/traymenu', 'traymenuframe', 'left=9999,top=9999,minimizeresizable:0,maximizeresizable:0,shadow:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:0,windowvisible:0,offscreenrendering:1,guardapp:0').then(
        (ret) => {
          ret.winId().then(
            (id) => {
              this.trayMenuId = id
            }
          )
        }
      )*/

    this.$WebSDK('common.trayIconShow')
    this.$WebSDK('common.trayIconToolTip', this.$t('My Cubez'))
    document.body.oncontextmenu = (e) => {
        return false
    }

    this.$WebSDK('common.registerNHotkey', 'mainframe', 115, false, 100)
      this.$WebSDK('common.onKeyPressed', (name) => {
        if(name == 'mainframe') {
          window.Win.isTopHide().then(isTopHide => {
            window.Win.size().then(list => {
                if(list[1] < 0) {
                  if(isTopHide)  {
                    this.showWindow()
                  }
                  else {
                    this.$WebSDK('win.show')
                  }
                }
                else {
                  window.Win.isVisible().then(isVisible => {
                    if(!isVisible)  {
                      this.showWindow()
                    }
                    else {
                      this.$WebSDK('win.hide')
                    }
                  })
                }
            })
          })
        }
      })
  },
  computed: {
    trayTip_I18n() {
      return function() {
        return this.$t('My Cubez')
      }
    }
  },
  methods: {
    closeWindow() {
      window.close()
    },
    showWindow() {
      this.$WebSDK('win.setTopHide', false)
      this.$WebSDK('win.bringToFront')
      this.$WebSDK('win.show')
      this.timeId = window.setTimeout(() => {
          window.clearTimeout(this.timeId)
          this.$WebSDK('win.setTopHide', true)
      }, 2000)
    },
    setCaptionArea () {
      let areaTop = [0, 0, document.body.offsetWidth - 100,  50]
      let areaBottom = [0, document.body.offsetHeight - 70, document.body.offsetWidth,  70]
      this.$WebSDK('win.setDragArea', [areaTop, areaBottom])
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
