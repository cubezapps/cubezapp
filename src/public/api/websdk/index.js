import WebSDK, { WebSDKBOM } from '@efox/websdk'

const local = {
  dev: true
}
if (window.YY) {
  local.sdk = require('./cef').default
  local.env = 'YY'
  WebSDK.isCef = true
} else {
  local.sdk = require('./web').default
  local.env = 'web'
  WebSDK.isWeb = true
}
WebSDKBOM.config({
  ...local
})

export const WebSDKPlugin = {
  install (Vue) {
    Vue.prototype.$WebSDK = WebSDK
  }
}

// example:
// vue.$WebSDK('test.env', 'name', {obj: 1})
export {
  WebSDK as default,
  WebSDKBOM
}
