const { Native, connectSignal } = window
export default {
  trayIconLeftClickListener (callback, caller) {
    Native.Common.trayIcon().then((icon) => {
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
    Native.Common.trayIcon().then((icon) => {
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
    Native.Common.trayIcon().then((icon) => {
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
    Native.Common.trayIcon().then((icon) => {
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
    Native.Common.trayIcon().then((icon) => {
      icon.show()
    })
  },
  trayIconToolTip (tips) {
    Native.Common.trayIcon().then((icon) => {
      icon.setToolTip(tips)
    })
  },
  trayIconGetPopupPos () {
    return new Promise((resolve, reject) => {
      Native.Common.trayIcon().then((icon) => {
        icon.getPopupPos().then((ret) => {
          resolve(ret)
        })
      })
    })
  },

  trayIconBeginFlash () {
    Native.Common.trayIcon().then((icon) => {
      icon.beginFlashIcon()
    })
  },

  trayIconStopFlash () {
    Native.Common.trayIcon().then((icon) => {
      icon.stopFlashIcon()
    })
  },

  trayIconSetIcon (iconRes) {
    Native.Common.trayIcon().then((icon) => {
      icon.setIcon(iconRes)
    })
  },
  trayIcon () {
    return Native.Common.trayIcon()
  },

  //= ==========================
  setConfig (key, value) {
    return Native.Common.setConfig(key, value)
  },
  getConfig (key) {
    return new Promise((resolve, reject) => {
      Native.Common.getConfig(key).then(resp => {
        resolve(resp)
      }).catch(err => {
        reject(err)
      })
    })
  },
  switchToLogin (value) {
    return Native.Common.switchToLogin('')
  },
  isAutoRun () {
    return Native.Common.isAutoRun()
  },
  setAutoRun (value) {
    Native.Common.setAutoRun(value)
  },
  //= ============
  onAudioChatKeyPressed (callback, caller) {
    Native.Common.nhotKey().then((r) => {
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
    Native.Common.nhotKey().then((r) => {
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
    return Native.Common.nhotKey().then((r) => {
      r.unregisterNHotkey(name)
    })
  },
  registerNHotkey (name, key, b) {
    return Native.Common.nhotKey().then((r) => {
      r.registerNHotkey(name, key, b)
    })
  },
  onKeyPressed (callback, caller) {
    Native.Common.nhotKey().then((r) => {
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
    Native.Common.nhotKey().then((r) => {
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
    Native.Common.nhotKey().then(res => res.registeredHotkeys(key).then(keys => console.log('keys are', keys)))
  },
  print (type, value) {
    Native.Common.print(type, value.toString())
  },
  OnKeyPressed (callback, caller) {
    Native.Common.nhotKey().then((r) => {
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
  },
    /**
   * 获取目录
   * @return {*}
   */
  getAppDataPath () {
    return Native.Common.getAppDataPath()
  },
  /**
   * 获取文件信息
   * @param path {string}
   * @return {Promise<object{isFile: boolean, isDir: boolean, exists: boolean}>}
   */
  async getFileInfo (path) {
    return Native.Common.getFileInfo(path)
  },

  getTopWindows () {
    return Native.Common.getTopWindows(...arguments)
  },
  getCurrentProcessId () {
    return Native.Common.getCurrentProcessId(...arguments)
  },
  /**
   * 获取文件夹下面的文件列表
   * @param dir {string} 文件夹绝对路径
   * @return {Promise<*|Promise<*>>}
   */
  async getFolderFiles (dir) {
    return Native.Common.getFolderFiles(dir)
  },
  /**
   * 删除文件
   * @param path {string} 文件绝对路径
   * @return {Promise<boolean>}
   */
  async deleteFile (path) {
    return Native.Common.deleteFiles([path])
  },
  /**
   * 批量删除文件
   * @param pathArr {Array<string>}
   * @return {Promise<*|Promise<*>>}
   */
  async deleteFiles (pathArr) {
    return Native.Common.deleteFiles(pathArr)
  },
  /**
   * 打开文件夹
   * @param path {string} 文件夹绝对路径
   * @return {Promise<boolean>}
   */
  async openFolder (path, createifnoexist) {
    return Native.Common.openFolder(path, createifnoexist)
  },
  /**
   * 选择文件夹
   * @param title
   * @return {*|PromiseLike<T | never>|Promise<T | never>}
   */
  chooseFolder (title) {
    return Native.Common.chooseFolder(title).then(res => {
      return res && res.replace(/\\/g, '/')
    })
  },
  async parseShortcutFiles (data) {
    return Native.Common.parseShortcutFiles(data)
  },
  async executeFile(file) {
    return Native.Common.executeFile(file)
  },
  async getSystemDir () {
    return Native.Common.getSystemDir()
  },
  async getDesktopFilePath() {
    return Native.Common.getDesktopFilePath()
  },
  async getDesktopDir() {
    return Native.Common.getDesktopDir()
  },
  async fileSystemWatcher(path) {
    return Native.Common.fileSystemWatcher(path)
  }
}
