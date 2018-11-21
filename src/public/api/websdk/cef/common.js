const { YY, connectSignal } = window
export default {
  trayIconLeftClickListener (callback, caller) {
    YY.Common.trayIcon().then((icon) => {
      connectSignal(icon.onLeftButtonClicked, () => {
        if (!callback) return
        if (caller) {
          callback.apply(caller)
        } else {
          callback()
        }
      })
    })
  },
  trayIconRightClickListener (callback, caller) {
    YY.Common.trayIcon().then((icon) => {
      connectSignal(icon.onRightButtonClicked, () => {
        if (!callback) return
        if (caller) {
          callback.apply(caller)
        } else {
          callback()
        }
      })
    })
  },
  trayIconHoverLeaveListener (callback, caller) {
    YY.Common.trayIcon().then((icon) => {
      connectSignal(icon.onHoverLeave, () => {
        if (!callback) return
        if (caller) {
          callback.apply(caller)
        } else {
          callback()
        }
      })
    })
  },
  trayIconHoverEnterListener (callback, caller) {
    YY.Common.trayIcon().then((icon) => {
      connectSignal(icon.onHoverEnter, () => {
        if (!callback) return
        if (caller) {
          callback.apply(caller)
        } else {
          callback()
        }
      })
    })
  },
  trayIconShow () {
    YY.Common.trayIcon().then((icon) => {
      icon.show()
    })
  },
  trayIconToolTip (tips) {
    YY.Common.trayIcon().then((icon) => {
      icon.setToolTip(tips)
    })
  },
  trayIconGetPopupPos () {
    return new Promise((resolve, reject) => {
      YY.Common.trayIcon().then((icon) => {
        icon.getPopupPos().then((ret) => {
          resolve(ret)
        })
      })
    })
  },

  trayIconBeginFlash () {
    YY.Common.trayIcon().then((icon) => {
      icon.beginFlashIcon()
    })
  },

  trayIconStopFlash () {
    YY.Common.trayIcon().then((icon) => {
      icon.stopFlashIcon()
    })
  },

  trayIconSetIcon (iconRes) {
    YY.Common.trayIcon().then((icon) => {
      icon.setIcon(iconRes)
    })
  },
  trayIcon () {
    return YY.Common.trayIcon()
  },

  //= ==========================
  setConfig (key, value) {
    return YY.Common.setConfig(key, value)
  },
  getConfig (key) {
    return new Promise((resolve, reject) => {
      YY.Common.getConfig(key).then(resp => {
        resolve(resp)
      }).catch(err => {
        reject(err)
      })
    })
  },
  switchToLogin (value) {
    return YY.Common.switchToLogin('')
  },
  isAutoRun () {
    return YY.Common.isAutoRun()
  },
  setAutoRun (value) {
    YY.Common.setAutoRun(value)
  },
  //= ============
  onAudioChatKeyPressed (callback, caller) {
    YY.Common.nhotKey().then((r) => {
      connectSignal(r.nhotkeyPressed, (name) => {
        if (!callback) return
        if (caller) {
          callback.apply(caller, [name])
        } else {
          callback(name)
        }
      })
    })
  },
  onAudioChatKeyReleased (callback, caller) {
    YY.Common.nhotKey().then((r) => {
      connectSignal(r.nhotkeyReleased, (name) => {
        if (!callback) return
        if (caller) {
          callback.apply(caller, [name])
        } else {
          callback(name)
        }
      })
    })
  },
  unregisterNHotkey (name) {
    return YY.Common.nhotKey().then((r) => {
      r.unregisterNHotkey(name)
    })
  },
  registerNHotkey (name, key, b) {
    return YY.Common.nhotKey().then((r) => {
      r.registerNHotkey(name, key, b)
    })
  },
  onKeyPressed (callback, caller) {
    YY.Common.nhotKey().then((r) => {
      connectSignal(r.nhotkeyPressed, (name) => {
        if (!callback) return
        if (caller) {
          callback.apply(caller, [name])
        } else {
          callback(name)
        }
      })
    })
  },
  onKeyReleased (callback, caller) {
    YY.Common.nhotKey().then((r) => {
      connectSignal(r.nhotkeyReleased, (name) => {
        if (!callback) return
        if (caller) {
          callback.apply(caller, [name])
        } else {
          callback(name)
        }
      })
    })
  },
  onKeyList (key) {
    YY.Common.nhotKey().then(res => res.registeredHotkeys(key).then(keys => console.log('keys are', keys)))
  },
  print (type, value) {
    YY.Common.print(type, value.toString())
  },
  OnKeyPressed (callback, caller) {
    YY.Common.nhotKey().then((r) => {
      connectSignal(r.nhotkeyPressed, (name) => {
        if (!callback) return
        if (caller) {
          callback.apply(caller, [name])
        } else {
          callback(name)
        }
      })
    })
  },
  connectSignal (type, callback, caller) {
    connectSignal(type, data => {
      if (!callback) return
      if (caller) {
        callback.apply(caller, [data])
      } else {
        callback(data)
      }
    })
  }

}
