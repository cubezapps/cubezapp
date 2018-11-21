import { requestFullscreen, exitFullscreen, fullscreenElement } from '@/public/utils/fullscreen.js'

export default {
  requestFullscreen () {
    return requestFullscreen()
  },
  exitFullscreen () {
    return exitFullscreen()
  },
  isFullscreen () {
    return !!document[fullscreenElement]
  }
}
