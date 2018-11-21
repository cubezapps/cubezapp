import { blobtobase64, base64toblob } from './blob'
import { TX_CLOUD_IMAGEVIEW2_ORIGIN, TXCDNprefix } from '@/config'

/**
 * 图片压缩，Gif格式的图片不压缩
 * @param originBlob      {Blob} 二进制源文件
 * @param maxSize         {Number} 最大尺寸
 * @param encoderOptions  {Number} 压缩比 0-1
 * @return {Promise<any>}
 */
export async function compressImage (originBlob, maxSize = 2560, encoderOptions = 0.9) {
  const url = await blobtobase64(originBlob)
  const blobMimeType = originBlob.type
  const isGif = blobMimeType === 'image/gif'
  const isPng = blobMimeType === 'image/png'

  return new Promise((resolve, reject) => {
    const img = new Image()

    if (isGif) {
      img.onload = () => {
        resolve({
          base64: url,
          mimeType: 'image/gif',
          blob: originBlob,
          width: img.width,
          height: img.height
        })
      }
    } else {
      img.onload = () => {
        const imgWidth = img.width
        const imgHeight = img.height
        const ratio = imgWidth / imgHeight

        let width = imgWidth
        let height = imgHeight

        if (width > maxSize) {
          width = maxSize
          height = Math.floor(width / ratio)
        }
        if (height > maxSize) {
          height = maxSize
          width = Math.floor(height * ratio)
        }

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height

        let mimeType = blobMimeType
        if (mimeType === 'image/bmp') {
          mimeType = 'image/jpeg'
        }
        context.drawImage(img, 0, 0, width, height)

        const base64 = canvas.toDataURL(mimeType, !isPng ? encoderOptions : void 0)
        const blob = base64toblob(base64, mimeType)

        resolve({
          base64,
          mimeType,
          blob,
          width,
          height
        })
      }
    }

    img.onerror = (error) => {
      reject(error)
    }

    img.src = url
  })
}

// 判断是否支持 webp 格式
export const isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0

// 详细文档地址：https://cloud.tencent.com/document/product/460/6929
/**
 * 获取腾讯云万象优图缩略图
 * @param url {string} 源图片地址
 * @param mode {number} 宽高限制方式
 * @param width {number} 宽度
 * @param height {number} 高度
 * @param q {number} 图片质量<0-100>
 * @param format {string} 图片格式
 * @return {string}
 */
export function getTXImageView2Url ({ url, mode = 1, width, height, q = 70, format = 'webp' }) {
  let newUrl = url + ''
  if (!newUrl.startsWith(TXCDNprefix)) {
    return newUrl
  }
  try {
    const { pathname } = new URL(newUrl)
    let imgFormat = ''
    if (isSupportWebp) {
      imgFormat = `format/${format}/`
    }
    newUrl = `${TX_CLOUD_IMAGEVIEW2_ORIGIN}${pathname}?imageView2/${mode}/w/${width}/h/${height}/${imgFormat}q/${q}`
  } catch (e) {}
  return newUrl
}

/**
 * 获取缩略图
 * @param url {string}
 * @param width {number}
 * @param height {number}
 * @return {string}
 */
export function getZoomThumbnailUrl ({ url, width, height }) {
  return getTXImageView2Url({ url, width, height, q: 70 })
}

/**
 * 获取 webp 格式图片
 * @param url {string}
 * @return {string}
 */
export function getWebpUrl (url) {
  let newUrl = url + ''
  if (!newUrl.startsWith(TXCDNprefix)) {
    return newUrl
  }
  try {
    const { pathname } = new URL(url)
    if (isSupportWebp) {
      newUrl = `${TX_CLOUD_IMAGEVIEW2_ORIGIN}${pathname}?imageView2/format/webp`
    }
  } catch (e) {}
  return newUrl
}

/**
 * 获取腾讯云源图片地址
 * @param url {string}
 * @return {string}
 */
export function getOriginUrl (url) {
  let originUrl = url + ''
  if (!originUrl.startsWith(TX_CLOUD_IMAGEVIEW2_ORIGIN)) {
    return originUrl
  }
  try {
    const { pathname } = new URL(originUrl)
    originUrl = TXCDNprefix + pathname
  } catch (e) {}
  return originUrl
}

/**
 * 获取头像缩略图
 * @param url {string}
 * @return {string}
 */
export function getAvatarThumbnailUrl (url) {
  const size = 40
  return getTXImageView2Url({ url, width: size, height: size, q: 70 })
}
