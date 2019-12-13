<template>
  <div class="app-menu">
    <ul ref="appmenu"  class="dropdown-menu">
        <li @click.stop="showMainFrame">{{$t('Show MainFrame')}}</li>
        <li @click.stop="resetMainFrame">{{$t('Reset MainFrame')}}</li>
        <li @click.stop="showSettingFrame">{{$t('Setting')}}</li>
        <li @click.stop="showAboutFrame">{{$t('About Us')}}</li>
        <li class="quit" @click.stop="quitClick">{{$t('Exit')}}</li>
    </ul>
  </div>
</template>

<script>
import i18n from '@/i18n'
export default {
  name: 'traymenu',
  metaInfo: {
        title: 'Traymenuframe', // set a title
        meta: [{                 // set meta
          name: 'keyWords',
          content: 'My Example App'
         }],
        htmlAttrs: {
          lang: 'en'
        }
  },
  updated() {

  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let tmp = this.$refs.appmenu
      this.$WebSDK('win.resize', tmp.offsetWidth, tmp.offsetHeight)
      document.body.style = 'overflow: hidden'

      this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
       switch (uri) {
         case this.$DataUri.App_CloseAllWindow:
            window.close()
            break
         case this.$DataUri.APP_LanguageChange:
            i18n.setLocale(data)
            break
        }
      }, this)
      this.$WebSDK('common.trayIconRightClickListener', () => {
        this.$WebSDK('win.bringToFront')
        this.PoupuMenu()
        this.$WebSDK('win.show')
       }, this)

      this.$WebSDK('common.trayIconHoverEnterListener', () => {
        this.trayenter = true
        this.clearDelay()
      }, this)
      this.$WebSDK('common.trayIconHoverLeaveListener', () => {
        this.trayenter = false
        this.delayHide()
      }, this)

      this.$WebSDK('win.regEvent', 'MouseEnter', () => {
        this.clearDelay()
        this.mouseenter = true
      }, this)
      this.$WebSDK('win.regEvent', 'MouseLeave', () => {
        this.mouseenter = false
        this.delayHide()
      }, this)

      document.body.oncontextmenu = (e) => {
        return false
      }
    },
    quitClick () {
       this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.App_CloseAllWindow, '')
       this.$WebSDK('win.hide')
    },
    showMainFrame() {
       //this.$WebSDK('common.trayIconSetIcon', '/res/cube-5.ico')
       //this.$WebSDK('common.trayIconBeginFlash')
       this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.MainFrame_ShowWindow, '')
       this.$WebSDK('win.hide')
       //this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.SettingFrame_SetTaskbarIcon, '')
    },
    resetMainFrame() {
       this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.MainFrame_ResetWindow, '')
       this.$WebSDK('win.hide')
    },
    showSettingFrame() {
       this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.SettingFrame_ShowWindow, '')
       this.$WebSDK('win.hide')
    },
    showAboutFrame() {
       this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.AboutFrame_ShowWindow, '')
       this.$WebSDK('win.hide')
    },
    clearDelay () {
      if (this.timeId !== undefined && this.timeId > 0) {
        clearTimeout(this.timeId)
      }
    },
    delayHide() {
      this.timeId = setTimeout(() => {
          if(!this.mouseenter && !this.trayenter)
            this.$WebSDK('win.hide')
        }, 500)
    },
    PoupuMenu() {
        this.$WebSDK('common.trayIconGetPopupPos').then((ret) => {
        var iconPos = ret.CenterPoint.map(function TrayIconProxyCalcWinPosMap (x) { return x / window.devicePixelRatio })
        var border = ret.Border[0]
        var menu = document.querySelector('.dropdown-menu')
        var menuWidth = menu.offsetWidth
        var menuHeight = menu.offsetHeight

        var x = 0
        var y = 0

        // calc menu window pos
        if (border === 0) { // tray icon on bottom
          x = iconPos[0]
          y = iconPos[1] - menuHeight + 10
        } else if (border === 1) { // tray icon on left side
          x = iconPos[0]
          y = iconPos[1] - menuHeight
        } else if (border === 2) { // tray icon on top
          x = iconPos[0] + 10
          y = iconPos[1]
        } else if (border === 3) { // tray icon on right side
          x = iconPos[0] - menuWidth
          y = iconPos[1] - menuHeight
        } else {
          this.$Logger.log('unknown tray icon border: ' + border)
        }

        // limit in screen range
       this.$WebSDK('sdk.getSdkInfo').then((info) => {
          x = Math.floor(Math.min(Math.max(x, 0), info.screenW - menuWidth))
          y = Math.floor(Math.min(Math.max(y, 0), info.screenH - menuHeight))
          console.log(menuWidth, menuHeight, x, y, iconPos, border)
          this.$WebSDK('win.resize', menuWidth, menuHeight)
          this.$WebSDK('win.move', x, y)
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.app-menu
{
  overflow: hidden;
}
.dropdown-menu{
  position: absolute;
  display: block;
  border-radius: 4px;
  top: 0;
  background: rgb(250, 255, 255);
  margin: 0;
  left: 0;
  z-index: 1000;
  padding: 5px 2px 5px 2px;
  font-size: 12px;
  text-align: left;
  list-style: none;
  border: 1px solid rgb(198, 208, 218);
  li{
      list-style-type: none;
      box-sizing: border-box;
      width: 100%;
      height: 28px;
      line-height: 28px;
      padding-left: 20px;
      padding-right: 20px;
      margin: 0;
      font-weight: normal;
      white-space: nowrap;
      color: rgb(0, 0, 0);
      cursor: default;
    &:hover{
      background-color: rgb(205, 214, 226);
    }
  }
  .borderline{
    border-bottom: 1px solid rgb(212, 216, 221);
  }
  li:nth-child(3) {
    height: 32px;
    line-height: 32px;
    border-top: solid 1px rgb(212, 216, 221);
  }
}
</style>
