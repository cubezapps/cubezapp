// 全屏事件检测
const html = document.documentElement
const fullscreenchangeEvents = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange']
const fullscreenElementNames = ['fullscreenElement', 'webkitFullscreenElement', 'webkitCurrentFullScreenElement', 'mozFullScreenElement', 'msFullscreenElement']
export const requestFullscreen = html.requestFullscreen || html.webkitRequestFullScreen || html.mozRequestFullScreen || html.msRequestFullscreen
export const exitFullscreen = document.exitFullscroll || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen
export const fullscreenEnabled = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || true
export let fullscreenchange
export let fullscreenElement

fullscreenchangeEvents.some((event) => {
  if ('on' + event in document) {
    fullscreenchange = event
    return true
  }
})

fullscreenElementNames.some((element) => {
  if (element in document) {
    fullscreenElement = element
    return true
  }
})
