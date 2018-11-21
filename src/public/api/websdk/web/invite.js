export default {
  pendingTicket () {
    console.log('web has not pendingTicket')
    return Promise.reject(new Error('not method'))
  },
  setUserInfo (uid, nickName, photoUrl) {
  },
  ticketArrivedListener (callback, caller) {},
  /**
   * 获取邀请用户列表
   */
  ytUserInfo () {
    console.log('web has not ytUserInfo')
    return Promise.reject(new Error('not method'))
  },
  /**
   * 邀请选择跳转
   * @param {*} index
   */
  ytJump (index) {
  },
  ytTicket () {
    console.log('web has not ytTicket')
    return Promise.reject(new Error('not method'))
  },
  /**
   * 调起到该登录用户客户端
   * @param {*} jumpTicket
   */
  jumpWithNewAccount (jumpTicket) {
  }
}
