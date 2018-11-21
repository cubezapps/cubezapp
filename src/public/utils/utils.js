
import { message as msg } from '@/component/common/message'
import { toast } from '@/component/common/toast'
import i18n from '@/i18n'
import WebSDK from '@/public/api/websdk'

function env () {
  const ua = window.navigator.userAgent
  const os = {
    ios: false, // 0
    mob: false, // 1
    android: false, // 2
    pc: false, // 3
    web: false // 4
  }
  let platfromId = 4
  if (WebSDK.isCef) {
    os.pc = true
    platfromId = 3
  } else {
    if (/android/i.test(ua)) {
      os.android = true
      platfromId = 2
    }
    if (/(iphone)|(ios)/i.test(ua)) {
      os.ios = true
      platfromId = 0
    }
    os.web = !os.android && !os.ios
    if (os.web) {
      platfromId = 4
    }
  }
  return {
    os,
    platfromId
  }
}

/** errcode 白名单 */
const ignoreToast = [4001, 4002, 4003, 4004, 4005, 1013, 1014, 1015, 1016, 11006, 11012, 11008]
/** ServiceFunctionName 白名单 */
const ignoreServiceFunctionName = ['dhOnline_ping', 'dhInvite_room4LinkB']
/**
 * 通用错误提示处理
 * @param {*} err
 */
const showErrMsg = (err) => {
  if (err.code) {
    if (!ignoreToast.includes(err.code)) {
      toast(i18n.t(`errorCode.${err.code}`))
    }
  } else if (typeof (err) === 'string') {
    msg(err)
  } else if (err.msg) {
    msg(err.msg)
  } else if (err.result) {
    if (err.result.sdkResCode === -3) {
      toast(`${i18n.t('errorCode.timeout')} sdkRC -3 ${err.result.requestId}`)
    } else if (err.result.resCode === 408) {
      if (!ignoreServiceFunctionName.includes(`${err.result.serviceName}_${err.result.functionName}`)) {
        toast(`${i18n.t('errorCode.timeout')} 408 ${err.result.sdkResCode}`)
      }
    } else {
      if (!(Number(err.result.resCode) === 200 && Number(err.result.sdkResCode) === 1)) {
        msg(`${err.result.serviceName}_${err.result.functionName}_${err.result.resCode}_${err.result.sdkResCode}`)
      }
    }
  }
}

export {
  env,
  showErrMsg
}
