/**
 * 请求图片
 * @param src {String}
 * @return {Promise<*>}
 */
export default async function (src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = (event) => resolve(event)
    img.onerror = (event) => reject(event)
    img.src = src
  })
}
