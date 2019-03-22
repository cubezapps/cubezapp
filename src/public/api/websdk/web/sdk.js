export default {
  // hideLoading () {
  //   console.log('Web not Native sdk.loadingWindow.hide method.')
  //   return Promise.reject(new Error('not method'))
  // },
  // showLoading () {
  //   console.log('Web not Native sdk.loadingWindow.show method.')
  //   return Promise.reject(new Error('not method'))
  // },
  // getSdkVersion () {
  //   console.log('Web not Native sdk.getSdkVersion method.')
  //   return Promise.reject(new Error('not method'))
  // },
  // getCurLang () {
  //   console.log('Web not Native sdk.getCurLang method.')
  //   return Promise.reject(new Error('not method'))
  // },
  // webReady () {
  //   console.log('Web not Native sdk.webReady method.')
  //   return Promise.reject(new Error('not method'))
  // },
  // getSdkInfo () {
  //   console.log('Web not Native sdk.getSdkInfo method.')
  //   return Promise.reject(new Error('not method'))
  // },
  // cancelUpdateTimer () {
  //   console.log('Web not Native sdk.cancelUpdateTimer method.')
  //   return Promise.reject(new Error('not method'))
  // },
  // doUpdate () {
  //   console.log('Web not Native sdk.doUpdate method.')
  //   return Promise.reject(new Error('not method'))
  // },
  openWindow (url) {
    window.open(url)
  }
}
