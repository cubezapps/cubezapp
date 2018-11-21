const { localStorage } = window
export default {
  trayIconLeftClickListener (callback, caller) { },
  trayIconRightClickListener (callback, caller) {},
  trayIconHoverLeaveListener (callback, caller) {},
  trayIconHoverEnterListener (callback, caller) {},
  trayIconShow () {},
  trayIconToolTip (tips) {},
  trayIconGetPopupPos () {},
  trayIconBeginFlash () {},
  trayIconStopFlash () {},
  trayIconSetIcon (iconRes) {},

  //= ==========================
  setConfig (key, value) {
    return new Promise((resolve, reject) => {
      localStorage.setItem(key, value)
      resolve(value)
    })
  },
  getConfig (key) {
    return new Promise((resolve, reject) => {
      resolve(localStorage.getItem(key))
    })
  },
  switchToLogin (value) {
  },
  isAutoRun () {
    return new Promise((resolve, reject) => {
      resolve(false) // web版必然没有自动启动
    })
  },
  setAutoRun (value) {},
  onAudioChatKeyPressed (callback, caller) {},
  onAudioChatKeyReleased (callback, caller) {},
  unregisterNHotkey (name) {},
  registerNHotkey (name, key, b) {},
  print () {}
}
