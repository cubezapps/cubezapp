const { Native } = window
export default {
  hideLoading () {
    return Native.Sdk.loadingWindow.hide(...arguments)
  },
  showLoading () {
    return Native.Sdk.loadingWindow.show(...arguments)
  },
  // this.$WebSDK('sdk.openWindow', url, '_blank', param)
  async openWindow () {
    return Native.Sdk.open(...arguments)
  },
  async getSdkVersion () {
    return Native.Sdk.getSdkVersion(...arguments)
  },
  getCurLang () {
    return Native.Sdk.getCurLang(...arguments)
  },
  webReady () {
    return Native.Sdk.webReady(...arguments)
  },
  getSdkInfo () {
    return Native.Sdk.getSdkInfo(...arguments)
  },
  cancelUpdateTimer () {
    return Native.Sdk.cancelUpdateTimer(...arguments)
  },
  doUpdate () {
    return Native.Sdk.doUpdate(...arguments)
  },
  /**
   * 注入录频
   * @param processId
   * @param threadId
   * @return {*}
   */
  injectOverlay (processId, threadId) {
    return Native.Sdk.injectOverlay(processId, threadId)
  },
  async cefBrowser() {
    return Native.Sdk.cefBrowser(...arguments)
  }

}
