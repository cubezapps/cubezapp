const { YY } = window
export default {
  hideLoading () {
    return YY.sdk.loadingWindow.hide(...arguments)
  },
  showLoading () {
    return YY.sdk.loadingWindow.show(...arguments)
  },
  // this.$WebSDK('sdk.openWindow', url, '_blank', param)
  openWindow () {
    return YY.sdk.open(...arguments)
  },
  getSdkVersion () {
    return YY.sdk.getSdkVersion(...arguments)
  },
  getCurLang () {
    return YY.sdk.getCurLang(...arguments)
  },
  webReady () {
    return YY.sdk.webReady(...arguments)
  },
  getSdkInfo () {
    return YY.sdk.getSdkInfo(...arguments)
  },
  cancelUpdateTimer () {
    return YY.sdk.cancelUpdateTimer(...arguments)
  },
  doUpdate () {
    return YY.sdk.doUpdate(...arguments)
  },
  getTopWindows () {
    return YY.sdk.getTopWindows(...arguments)
  },
  getCurrentProcessId () {
    return YY.sdk.getCurrentProcessId(...arguments)
  },
  /**
   * 获取文件夹下面的文件列表
   * @param dir {string} 文件夹绝对路径
   * @return {Promise<*|Promise<*>>}
   */
  async getFolderFiles (dir) {
    return YY.sdk.getFolderFiles(dir)
  },
  /**
   * 删除文件
   * @param path {string} 文件绝对路径
   * @return {Promise<boolean>}
   */
  async deleteFile (path) {
    return YY.sdk.deleteFiles([path])
  },
  /**
   * 批量删除文件
   * @param pathArr {Array<string>}
   * @return {Promise<*|Promise<*>>}
   */
  async deleteFiles (pathArr) {
    return YY.sdk.deleteFiles(pathArr)
  },
  /**
   * 打开文件夹
   * @param path {string} 文件夹绝对路径
   * @return {Promise<boolean>}
   */
  async openFolder (path) {
    return YY.sdk.openFolder(path)
  },
  /**
   * 选择文件夹
   * @param title
   * @return {*|PromiseLike<T | never>|Promise<T | never>}
   */
  chooseFolder (title) {
    return YY.sdk.chooseFolder(title).then(res => {
      return res && res.replace(/\\/g, '/')
    })
  },
  /**
   * 注入录频
   * @param processId
   * @param threadId
   * @return {*}
   */
  injectOverlay (processId, threadId) {
    return YY.sdk.injectOverlay(processId, threadId)
  },
  /**
   * 获取目录
   * @return {*}
   */
  getAppDataPath () {
    return YY.sdk.getAppDataPath()
  },
  /**
   * 获取文件信息
   * @param path {string}
   * @return {Promise<object{isFile: boolean, isDir: boolean, exists: boolean}>}
   */
  async getFileInfo (path) {
    return YY.sdk.getFileInfo(path)
  }
}
