const { Native, connectSignal } = window
export default {
  addWindowEventListener (listenerCallback, caller = null) {
    connectSignal(Native.Common.dataTransfered, (sender, receiver, uri, data) => {
      const payload = { uri, data }
      if (listenerCallback) {
        if (caller) {
          listenerCallback.apply(caller, [payload])
        } else {
          listenerCallback(payload)
        }
      }
    })
    // return new Promise()
  },
  dispatchWindowEvent (uri, data) {
    Native.Common.transfer('', '', uri, data)
    // return new Promise()
  },
  /**
   * connectSignal封装
   * @param {*} eventName
   * @param {*} callback
   */
  addWindowEventListenerByEvent (eventName, callback) {
    return connectSignal(eventName, callback)
  }
}
