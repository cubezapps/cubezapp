<template>
  <div class="clipmenu">
    <ul ref="appmenu"  class="dropdown-menu">
        <li v-for="clipdata of cliplist" :key="clipdata.id" @click.stop="onPopupClick($event, clipdata)">{{showText(clipdata)}}</li>
    </ul>
  </div>
</template>

<script>
import i18n from '@/i18n'
export default {
  name: 'Clipmenu',
  metaInfo: {
        title: 'Clipmenu', // set a title
        meta: [{                 // set meta
          name: 'Clipmenu',
          content: 'Clipmenu'
         }],
        htmlAttrs: {
          lang: 'en'
        }
  },
  data() {
    return {
      x: 9999,
      y: 9999,
      cliplist: []
    }
  },
  mounted () {
    this.init()
  },
  watch: {

  },
  updated() {
      if(this.cliplist.length === 0) {
        this.$WebSDK('win.move', 9999, 9999)
      }
      else {
        let tmp = this.$refs.appmenu
        this.$WebSDK('win.resize', tmp.offsetWidth, tmp.offsetHeight)
        console.log('clipmenu resize: ' + tmp.offsetWidth + ' ' + tmp.offsetHeight)
      }
  },
  computed: {
      showText() {
        return function(clipdata) {
            let text = ""
            if(clipdata.type === 1) {
              //text
              text = this.$t("【Paste Text】")
              text += clipdata.text
            }
            else if(clipdata.type === 2) {
              //HBITMAP
              text = this.$t("【Paste Image】")
              text += "Bitmap"
            }
            else if(clipdata.type === 15) {
              //copy files
              text = this.$t("【Paste Files】")
              for(let i = 0; i < clipdata.files.length; i++) {
                let n = clipdata.files[i].lastIndexOf("\\")
                text += clipdata.files[i].substr(n + 1) + " "
              }
            }
            if(text.length > 32) {
                text = text.substr(0, 32)
                text += ".."
            }
            return text
        }
      }
  },
  methods: {
    async init () {
      document.body.style = 'overflow: hidden'
      await this.$WebSDK('common.startMonitor')
      this.cliplist = await this.$WebSDK('common.getClipList')
      console.log(this.cliplist)
      window.connectSignal(window.Native.Common.ClipBoard.onClipBoardChanged, (list) => {
           this.cliplist = list
      });
      this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
       switch (uri) {
          case this.$DataUri.App_CloseAllWindow: {
            window.close()
            break
          }
          case this.$DataUri.APP_LanguageChange:
            i18n.setLocale(data)
            break
        }
      }, this)
      this.$WebSDK('common.registerNHotkey', 'clipboard', 162, false)
      this.$WebSDK('common.registerNHotkey', 'clipboard', 192, false)
      this.$WebSDK('common.onKeyPressed', (name) => {
        if(name == 'clipboard') {
          this.$WebSDK('common.getForegroundWindow').then(winId => {
            this.winId = winId
            console.log('winid:' + this.winId)
            this.$WebSDK('common.getCursorPos').then(pos => {
              this.clearDelay()
              this._mouseenter = true
              this.x = pos.x
              this.y = pos.y
              if(this.cliplist.length == 0) {
                this.$WebSDK('win.move', 9999, 9999)
              }
              else {
                this.$WebSDK('win.move', this.x, this.y)
              }
              this.$WebSDK('win.show')
              this.$WebSDK('win.bringToFront')
              //this.$forceUpdate()
            })
          })  
        }
      })
      this.$WebSDK('win.regEvent', 'MouseEnter', () => {
        this.clearDelay()
        this._mouseenter = true
      }, this)
      this.$WebSDK('win.regEvent', 'MouseLeave', () => {
        this._mouseenter = false
        this.delayHide()
      }, this)
      this.$WebSDK('win.regEvent', 'ActiveWindow', (param) => {
        if(param === 0) {
          this._mouseenter = false
          this.delayHide()  
        }
        else {
          this.clearDelay()
          this._mouseenter = true
        }
      }, this)
      document.body.oncontextmenu = (e) => {
        return false
      }
      this.$WebSDK('win.setResizeBorderWidth', 0)
    },
    clearDelay () {
      if (this._timeId !== undefined && this._timeId > 0) {
        clearTimeout(this._timeId)
      }
    },
    delayHide() {
      this._timeId = setTimeout(() => {
          if(!this._mouseenter) {
            this.$WebSDK('win.hide')
          }
        }, 500)
    },
    onPopupClick (event, clipdata) {
      this.$WebSDK('win.hide')
      this.$WebSDK('common.setClipBoard', clipdata.id)
      console.log(this.x)
      console.log(this.y)
      this.$WebSDK('common.executeClipBoard', this.winId)
    },
  }
}
</script>

<style lang='scss' scoped>
.clipboard
{
  overflow: hidden;
}
.dropdown-menu{
  position: absolute;
  display: block;
  border-radius: 0px;
  top: 0;
  background-color: beige;
  margin: 0;
  left: 0;
  z-index: 1000;
  padding: 5px 0px 5px 0px;
  font-size: 8px;
  text-align: left;
  list-style: none;
  border: 1px solid rgb(198, 208, 218);
  li{
      list-style-type: none;
      box-sizing: border-box;
      width: 100%;
      height: 26px;
      line-height: 26px;
      padding-left: 4px;
      padding-right: 4px;
      margin: 0;
      font-weight: normal;
      white-space: nowrap;
      color: rgb(0, 0, 0);
      cursor: default;
    &:hover{
      background-color: rgb(205, 214, 226);
    }
  }
  .borderline{
    border-bottom: 1px solid rgb(212, 216, 221);
  }
}
</style>
