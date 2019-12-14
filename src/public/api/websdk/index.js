import WebSDk from '@efox/websdk'

const local = {}
if (window.Native) {
  local.sdk = require('./cef').default
  local.env = 'Native'
} else {
  local.sdk = require('./web').default
  local.env = 'web'
}
const sdk = new WebSDk(local.sdk, local.env)

const method = sdk.get
method.isCef = local.env === 'cef'

export {
  method as default,
  sdk
}
export const WebSDKPlugin = {
  install (Vue) {
    Vue.prototype.$WebSDK = method
  }
}
