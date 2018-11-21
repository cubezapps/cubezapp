import Logger from '@/public/base/Logger'
import SparkMD5 from 'spark-md5'

const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice

const prefixRegExp = /^data:(.+);base64,(.+)/

/**
 * 格式化文件尺寸 EX:1.00MB
 * @param value {Number}
 * @return {String}
 */
export function formatFileSize (value) {
  const unitArray = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const floatSize = parseFloat(value)
  const index = Math.floor(Math.log(floatSize) / Math.log(1024))
  const size = (floatSize / Math.pow(1024, index)).toFixed(2)
  return size + unitArray[index]
}

/**
 * base64 转 blob
 * @param base64 {String}
 * @param mimeType {String} 优先使用base64带的格式
 * @return {Blob}
 */
export function base64toblob (base64, mimeType = 'image/jpeg') {
  const prefixMatch = base64.match(prefixRegExp)

  if (prefixMatch) {
    mimeType = prefixMatch[1]
    base64 = prefixMatch[2]
  }
  const byteChars = atob(base64)
  const uint8Array = new Uint8Array(byteChars.length)

  for (let i = 0; i < byteChars.length; i++) {
    uint8Array[i] = byteChars.charCodeAt(i)
  }

  return new Blob([uint8Array], { type: mimeType })
}

/**
 * blob 转 base64
 * @param blob {Blob}
 * @return {Promise<any>}
 */
export async function blobtobase64 (blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    reader.onabort = (abort) => {
      reject(abort)
    }
    reject.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(blob)
  })
}

/**
 * 获取文件 md5
 * @param file {Blob}
 * @return {Promise<any>}
 */
export async function getFileMd5 (file) {
  return new Promise((resolve, reject) => {
    const chunkSize = 2097152
    const chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()

    fileReader.onload = function (e) {
      spark.append(e.target.result)
      currentChunk++

      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }

    fileReader.onerror = function () {
      reject(new Error('getFileMd5 fileReader fail.'))
    }

    function loadNext () {
      const start = currentChunk * chunkSize
      const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    loadNext()
  })
}

/**
 * 获取图片文件尺寸
 * @param url {String}
 * @return {Promise<any>}
 */
export async function getImageSize (url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      const width = img.naturalWidth
      const height = img.naturalHeight
      img.onload = null
      img.onerror = null
      resolve({
        url,
        width,
        height
      })
    }
    img.onerror = function () {
      img.onload = null
      img.onerror = null
      reject(new Error('Image load fail.'))
    }
    img.src = url
  })
}

/**
 * 获取文件 blob
 * @param url {string}
 * @return {Promise<Blob>}
 */
export async function fetchBlob (url) {
  const response = await fetch(url)
  if (!response.ok) {
    const log = `fetchBlob "${url}" was not ok.`
    Logger(log)
    throw new Error(log)
  }
  return response.blob()
}
