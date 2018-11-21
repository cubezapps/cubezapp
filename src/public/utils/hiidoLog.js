
import {
  env
} from './utils'
import WebSDK from '@/public/api/websdk'
import store from '@/store/index'
const { hiidoEvent } = window

// 海度单独log的方法名
const defaultParams = ['Sid', 'Subsid', 'Uid', 'Sys', 'Uid', 'Acttype']

/**
 * 海度上报工具 [hiidoLog]
 * 所有需要的参数都可以在下方的[数据上报整理中查到]
 * @param {String} eventId  : 海度上报事件ID >>>> [logId]
 * @param {Object} params : 上报的数据 >>> [logParams] (注意大小写！！！！！)
 * 使用方式：this.$hiidoLog(eventId, params={Sid:xxxxx,Subsid:xxxxx})
 *
 * [注意！！！！！]：
 * 1. act_type需要写成Acttype
 * 2. 以下参数必须开头大写！
 * *****   'Sid', 'Subsid', 'Uid', 'Sys', 'Uid', 'Acttype'  ****
 * 3. Sys, Uid不需要上报，会自动检测
 */

const hiidoLog = async (eventId, params = {}) => {
  if (!eventId) {
    console.log('error：海度的logID不能为空')
    return ''
  }
  let hevent = new hiidoEvent('moschat', eventId) // eslint-disable-line
  hevent.setOverseaMode()
  const logParams = await formatParams(params)
  Object.keys(logParams).forEach((item) => {
    hevent[`set${item}`](logParams[item])
  })
  if (window.location.href.indexOf('logHiido=1') > -1) {
    console.log('>>>>>>>>>>>海度上报数据>>>>>>>>>>>>>')
    console.log('事件id：' + eventId)
    console.log(logParams)
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  }
  Object.keys(params).length && hevent.reportJudge()
}

const hiidoPlugin = {
  install (Vue) {
    Vue.prototype.$hiidoLog = hiidoLog
  }
}

export {
  hiidoPlugin, hiidoLog
}

async function formatParams (params = {}) {
  const Sys = getSys()
  const Uid = params.uid || params.Uid || store.state.user.userInfo.uid
  const output = {}
  const moreinfo = {}
  const device = await getDevice()
  Object.keys(params).forEach(item => {
    let value = params[item]
    if (item === 'act_type') {
      item = 'Acttype'
    }
    if (item === 'sid' || item === 'uid' || item === 'subsid') {
      item = item.substring(0, 1).toUpperCase() + item.substring(1)
    }
    if (defaultParams.indexOf(item) > -1) {
      output[item] = value
    } else {
      moreinfo[item] = params[item]
    }
  })
  Object.assign(output, {
    Uid,
    Sys
  })
  if (device) {
    moreinfo.code = device
  }
  if (Object.keys(moreinfo).length) {
    output.Moreinfo = JSON.stringify(moreinfo)
  }
  return output
}

function getSys () {
  const {
    platfromId
  } = env()
  const Sys = platfromId
  // Object.keys(os).forEach((key, index) => {
  //   if (os[key]) {
  //     Sys = index
  //   }
  // })

  return Sys
}

async function getDevice () {
  let device = await WebSDK('user.getDeviceId')
  return device
}
/**
  [上报内容整理]
  >>>>>>>>>>>>> 语音/文字房间发送信息 >>>>>>>>>>>>>>>>>
  上报时机：用户在语音/文字房间发送信息时触发一次上报
  {
    logId: 20025787,
    doc: 'https://data.hiido.com/index.php?r=sdkdemand/eventview&id=20025787',
    logParams: { // 单次上报需要上传的数据
      Sid: '', // 当前用户所在频道ID
      Subsid: '', // 当前用户所在房间ID，无房间Id则传频道ID
      subsid_type: '', // 语音房间 1=语音房间；2=文字房间；0=无
      emo_num: 0, // 该次发送信息中的表情数
      gif_num: 0, // 该次发送信息中的gif数
      pic_num: 0, // 该次发送信息中的图片数
      vid_num: 0 // 该次发送信息中的视频数
    }
  }
  >>>>>>>>>>>> 语音房间核心功能状态 >>>>>>>>>>>>>>>>>>>
  上报时机：用户登陆时上报一次状态，用户每修改一次上报一次修改后的状态/数值
  {
    logId: 20025791,
    doc: 'https://data.hiido.com/index.php?r=sdkdemand/eventview&id=20025791',
    logParams: {
      Acttype: '', // 动作选项：101=调整语音音量；102=点击麦克风增强；103=点击麦克风降噪；104=点击回声消除
      status: '' // 当Acttype=101时，上报语音音量的数值；当Acttype=102/103/104时，上报：1=开启；2=关闭
    }
  }
  >>>>>>>>>>>>>>>>>> 语音房间核心功能点击 >>>>>>>>>>>>>>>>>>>>>
  上报时机：点击按钮时触发一次上报
  {
    logId: '20025789',
    doc: 'https://data.hiido.com/index.php?r=sdkdemand/eventview&id=20025789',
    logParams: {
      Acttype: '' // 动作选项：101=点击语音条关闭按钮；102=点击语音条频道名称按钮；103=点击试麦
    }
  }
  >>>>>>>>>>>>>> 语音房间音频流 >>>>>>>>>>>>>>>>>>>
  上报时机：声音传输结束时触发一次上报
  {
    logId: 20025793,
    doc: 'https://data.hiido.com/index.php?r=sdkdemand/eventview&id=20025793',
    logParams: {
      Sid: '', // 当前用户所在频道ID
      Subsid: '', // 当前用户所在房间ID，无房间Id则传频道ID
      voice_btime: '', // 音频开始时间
      voice_etime: ''// 音频结束时间
    }
  }
  >>>>>>>>>>>>>>> PC-注册流程点击 >>>>>>>>>>>>>>>>>
  // 上报时机：
  {
    logId: 20025795,
    doc: 'https://data.hiido.com/index.php?r=sdkdemand/eventview&id=20025795',
    logParams: {
      Acttype: '' // 101=安装后启动，102=启动后登录，103=启动后注册，104=输入手机号，105=获取验证码，106=输入验证码，107=点击注册按钮，108=成功注册，109=直接进入软件，110=设置头像，111=设置昵称，112=设置头像并设置昵称
    }
  }
  >>>>>>>>>>>>>>>>  WEB-注册流程点击  >>>>>>>>>>>>>>
  // 上报时机：
  {
    logId: 20025797,
    doc: 'https://data.hiido.com/index.php?r=sdkdemand/eventview&id=20025797',
    logParams: {
      Acttype: '' // 101=登录注册页面访问，102=访问后登录，103=访问后注册，104=输入手机号，105=获取验证码，106=输入验证码，107=点击注册按钮，108=成功注册，109=直接进入软件，110=设置头像，111=设置昵称，112=设置头像并设置昵称
    }
  }
*/
