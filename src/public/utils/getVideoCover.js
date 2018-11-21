import { base64toblob } from './blob'

function setDouble (num) {
  return num >= 10 ? num : '0' + num
}

/**
 * 格式化时长
 * @param num
 * @return {string}
 */
export function formatDuration (num) {
  num = typeof num === 'number' ? num : parseFloat(num)

  if (!isNaN(num)) {
    let strTime = ''
    let hours = ''
    let minutes = ''
    let seconds = ''
    num = Math.floor(num)
    if (num >= 3600) {
      hours = parseInt(num / 3600)
      minutes = parseInt(num % 3600 / 60)
      seconds = num % 60
      strTime = hours + ':' + setDouble(minutes) + ':' + setDouble(seconds)
    } else if (num >= 60) {
      minutes = parseInt(num / 60)
      seconds = num % 60
      strTime = setDouble(minutes) + ':' + setDouble(seconds)
    } else {
      strTime = '00:' + setDouble(num)
    }

    return strTime
  }

  return '00:00'
}

/**
 * 绘制视频封面图
 * @param video {HTMLVideoElement}
 * @return {Blob}
 */
export function canvasDramVideo (video) {
  const canvas = document.createElement('canvas')
  const width = canvas.width = video.videoWidth
  const height = canvas.height = video.videoHeight
  const context = canvas.getContext('2d')
  context.drawImage(video, 0, 0, width, height)
  const base64 = canvas.toDataURL('image/jpeg', 0.9)
  return base64toblob(base64)
}

/**
 * 获取视频封面图
 * @param src {String}
 * @param currentTime {Number}
 * @return {Promise<any>}
 */
export default async function (src, currentTime = 1) {
  return new Promise((resolve, reject) => {
    const info = {}
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.onloadedmetadata = function () {
      // 图像不能解码
      if (this.videoWidth === 0 || this.videoHeight === 0) {
        video.onerror = null
        video.onseeked = null
        video.src = ''
        reject(new Error('MEDIA_ERR_DECODE'))
      } else {
        info.duration = this.duration
        info.width = this.videoWidth
        info.height = this.videoHeight
        video.currentTime = currentTime
      }
      video.onloadedmetadata = null
    }
    video.onerror = function (event) {
      video.onerror = null
      video.onloadedmetadata = null
      video.onseeked = null
      video.src = ''
      reject(new Error(event.error))
    }
    video.onseeked = function () {
      info.coverBlob = canvasDramVideo(video)
      video.onseeked = null
      video.src = ''
      resolve(info)
    }
    video.src = src
  })
}
