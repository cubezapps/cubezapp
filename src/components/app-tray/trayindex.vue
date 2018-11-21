<template>
  <div class="app-tray" @contextmenu="onContextMenuHandler()" ref="main">
    <div class="app-tray-head">
      <div class="app-tray-head-title">{{$t('tray.newMsg')}}</div>
      <div class="app-tray-head-count" v-if="totalCount > 0">({{totalCount}}@)</div>
    </div>

     <div>
      <tray-item
        @click.native="clickTrayItem(value)"
        v-for="(value, index) of channelList"
        :key="index"
        :channeldata="value"
      ></tray-item>
    </div>

    <div class="app-tray-ignore" @click="onClickIgnoreHandler()">{{$t('tray.ignoreAllMsg')}}</div>
  </div>
</template>

<script>
import TrayItem from './item/tray-item'
import Logger from '@/public/base/Logger'
import i18n from '@/i18n'
import { DataUri } from '@/public/service/SharedLib'

/** channeldata 结构：
    channelname: "2220805944yy的组队频道"
    maincid: 1404715996
    owner: 2220527842
    photourl: "img/commonannel-default.jpg"
    shortcid: 613274
    textcid: 118449836
    voicecid: 1404915984
   */
export default {
  components: {
    TrayItem
  },
  data () {
    return {
      totalCount: 0,
      channelList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$WebSDK('win.setResizeBorderWidth', 0)
      this.$WebSDK('win.needFrameless')
      this.$WebSDK('win.needTaskBar', false)
      document.body.oncontextmenu = (e) => {
        return false
      }

      document.addEventListener('mouseleave', (e) => {
        let main = this.$refs.main
        if (main) Logger.log('mouseleave ??????? e.clientX:' + e.clientX + ', e.clientY:' + e.clientY + ', main.offsetWidth=' + main.offsetWidth + ', main.offsetHeight=' + main.offsetHeight)
        if (this._inPanel === true && (e.clientX <= 1 || e.clientX >= main.offsetWidth - 1 || e.clientY <= 1 || e.clientY >= main.offsetHeight - 1)) {
          this.hide()
        }
      }, false)

      document.onmousemove = (e) => {
        this.onMouseOutHandler(e)
      }
      document.onblur = (e) => {
        Logger.log('失去焦点')
      }

      var self = this
      this.$WebSDK('common.trayIconHoverEnterListener', () => {
        Logger.log('MessagePopPanel on enter tray icon, 马上显示菜单！！')
        // self.stopDelayHideTimer()
        self._inPanel = false
        self._hoverIcon = true
        self.clearDelay()
        self.popMsgPanel()
        this.$WebSDK('win.needAlwaysFront')
      }, this)
      this.$WebSDK('common.trayIconHoverLeaveListener', () => {
        Logger.log('MessagePopPanel on leave tray icon')
        self.startDelayHideTimer()
        self._hoverIcon = false
      }, this)
      this.$WebSDK('common.trayIconLeftClickListener', () => {
        self.selectTopMsgItem()
      }, this)

      Logger.log('注册【ipc.addWindowEventListener】，等待' + DataUri.MsgList)
      this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
        // Logger.log('uri=' + uri + ' data=' + data + ' , DataUri.LANGUAGE_CHANGEL=' + DataUri.LANGUAGE_CHANGEL)

        if (uri === DataUri.MsgList) {
          let list = JSON.parse(data)
          Logger.log(DataUri.MsgList + '来了！,data = ' + data)
          self.update(list)
        } else if (uri === DataUri.LANGUAGE_CHANGE) {
          Logger.log('多语言改变：' + data)
          i18n.locale = data
          self.setWinSize()
          setTimeout(() => {
            self.setWinSize()
          }, 500)
        }

        // switch (uri) {
        //   case DataUri.MsgList:
        //     let list = JSON.parse(data)
        //     Logger.log(DataUri.MsgList + '来了！,data = ' + data)
        //     self.update(list)
        //     break
        //   case DataUri.LANGUAGE_CHANGEL:
        //     Logger.log('多语言改变：' + data)
        //     i18n.locale = data
        //     self.setWinSize()
        //     setTimeout(() => {
        //       self.setWinSize()
        //     }, 500)
        //     break
        // }
      }, this)
      this.hide()
    },
    startDelayHideTimer () {
      this._delayIndex = setTimeout(() => {
        this.hide()
      }, 100)
    },
    clearDelay () {
      if (this._delayIndex !== undefined && this._delayIndex > 0) {
        clearTimeout(this._delayIndex)
      }
    },
    update (data) {
      this.channelList = data
      if (this.channelList.length === 0) {
        this.hide()
        return
      }
      // Logger.log('update :: this.channelList.length==' + this.channelList.length + '')
      let total = 0
      if (this.channelList.length > 8) this.channelList.length = 8
      for (const channel of this.channelList) {
        if (channel.at > 0) { // 因为只有at显示数字，非at的未读不显示数字，所以总数也只加at的
          total += channel.at
        // } else {
        //   total += channel.unread
        }
      }
      this.totalCount = total

      this.setWinSize()
    },
    selectTopMsgItem () {
      Logger.log('msg pop window select top item')
      if (this.channelList.length > 0) {
        // $(li[0]).remove();
        var textcid = this.channelList[0].groupId
        Logger.log('choose textcid ' + textcid)
        this.$WebSDK('ipc.dispatchWindowEvent', DataUri.MsgPopWindowChooseGroup, '' + textcid)
      } else {
        Logger.log('tell show main window ' + textcid)
        this.$WebSDK('ipc.dispatchWindowEvent', DataUri.ShowMainWindow, '')
      }
    },
    setWinSize () {
      let size = this.getPannelSize()
      Logger.log('PopMsgList set  size to ' + size.width + 'x' + size.height, 'POPMSG')
      this.$WebSDK('win.resize', size.width, size.height)
      this.updateWinPos()
    },
    getPannelSize () {
      let main = this.$refs.main
      var w = main.offsetWidth
      var h = main.offsetHeight
      return { width: w, height: h }
    },
    updateWinPos () {
      // get tray icon pos
      // if (this._icon === null || this._icon === undefined) return
      // this._icon.getPopupPos().then((ret) => {
      //   this.setPosition(ret)
      // })
      this.$WebSDK('common.trayIconGetPopupPos').then((ret) => {
        this.setPosition(ret)
      })
      // var CenterPos =
    },
    setPosition (ret) {
      var iconPos = ret.CenterPoint.map(function MessagePopPanelMapCenterPos (x) { return x })
      var border = ret.Border[0]

      let size = this.getPannelSize()
      var panelWidth = size.width
      var panelHeight = size.height

      var x = 0
      var y = 0

      // calc menu window pos
      if (border === 0) { // tray icon on bottom
        x = iconPos[0] - panelWidth / 2
        y = iconPos[1] - panelHeight
      } else if (border === 1) { // tray icon on left side
        x = iconPos[0]
        y = iconPos[1] - panelHeight
      } else if (border === 2) { // tray icon on top
        x = iconPos[0] - panelWidth / 2
        y = iconPos[1]
      } else if (border === 3) { // tray icon on right side
        x = iconPos[0] - panelWidth
        y = iconPos[1] - panelHeight
      } else {
        Logger.log('unknown tray icon border: ' + border)
      }

      x = Math.floor(x)
      y = Math.floor(y)
      this.$WebSDK('win.move', x, y)
    },
    popMsgPanel () {
      if (this.channelList.length === 0) {
        // Logger.log('this.channelList.length==0 隐藏菜单 ')
        this.hide()
      } else {
        // Logger.log('this.channelList.length==' + this.channelList.length + ' 显示菜单 ')
        this.updateWinPos()
        this.show()
        this.$WebSDK('win.forefront')
      }
    },
    show () {
      // Logger.log('MessagePopPanel show')
      this.$WebSDK('win.show')
      this.$WebSDK('win.forefront')
      this.setWinSize()
    },
    hide () {
      this.$WebSDK('win.hide')
      this._inPanel = false
      this.clearDelay()
    },
    clickTrayItem (value) {
      this.hide()
      this.$WebSDK('ipc.dispatchWindowEvent', DataUri.CLICK_TRAY_CHANNEL, JSON.stringify(value))
    },
    onClickIgnoreHandler () {
      this.$WebSDK('win.hide')
      this.$WebSDK('ipc.dispatchWindowEvent', DataUri.IgnoreAllMsgs, '')
    },
    createTestData (name, id, groupId, photourl) {
      let obj = {}
      obj.channelname = name
      obj.maincid = id
      obj.groupId = groupId
      obj.photourl = photourl
      obj.unread = Math.floor(Math.random() * 10)
      return obj
    },
    onMouseOutHandler (e) {
      if (this._hoverIcon) return
      let main = this.$refs.main
      // Logger.log('鼠标移出了e.clientX:' + e.clientX + ', e.clientY:' + e.clientY + ', main.offsetWidth=' + main.offsetWidth + ', main.offsetHeight=' + main.offsetHeight)
      if (this._inPanel === true && (e.clientX <= 1 || e.clientX >= main.offsetWidth - 1 || e.clientY <= 1 || e.clientY >= main.offsetHeight - 1)) {
        this.hide()
      } else if (e.clientX > 1 && e.clientY > 1 && e.clientY < main.offsetHeight - 1 && e.clientX < main.offsetWidth - 1) {
        this._inPanel = true
        this.clearDelay()
      }
    },
    onContextMenuHandler () {
      return false
    }
  }
}
</script>

<style lang='scss' scoped>
.app-tray{
  float: left;
  width: 239px;
  margin: 0;
  background: #2d3849;
  box-shadow: 0 2px 8px rgba(5, 12, 20, 0.2);
  border-radius: 4px;
  &-head
  {
    display: flex;
    margin-top: 17px;
    margin-left: 16px;
    margin-bottom: 10px;
    user-select: none;
  }
  &-head-title{
    text-align: left;
    color: #e2e3e4;
    font-size: 16px;
  }
  &-head-count{
    height: 18px;
    font-size: 14px;
    color: #818f9c;
    margin-left: 8px;
  }
  &-items
  {
    overflow: hidden;
    overflow-y: auto;
  }
  &-ignore{
    font-size: 16px;
    color: #ff5f49;
    float: right;
    margin-right: 21px;
    margin-bottom: 16px;
    margin-top: 10px;
    user-select: none;
    cursor: pointer;
  }
}
</style>
