import WebSDK from '@/public/api/websdk'
import DataUri from '@/public/common/DataUri'
import Logger from '@/public/base/Logger'

export default class TrayIcon {
  static init () {
    this.listenTrayLeftClick()
    this.listenTrayRightClick()
   // this.listenHover()
    WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
      switch (uri) {
        case DataUri.TrayIcon_UpdateTips:
          this.setTrayToolTip(data)
          break
      }
    }, this)
    this.showTrayIcon()
  }

  static listenTrayLeftClick () {
    WebSDK('common.trayIconLeftClickListener', () => {
      WebSDK('ipc.dispatchWindowEvent', DataUri.MainFrame_ShowWindow, '')
    
    }, this)
  }

  static listenHover () {
    const self = this
    WebSDK('common.trayIconHoverLeaveListener', () => {
      self._hoverIcon = false
      self.startDelayHideTimer()
    }, this)
    WebSDK('common.trayIconHoverEnterListener', () => {
      Logger.log('MessagePopPanel on enter tray icon, 马上显示菜单！！')
      // self.stopDelayHideTimer()
      self._inPanel = false
      self._hoverIcon = true
      self.clearDelay()
    }, this)
  }

  static hide () {
    WebSDK('win.hide')
    this._inPanel = false
    this.clearDelay()
    this._delayIndex = 0
  }
  static startDelayHideTimer () {
    if ((this._delayIndex !== undefined && this._delayIndex > 0) || this._inPanel) return
    this._delayIndex = setTimeout(() => {
      this.hide()
    }, 100)
  }
  static clearDelay () {
    if (this._delayIndex !== undefined && this._delayIndex > 0) {
      Logger.log('取消定时 !!!')
      clearTimeout(this._delayIndex)
    }
  }

  static showTrayIcon () {
    WebSDK('common.trayIconShow')
  }

  static setTrayToolTip (str) {
    Logger.log('set tray tooltip to:' + str)
    WebSDK('common.trayIconToolTip', str)
  }

  static listenTrayRightClick () {
    var self = this
    WebSDK('common.trayIconRightClickListener', () => {
      Logger.log('common.trayIconRightClickListener')
      self.popupAppMenu()
    }, this)
  }

  static popupAppMenu () {
    this.calcWinPos().then((resp) => {
      WebSDK('win.move', resp.x, resp.y)
      WebSDK('win.bringToFront')
      WebSDK('win.show')
    })
  }

  static calcWinPos () {
    // get tray icon pos
    return new Promise((resolve, reject) => {
      WebSDK('common.trayIconGetPopupPos').then((ret) => {
        var iconPos = ret.CenterPoint.map(function TrayIconCalcWinPosMap (x) { return x / window.devicePixelRatio })
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
          Logger.log('unknown tray icon border: ' + border)
        }

        // limit in screen range
        WebSDK('sdk.getSdkInfo').then((info) => {
          x = Math.floor(Math.min(Math.max(x, 0), info.screenW - menuWidth))
          y = Math.floor(Math.min(Math.max(y, 0), info.screenH - menuHeight))
          console.log(menuWidth, menuHeight, x, y, iconPos, border)
          // alert('menu pos x=' + x + ' y=' + y);
          resolve({ x: x, y: y })
        })
      })
    })
  }
}

export const TrayIconPlugin = {
  install (Vue) {
    Vue.prototype.$TrayIcon = TrayIcon
  }
}