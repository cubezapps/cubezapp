class WinUtil {
  static openApp (param) {
    const { channelId, roomType, roomId, linkCreator, sessionid, linkType, link } = param
    const ua = window.navigator.userAgent
    console.log('openApp', param)
    // 在非window环境下，不打开app
    if (/(android)|(ios)|(Mac)/i.test(ua)) {
      return
    }
    const href = `moschat://pd-[link=${link}&channelId=${channelId}&roomType=${roomType}&roomId=${roomId}&linkCreator=${linkCreator}&sessionid=${sessionid}&linkType=${linkType}]/`
    this.createIframe(href)
  }

  static createIframe (src) {
    const iframe = document.createElement('iframe')
    iframe.src = src
    document.body.appendChild(iframe)
    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 0)
  }
}

export { WinUtil as default }
