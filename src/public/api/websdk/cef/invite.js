const { YY, connectSignal } = window
export default {
  pendingTicket () {
    return YY.NWindow.pendingTicket()
  },
  setUserInfo (uid, nickName, photoUrl) {
    return YY.NWindow.setUserInfo(Number(uid), nickName, photoUrl)
  },
  ticketArrivedListener (callback, caller) {
    connectSignal(YY.NWindow.ticketArrived, (inviteMsg) => {
      if (!callback) return
      if (caller) {
        callback.apply(caller, [inviteMsg])
      } else {
        callback(inviteMsg)
      }
    })
  },
  /**
   * 获取邀请用户列表
   */
  ytUserInfo () {
    return YY.ytRun.ytUserInfo()
  },
  /**
   * 邀请选择跳转
   * @param {*} index
   */
  ytJump (index) {
    return YY.ytRun.jump(index)
  },
  ytTicket () {
    return YY.ytRun.ytTicket()
  },
  /**
   * 调起到该登录用户客户端
   * @param {*} jumpTicket
   */
  jumpWithNewAccount (jumpTicket) {
    return YY.ytRun.jumpWithNewAccount(`${jumpTicket.split(']')[0]}&uid=4294967295]/`)
  }
}
