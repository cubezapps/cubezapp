import md5 from 'md5'
import store from '@/store'
import { getCookie, hexmd5, randomNumSet } from '@/public/utils/BaseUtil'
import WebSDK from '@/public/api/websdk'

const actType = WebSDK.isCef ? 'pcentchndo' : 'webentchndo'
const sessidStore = []
/** 生成海度上报会话ID */
export function getSessid () {
  const timestamp = Date.parse(new Date())
  return hexmd5(`${timestamp}${getCookie('osudb_uid')}${randomNumSet(4)}`)
}

/** 海度上报key */
function getHiidoYYSystemKey (timestamp, actType) {
  return String(md5(`${actType}${timestamp}HiidoYYSystem`)).toLowerCase()
}

/** 获取海度UIID */
export function getHiidoUi () {
  return getCookie('hiido_ui')
}

let pcVersion = ''
async function getVersion () {
  pcVersion = await WebSDK('sdk.getSdkVersion') || pcVersion
}
getVersion()

/** 进房计时 */
let roomTimerInterval = null
let roomTimer = [
  {
    startTime: null,
    count: 0 // 进房时间
  },
  {
    startTime: null,
    count: 0 // 进房时间
  },
  {
    startTime: null,
    count: 0 // 进房时间
  }
]

/**  web端/H5频道心跳协议对应act协议 */
/**
  *上报规则
  *1、进房间的时候开始上报，会报用户频道ID、房间ID、moreinfo里面报房间类型；
  *2、之后每隔一段时间报一次；
  *3、退出房间/切换房间/退出频道之类的行为时，再上报一次；
  进频道后，前3分钟，每隔10s上报一次心跳，3分钟后，为每隔60s上报一次心跳
  *4、
  *从文字切换到文字，则视为开始一次新的上报；
  *从语音切换到语音，则视为开始一次新的上报；
  *从文字切换到语音，则视为开始一次新的上报；
  *同一频道内的语音切换到文字，那么语音房间内继续上报，文字也开始一次新的上报

 * 海度上报工具 [webentchndo]
 * 所有需要的参数都可以在下方的[数据上报整理中查到]
 * @param {Number} type  : 行为类型 心跳1；进频道2；出频道3
 * @param {Number} time : 客户端时间(Unix时间戳)
 * @param {Number} uid : 用户UID
 * @param {Number} dr : 频道停留时长
 * @param {Number} sid : 频道ID
 * @param {Number} subsid : 房间ID 后来改成 频道ID
 * @param {Number} sessid : 会话ID
 * @param {Number} ui : 用户标识 cookie: hiido_ui
 * @param {Number} info.subsid_type : 房间类型(1=语音房间，2=文字房间)
 * @param {Number} info.roomid : 房间ID
 * @param {Number} info.sessionid : 优先报语音房间ID 如果没则报文字房间ID
 * @param {String} rel :webmoschat
 * @param {String} tempid : pcmoschat
 * 使用方式：this.$webentchndo(params={Sid:xxxxx,Subsid:xxxxx})
 * 查看上报结果：https://cloud.hiido.com/metadata/hive/table/default.yy_webentchndo_original
 * https://cloud.hiido.com/metadata/hive/table/default.yy_pcentchndo_original
 *
 **/

const ptl = 'https://'
const reporturl = 'hlog.hiido.com/c.gif'
const sendReport = (reportSrc) => {
  const reportImg = new Image()
  reportImg.src = reportSrc
}

/**
 * 进房间上报
 * @param {*} reportRoom
 */
export function reportEnterRoom (reportRoom) {
  sessidStore[Number(reportRoom.type)] = getSessid()
  roomTimer[Number(reportRoom.type)].count = 0
  roomTimer[Number(reportRoom.type)].startTime = new Date()
  const reportTimeStamp = parseInt(new Date() / 1000)
  webentchndo({
    act: actType,
    type: 2, // 进房间 type2
    time: reportTimeStamp,
    uid: store.getters['user/getMyUid'],
    dr: 0, // 进房间 dr0
    sid: reportRoom.channelId,
    subsid: reportRoom.channelId,
    sessid: sessidStore[Number(reportRoom.type)],
    ui: getHiidoUi(),
    info: {
      subsid_type: reportRoom.type,
      roomid: reportRoom.roomId,
      sessionid: sessidStore[1] || sessidStore[Number(reportRoom.type)]
    },
    rel: 'webmoschat',
    tempid: 'pcmoschat',
    key: getHiidoYYSystemKey(reportTimeStamp, actType)
  })
  beginHeartbeat()
}

/**
 * 退房间上报
 * @param {*} reportRoom
 */
