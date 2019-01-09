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
  /**
   * 注入录频
   * @param processId
   * @param threadId
   * @return {*}
   */
  injectOverlay (processId, threadId) {
    return YY.sdk.injectOverlay(processId, threadId)
  }

}
