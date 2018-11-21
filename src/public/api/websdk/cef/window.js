export default {
  /**
   * 关闭窗口监听
   * @param {sdk open } win
   * @param {*} callback
   */
  closeWindowListener (win, callback) {
    window.connectSignal(win.sigDestroy, callback)
  },
  windowOnUnload (callback) {
    window.onunload = callback
  }
}