export function reportQuitRoom (reportRoom) {
  const reportTimeStamp = parseInt(new Date() / 1000)
  webentchndo({
    act: actType,
    type: 3, // 进房间 type3
    time: reportTimeStamp,
    uid: store.getters['user/getMyUid'],
    dr: roomTimer[Number(reportRoom.type)].count,
    sid: reportRoom.channelId,
    subsid: reportRoom.channelId,
    sessid: sessidStore[Number(reportRoom.type)],
    ui: getHiidoUi(),
    info: {
      subsid_type: reportRoom.type,
      roomid: reportRoom.roomId,
      sessionid: sessidStore[1] || sessidStore[Number(reportRoom.type)]
    },
    rel: 'webmoschat',
    tempid: 'pcmoschat',
    key: getHiidoYYSystemKey(reportTimeStamp, actType)
  })
}

/**
 * 开始心跳上报
 */
const beginHeartbeat = () => {
  console.log('开始心跳上报')
  clearInterval(roomTimerInterval)
  roomTimerInterval = setInterval(() => {
    reportHeartbeat()
  }, 1000)
}

/**
 * 判断是否符合上报时间点
 */
const isMatchTiming = (second) => {
  if (second <= 60 * 3) {
    if (second % 10 === 0) {
      return true
    }
  } else {
    if (second % 60 === 0) {
      return true
    }
  }
  return false
}

/**
 * 心跳上报
 */
const reportHeartbeat = () => {
  const reportTimeStamp = parseInt(new Date() / 1000)
  let reportRoom = store.getters['channel/selectedRoomInfo']
  let inTextRoom = false
  let inVoiceRoom = false
  if (String(store.getters['channel/selectedRoomInfoText'].roomId).length > 1) { // 文字房间上报
    inTextRoom = store.getters['channel/selectedRoomInfoText']
  }
  if (String(store.getters['channel/selectedRoomInfoVoice'].roomId).length > 1) { // 语音房间上报
    inVoiceRoom = store.getters['channel/selectedRoomInfoVoice']
  }
  roomTimer[Number(reportRoom.type)].count = parseInt((new Date() - roomTimer[Number(reportRoom.type)].startTime) / 1000)
  // console.log('reportHeartbeat', roomTimer, reportRoom, inTextRoom.roomId, inVoiceRoom.roomId, sessidStore)
  if (isMatchTiming(roomTimer[Number(reportRoom.type)].count)) {
    webentchndo({
      act: actType,
      type: 1, // 心跳 type1
      time: reportTimeStamp,
      uid: store.getters['user/getMyUid'],
      dr: roomTimer[Number(reportRoom.type)].count, // 进房间 dr0
      sid: reportRoom.channelId,
      subsid: reportRoom.channelId,
      sessid: sessidStore[Number(reportRoom.type)],
      ui: getHiidoUi(),
      info: {
        subsid_type: reportRoom.type,
        roomid: reportRoom.roomId,
        sessionid: sessidStore[1] || sessidStore[Number(reportRoom.type)] // 优先报语音房间
      },
      rel: 'webmoschat',
      tempid: 'pcmoschat',
      key: getHiidoYYSystemKey(reportTimeStamp, actType)
    })
  }
  if (inTextRoom && inVoiceRoom && String(reportRoom.roomId) === String(inTextRoom.roomId)) {
    /** 同时在文字房间和语音房间 并且当前选择了文字房间 上报语音房间 */
    roomTimer[Number(inVoiceRoom.type)].count = parseInt((new Date() - roomTimer[Number(inVoiceRoom.type)].startTime) / 1000)
    if (isMatchTiming(roomTimer[Number(inVoiceRoom.type)].count)) {
      webentchndo({
        act: actType,
        type: 1, // 心跳 type1
        time: reportTimeStamp,
        uid: store.getters['user/getMyUid'],
        dr: roomTimer[Number(inVoiceRoom.type)].count, // 进房间 dr0
        sid: inVoiceRoom.channelId,
        subsid: inVoiceRoom.channelId,
        sessid: sessidStore[Number(inVoiceRoom.type)],
        ui: getHiidoUi(),
        info: {
          subsid_type: inVoiceRoom.type,
          roomid: inVoiceRoom.roomId,
          sessionid: sessidStore[1] || sessidStore[Number(reportRoom.type)]
        },
        rel: 'webmoschat',
        tempid: 'pcmoschat',
        key: getHiidoYYSystemKey(reportTimeStamp, actType)
      })
    }
  }
}

export function getDr (lasttime) {
  return (new Date() - lasttime) / 1000
}

export function webentchndo (params = {}) {
  let reportSrc = ''
  let queryParams = ''
  let dot = ''
  params.source = 'moschat_offical'
  params.wyy = getCookie('hiido_ui')
  params.ref = encodeURIComponent(window.location.href)
  params.ky = ''
  params.cpuid = ''
  params.cliver = pcVersion
  for (let index in params) {
    queryParams += dot
    dot = '&'
    if (typeof (params[index]) === 'object') {
      queryParams += `${index}=${window.btoa(JSON.stringify(params[index]))}`
    } else {
      queryParams += `${index}=${params[index]}`
    }
  }
  reportSrc = `${ptl}${reporturl}?${queryParams}`
  // console.log('房间心跳上报webentchndo', params, store.getters)
  sendReport(reportSrc)
}
