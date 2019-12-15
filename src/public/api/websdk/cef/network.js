const { Native, connectSignal } = window
export default {
  sendFile (ip, port, path) {
    return Native.Network.sendFile(ip, port, path)
  },
  recvFile(ip, port, jobid, folder, filename, type) {
    return Native.Network.recvFile(ip, port, jobid, folder, filename, type)
  },
  message(ip, port, value) {
    return Native.Network.message(ip, port, value)
  },
  cancelTransfile(ip, port, jobid) {
    return Native.Network.cancelTransfile(ip, port, jobid)
  },
  addressEntries() {
    return Native.Network.addressEntries()
  },
  uniCast(ip, port, computer, mac) {
    return Native.Network.uniCast(ip, port, computer, mac)
  },
  boardCast() {
    return Native.Network.boardCast()
  },
  onMessage(callback) {
    connectSignal(Native.Network.onMessage, (ip, port, message) => {
      callback(ip, port, message)
    })
  },
  onTransFileReq(callback) {
    connectSignal(Native.Network.onTransFileReq, (ip, port, jobid, filename, type) => {
      callback(ip, port, jobid, filename, type)
    })
  },
  onTransFileCancel(callback) {
    connectSignal(Native.Network.onTransFileCancel, (ip, port, jobid) => {
      callback(ip, port, jobid)
    })
  },
  onTransFileRes(callback) {
    connectSignal(Native.Network.onTransFileRes, (ip, port, jobid, accept) => {
      callback(ip, port, jobid, accept)
    })
  },
  onTransFileJobFinish(callback) {
    connectSignal(Native.Network.onTransFileJobFinish, (ip, jobid) => {
      callback(ip, jobid)
    })
  },
  onRecvAllJobFinish(callback) {
    connectSignal(Native.Network.onRecvAllJobFinish, (ip, jobid) => {
      callback(ip, jobid)
    })
  },
  onStaticst(callback) {
    connectSignal(Native.Network.onStaticst, (data) => {
      callback(data)
    })
  },
  onBoardCast(callback) {
    connectSignal(Native.Network.onBoardCast, (ip, port, computerName, macAddr) => {
      callback(ip, port, computerName, macAddr)
    })
  },
  onUniCast(callback) {
    connectSignal(window.Native.Network.onUniCast, (ip, port, computerName, macAddr) => {
      callback(ip, port, computerName, macAddr)
    })
  }
}