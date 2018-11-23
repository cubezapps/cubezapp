import WebSDK from '@/public/api/websdk'
export default {
  /**
   * 本地存储数据
   * @param {*} key
   * @param {*} jsonObject
   */
  setItem (key, jsonObject) {
    return new Promise((resolve, reject) => {
      WebSDK('common.setConfig', key, JSON.stringify(jsonObject)).then(() => {
        resolve(jsonObject)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取本地存储数据
   * @param {*} key
   */
  getItem (key) {
    return new Promise((resolve, reject) => {
      WebSDK('common.getConfig', key).then(resp => {
        resolve(JSON.parse(resp))
      }).catch(err => {
        reject(err)
      })
    })
  }
}
