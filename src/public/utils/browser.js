/**
 * 浏览器检测
 * Android 360 浏览器 userAgent 和 Chrome 一样, 猎豹,百度等等这些浏览器会在后面增加标识, 用这个特点区分
 */

const u = navigator.userAgent

export default {
  mobile: /Mobile|Android|Symbian/i.test(u),
  android: /Android|Adr/i.test(u),
  ios: /iPhone|iPad|iPod/i.test(u),
  symbian: /Symbian/i.test(u),
  windowsPhone: /Windows Phone/i.test(u),
  blankBerry: /BB/i.test(u),
  weChat: /MicroMessenger/i.test(u),
  qq: /MQQBrowser/i.test(u),
  uc: /UCBrowser/i.test(u),
  chrome: /Chrome\/[\d\\.]+ Mobile Safari\/[\d\\.]+$/i.test(u),
  firefox: /Firefox/i.test(u),
  ie: /MSIE/i.test(u),
  ie11: /Trident\/7\.0/i.test(u),
  edge: /Edge/i.test(u)
}
