<template>
  <div class="app-menu">
    <ul ref="appmenu"  class="dropdown-menu">
        <li class="about" @click.stop="showMainFrame">Show MainFrame</li>
        <li class="quit" @click.stop="quitClick">Exit</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'traymenu',
  metaInfo: {
        title: 'traymenuframe', // set a title
        meta: [{                 // set meta
          name: 'keyWords',
          content: 'My Example App'
         }],
        htmlAttrs: {
          lang: 'zh-CN'
        }
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
         case this.$DataUri.$App_CloseAllWindow:
           window.close()
           break
        }
      }, this)
      this.$WebSDK('common.trayIconRightClickListener', () => {
        this.$WebSDK('win.restore')
        this.$WebSDK('win.forefront')
        this.PoupuMenu()
        this.$WebSDK('win.show')
       }, this)

      this.$WebSDK('common.trayIconHoverEnterListener', () => {
        this._trayenter = true
        this.clearDelay()
      }, this)
      this.$WebSDK('common.trayIconHoverLeaveListener', () => {
        this._trayenter = false
        this.delayHide()
      }, this)

      this.$WebSDK('win.regEvent', 'MouseEnter', () => {
        this.clearDelay()
        this._mouseenter = true
      }, this)
      this.$WebSDK('win.regEvent', 'MouseLeave', () => {
        this._mouseenter = false
        this.delayHide()
      }, this)

      document.body.oncontextmenu = (e) => {
        return false
      }
    },
    quitClick () {
       this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.App_CloseAllWindow, '')
    },
    showMainFrame() {
       this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.MainFrame_ShowWindow, '')
    },
    clearDelay () {
      if (this._timeId !== undefined && this._timeId > 0) {
        clearTimeout(this._timeId)
      }
    },
    delayHide() {
      this._timeId = setTimeout(() => {
          if(!this._mouseenter && !this._trayenter)
            this.$WebSDK('win.hide')
        }, 500)
    },
    PoupuMenu() {
        this.$WebSDK('common.trayIconGetPopupPos').then((ret) => {
        var iconPos = ret.CenterPoint.map(function TrayIconProxyCalcWinPosMap (x) { return x / window.devicePixelRatio })
        var border = ret.Border[0]
        this.$Logger.log('document.body.offsetWidth = ' + document.body.offsetWidth)
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
  // width: 100%;
  border-radius: 4px;
  position: absolute;
  display: block;
  top: 0;
  background: #2d3849;
  margin: 0;
  left: 0;
  z-index: 1000;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 14px;
  text-align: left;
  list-style: none;
  border: 1px solid #17202c;
  // box-shadow: 0 2px 8px rgba(5, 12, 20, 0.2);
  li{
      list-style-type: none;
      box-sizing: border-box;
      width: 100%;
      height: 34px;
      line-height: 34px;
      padding-left: 20px;
      padding-right: 20px;
      margin: 0;
      font-weight: normal;
      white-space: nowrap;
      color: #e2e3e4;
      cursor: default;
    &:hover{
      background-color: #222e3f;
    }
  }
  .about{
    border-bottom: 1px solid #2c333c;
  }
  li:nth-child(3) {
    height: 44px;
    line-height: 44px;
    border-top: solid 1px rgba(250, 250, 250, 0.1);
  }
}
</style>
