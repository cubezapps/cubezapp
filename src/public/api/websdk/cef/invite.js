const { Native, connectSignal } = window
export default {
  pendingTicket () {
    return Native.NativeWindow.pendingTicket()
  },
  setUserInfo (uid, nickName, photoUrl) {
    return Native.NativeWindow.setUserInfo(Number(uid), nickName, photoUrl)
  },
  ticketArrivedListener (callback, caller) {
    connectSignal(Native.NativeWindow.ticketArrived, (inviteMsg) => {
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
    return Native.Ticket.userInfo()
  },
  /**
   * 邀请选择跳转
   * @param {*} index
   */
  ytJump (index) {
    return Native.Ticket.jump(index)
  },
  ytTicket () {
    return Native.Ticket.ticket()
  },
  /**
   * 调起到该登录用户客户端
   * @param {*} jumpTicket
   */
  jumpWithNewAccount (jumpTicket) {
    return Native.Ticket.jumpWithNewAccount(`${jumpTicket.split(']')[0]}&uid=4294967295]/`)
  }
}
