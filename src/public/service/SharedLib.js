
import WebSDK from '@/public/api/websdk'
class SharedUserInfo {
  // 用户是否历史上第一次登陆。这个字段由登陆模块查询服务器并赋值
  static set isUserFirstTimeLogin (value) {
    SLogger.log('SharedUserInfo set isUserFirstTimeLogin=' + value)
  }

  static get isUserFirstTimeLogin () {
    return this._isUserFirstTimeLogin
  }

  static _isUserFirstTimeLogin = false;
}
/**
 * Created by Administrator on 2017/9/16.
 */
class DataUri {
    static MsgList = 'DataUri_MsgList';
    static CloseWindow = 'DataUri_CloseWindow';
    static ShowMainWindow = 'DataUri_ShowMainWindow';
    static ShowLoginWindow = 'DataUri_ShowLoginWindow';
    static MsgPopWindowChooseGroup = 'DataUri_MsgPopWindowChooseChannel';
    static ShowAboutPanel = 'DataUri_ShowAboutPanel';
    static IgnoreAllMsgs = 'DataUri_IgnoreAllMsgs';
    static IgnoreChannelMsg = 'DataUri_IgnoreChannelMsg';
    static CLICK_TRAY_CHANNEL = 'DataUri_CLICK_TRAY_CHANNEL';
    static NotifyChannelInfo = 'DataUri_NotifyChannelInfo';
    static NotifyMyUserInfo = 'DataUri_NotifyUserInfo';
    static RestartApp = 'DataUri_RestartApp';
    static QuerySdkUpdate = 'DataUri_QuerySdkUpdate';
    static ResponseSdkUpdate = 'DataUri_ResponseSdkUpdate';
    static HideLoadingWindow = 'DataUri_HideLoadingWindow';
    static PIC_VIEWER_REQ = 'DataUri_PicViewer_Request';
    static PIC_VIEWER_RESP = 'DataUri_PicViewer_Response';
    static PIC_VIEWER_CLOSE = 'DataUri_PicViewer_close';
    static UPDATE_TRAY_TIPS = 'DataUri_UPDATE_TRAY_TIPS';
    static LANGUAGE_CHANGE = 'DataUri_LANGUAGE_CHANGE';
    static ThirdLoginSuccess = 'DataUri_Third_Login_Success';
    static PLUGINPANEL_CLOSE = 'DataUri_PLUGINPANEL_CLOSE';
    static GOTO_CHANNEL = 'DataUri_GOTO_CHANNEL';
    static CHAT_MSG = 'DataUri_CHATMSG';
    static CheckChannelExistReq = 'DataUri_CheckChannelExistReq';
    static CheckChannelExistRes = 'DataUri_CheckChannelExistRes';
    static ShowWalletWindow = 'DataUri_ShowWalletWindow';
    static GetChannelList = 'DataUri_GetChannelList';
    static SetChannelList = 'DataUri_SetChannelList';
    static ShowTopParentPlugin = 'DataUri_ShowTopParentPlugin';
    static TransferPluginData = 'DataUri_TransferPluginData';
    static CaptureScreenshotsChange = 'DataUri_CaptureScreenshotsChange';
    static CaptureVideosChange = 'DataUri_CaptureVideosChange';
    static CAPTURE_NOTICE_SEND_DONE = 'DataUri_CaptureNoticeSendDone';
    static CAPTURE_RESOURCE_TAB_CHANGE = 'DataUri_CaptureResourceTabChange';
    static ENTER_ROOM_SEND_RESOURCE = 'DataUri_EnterRoomSendResource';
    static CAPTURE_RESOURCE_PREVIEW_IMAGE = 'DataUri_CaptureResourcePreviewImage';
    static CAPTURE_TOOLS_SHOW_PANEL = 'DataUri_CaptureToolsShowPanel';
    static TriggerParentWindowListener = 'DataUri_TriggerParentWindowListener';
    static GetParentWindowData = 'DataUri_GetParentWindowData';
    static WindowToFront = 'DataUri_WindowToFront';
}

class SLogger {
  static log (str) {
    if (str === undefined) return

    var date = new Date()
    var time = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds()
    // SLogger.log("[" + time + "]" + value);
    console.log('[' + time + ']' + str)
    WebSDK('common.print', 'SharedLib', str)
  }
}

class WindowManager { // TODO 这里需要开回来
    static _windows = [];

    static _isWeb = !WebSDK.isCef

    static get isWeb () {
      return this._isWeb
    }

    static open (url, way, param, _windows) {
      if (this.isWeb) return
      var win = this._windows[url]
      console.log(win)
      if (win !== undefined) {
        win.close()
      }
      console.log('open', url, way, param)
      SLogger.log('WindowManager open ' + url)

      WebSDK('sdk.openWindow', url, way, param)
    }

    static closeAllWindows () {
      WebSDK('common.print', 'javascript', 'WindowManager on quit app')
      WebSDK('ipc.dispatchWindowEvent', 'DataUri_CloseWindow', '')
    }

    static async resize (w, h) {
      let log = ''
      if (this.isWeb) {
        log += '不是PC版本，不需要处理'
        SLogger.log(log)
        return { width: w, height: h }
      }
      try {
        const info = await WebSDK('sdk.getSdkInfo')
        log += '使用PC端接口YY sdk.getSdkInfo，获得数据：(' + info.screenW + ', ' + info.screenH + ')。'
        if (info.screenW && info.screenH) {
          w = Math.min(w, info.screenW)
          h = Math.min(h, info.screenH)
        } else {
          log += '使用PC端接口YY sdk.getSdkInfo没有值，使用window.screen：(' + window.screen.width + ', ' + window.screen.height + ')。'
          w = Math.min(w, window.screen.width)
          h = Math.min(h, window.screen.height)
        }
      } catch (err) {
        log += '使用PC端接口YY sdk.getSdkInfo出错[【' + err + '】，使用window.screen：(' + window.screen.width + ', ' + window.screen.height + ')。'
        w = Math.min(w, window.screen.width)
        h = Math.min(h, window.screen.height)
      }
      log += '调用Win.resize设置大小：(' + w + ', ' + h + ')。'
      WebSDK('win.resize', w, h)
      SLogger.log(log)
      return { width: w, height: h }
    }

    static closeWindowOnQuit (win, callback) {
      WebSDK('common.print', 'javascript', 'WindowManager connect ipc.addWindowEventListener')
      WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
        if (uri === DataUri.CloseWindow) {
          WebSDK('common.print', 'javascript', 'WindowManager recv quit app uri')
          if (callback !== undefined) callback()
          WebSDK('win.close')
        }
      }, this)
    }

    static createPromise () {
      var promise = new Promise((resolve, reject) => {
      })
      return promise
    }
}

WindowManager.closeWindowOnQuit(window)

export {
  SharedUserInfo,
  DataUri,
  SLogger,
  WindowManager
}
