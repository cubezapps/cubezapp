/* eslint-disable */
<template>
  <div class="backgrounddiv">
     <tittlebar :tittle="$t('MessageWindow')" :showmin="true"></tittlebar>
     <div class="maindiv">
         <div class="leftdiv">
            <div class="infodiv" ref="infodivRef" id="infodivId">
                <ul>
                    <li v-for="(item, index) in messageItems" :key="index">
                        <p class="time">
                            <span>{{ item.date | time }}</span>
                        </p>
                        <div class="main" :class="{ self: item.self }">
                            <img class="avatar" width="32" height="32" :src="item.self ? selfImg : otherImg" />
                            <div class="text">{{ item.content }}</div>
                        </div>
                    </li>
                </ul>

            </div>
            <div class="editdiv">
               <div class="buttonsdiv">
               </div>
               <div class="textdiv">
                  <b-form-textarea id="textarea" ref="textareaRef" v-model="editText" placeholder="" rows="10" max-rows="20" no-resize no-auto-shrink autofocus @keydown="onKeydown"></b-form-textarea>
               </div>
               
            </div>
            <div class="statusdiv">
                 <div class="statusdiv-1"></div>
                 <div class="statusdiv-2">
                     <b-button variant="danger" class="btn-ex" @click="onClickClose($event)">{{$t('Close')}}</b-button>
                     <b-button variant="primary" id="primaryId" class="btn-ex" @click="onClickSend($event)">{{$t('Send')}}</b-button>
                     <b-tooltip target="primaryId" ref="tooltipRef" :disabled.sync="tooltipDisabled" variant="secondary" placement="top">{{tooltipText}}</b-tooltip>
                 </div>
            </div>
          </div>
          <div class="rightdiv">
              <div :style="{'background': 'white', 'height': '40%', 'margin-top': '10px'}">
                  <p class="label">
                      <span>{{$t("Computer: ")}}</span>
                      <span>{{this.$t(chatItem.computer)}}</span>
                  </p>
                  <p class="label">
                      <span>{{$t("IP: ")}}</span>
                      <span>{{this.$t(chatItem.ip)}}</span>
                  </p>
                  <p class="label">
                      <span>{{$t("Mac: ")}}</span>
                      <span>{{this.$t(chatItem.mac)}}</span>
                  </p>
                  <div class="labelandimg">
                      <span>{{$t("Online: ")}}</span>
                      <img width="14" height="14" :style="{'margin-top': '-3px', 'margin-left': '3px'}" :src="chatItem.isonline ? greenImg : redImg" />
                  </div>
              </div>
              <div class="transfile-div">
                <transfileitem v-for="(item, index) of transFileItems" :key="index" :index="index" :item="item"></transfileitem>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import i18n from '@/i18n'
import tittlebar from '@/component/common/tittlebar/tittlebar.vue'
import transfileitem from './transfile-item.vue'
import SparkMd5 from 'spark-md5'
export default {
  metaInfo: {
        title: 'ChatFrame', // set a title
        meta: [{                 // set meta
          name: 'keyWords',
          content: 'My Example App'
         }],
        htmlAttrs: {
          lang: 'zh-CN'
        }
  },
  components: {
    tittlebar,
    transfileitem
  },
  filters: {
        time (date) {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            let hours = date.getHours()
            if(hours < 10) {
              hours = '0' + hours
            }
            let minuts = date.getMinutes()
            if(minuts < 10) {
              minuts = '0' + minuts
            }
            return hours + ':' + minuts;
        }
  },
  data () {
    return {
      messageItems: [],
      chatItem: {},
      editText: '',
      selfImg: 'asserts/self.png',
      otherImg: 'asserts/other.png',
      tooltipDisabled: true,
      tooltipText: '',
      redImg: 'asserts/red.png',
      greenImg: 'asserts/green.png',
      transFileItems: [],
      itemUniqueId: 0
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy() {

  },
  methods: {
    init() {
      this.$WebSDK('win.resize', 620, 500)
      this.$WebSDK('win.move', 4)
      this.$WebSDK('win.needSystemAutoMinMax', false)
      this.$WebSDK('win.setResizeBorderWidth', 0)
      //this.$WebSDK('win.show')

      window.onresize = () => {
        this.setCaptionArea()
      }
      this.setCaptionArea()
      // eslint-disable-next-line
      this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
        switch (uri) {
          case this.$DataUri.ChatFrame_SetData: {
            let obj = JSON.parse(data)
            if(JSON.stringify(this.chatItem) == '{}') {
              this.chatItem = obj
            }
            else if(obj.uniqueId == this.chatItem.uniqueId){
              this.chatItem = obj
              this.$forceUpdate()
            }
            break
          }
          case this.$DataUri.ChatFrame_ShowWindow:{
            let obj = JSON.parse(data)
            this.$Logger.log('show window:' + this.chatItem.uniqueId)
            if(obj.uniqueId == this.chatItem.uniqueId){
              this.$Logger.log('ChatFrame_ShowWindow uniqueId: ' + this.chatItem.uniqueId + ' computer:' + this.chatItem.computer)
              this.$WebSDK('win.show')
            }
            break
          }
          case this.$DataUri.App_CloseAllWindow:
            window.close()
            break
          case this.$DataUri.APP_LanguageChange:
            i18n.setLocale(data)
            break
          case this.$DataUri.ChatFrame_ItemClose: {
            let obj = JSON.parse(data)
            for(let i = 0; i < this.transFileItems.length; i++) { 
              if(obj.itemuniqueid == this.transFileItems[i].itemuniqueid) {
                this.transFileItems.splice(i, 1)
              }
            }
          }
            break
          }
      })
      document.body.oncontextmenu = (e) => {
          return false
      }
      this.$refs.textareaRef.$el.placeholder = this.$t('Press Ctrl + Enter to send')
      window.connectSignal(window.Native.Network.onMessage, (ip, port, message) => {
           if(this.chatItem.ip == ip) {
              let tmpItem = {}
              tmpItem["content"] = message
              tmpItem["date"] = new Date()
              tmpItem["self"] = false
              this.messageItems.push(tmpItem)
              this.scrollBottom()
           }
      });
      window.Win.winId().then(winId => {
        window.Native.Sdk.cefBrowser(winId).then((browser) => {
        window.connectSignal(browser.onDragNames, (names) => {
          if (!this.checkOnline()) {
            return
          }
          for(let i = 0; i < names.length; i++) {
            let filesData = {}
            filesData.items = []
            let objFile = {}
            objFile['path'] = names[i]
            objFile['hash'] = SparkMd5.hash(objFile['path'].toLowerCase())
            let n = objFile['path'].lastIndexOf("\\")
            objFile['name'] = objFile['path'].substr(n + 1)
            filesData['items'].push(objFile)
            objFile['status'] = 0
            objFile['issendfile'] = true
            objFile['ip'] = this.chatItem.ip
            objFile['port'] = this.chatItem.port
            this.$WebSDK('common.parseShortcutFiles', JSON.stringify(filesData)).then(r => {
              window.Native.Network.sendFile(this.chatItem.ip, this.chatItem.port, objFile.path).then(jobId => {
                objFile['jobid'] = jobId
                objFile['itemuniqueid'] = ++this.itemUniqueId
                this.transFileItems.push(objFile)
              })
            })
          }
        })
      })
      })
      window.connectSignal(window.Native.Network.onTransFileReq, (ip, port, jobid, filename, type) => {
        if(this.chatItem.ip == ip) {
          let objFile = {}
          objFile['path'] = filename
          objFile['hash'] = SparkMd5.hash(objFile['path'].toLowerCase())
          let n = objFile['path'].lastIndexOf("\\")
          objFile['name'] = objFile['path'].substr(n + 1)
          objFile['filename'] = filename
          objFile['status'] = 0
          objFile['type'] = type
          objFile['jobid'] = jobid
          objFile['issendfile'] = false
          objFile['ip'] = this.chatItem.ip
          objFile['port'] = this.chatItem.port
          objFile['itemuniqueid'] = ++this.itemUniqueId
          this.transFileItems.push(objFile)
          this.$WebSDK('win.forefront')
          this.$WebSDK('win.show')
        }
      })
      window.connectSignal(window.Native.Network.onTransFileCancel, (ip, port, jobid) => {
          if(this.chatItem.ip == ip) {
            for(let i = 0; i < this.transFileItems.length; i++) { 
            if(jobid == this.transFileItems[i].jobid) {
              this.transFileItems.splice(i, 1)
            }
          }
        }
      })
    },
    setCaptionArea () {
      let areaTop = [0, 0, document.body.offsetWidth - 60,  30]
      this.$WebSDK('win.setDragArea', [areaTop])
    },
    onClickClose(event) {
      window.Win.hide()
    },
    onClickSend(event) {
      if(!this.checkEmptyMessage())
        return
      if (!this.checkOnline()) {
        return
      }
      window.Native.Network.message(this.chatItem.ip, this.chatItem.port, this.$refs.textareaRef.value)
      let tmpItem = {}
      tmpItem["content"] = this.$refs.textareaRef.value
      tmpItem["date"] = new Date()
      tmpItem["self"] = true
      this.messageItems.push(tmpItem)
      this.editText = ""
      this.scrollBottom()
    },
    checkEmptyMessage() {
      if(this.$refs.textareaRef.value == "") {
        this.tooltipText = this.$t('Cannot Send Empty Message')
        this.$refs.tooltipRef.$emit('open')
        setTimeout(() => {
          this.$refs.tooltipRef.$emit('close')
        }, 2000);
        return false
      }
      return true
    },
    checkOnline() {
      if (!this.chatItem.isonline) {
        this.tooltipText = this.$t('Friend is not online')
        this.$refs.tooltipRef.$emit('open')
        setTimeout(() => {
          this.$refs.tooltipRef.$emit('close')
        }, 2000);
        return false
      }
      return true
    },
    scrollBottom () {
      this.$nextTick(() => {
          this.$refs.infodivRef.scrollTop = this.$refs.infodivRef.scrollHeight - this.$refs.infodivRef.clientHeight
      })
    },
    onKeydown (e) {
        if (e.ctrlKey && e.keyCode === 13) {
            this.onClickSend(e)
        }
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
$back-color: rgb(0, 137, 227);
.backgrounddiv{
  position: relative;
  width: 100%;
  margin: 0;
  height: 100%;
  background: $back-color;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  //background: url('./img/back.png') no-repeat;
  //border-radius: 0px;
  //background-size: 100% 100%
}
.maindiv {
  width: 100%;
  flex: 1 1 auto;
  background: beige;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .leftdiv {
    width: 70%;
    flex: 1 1 auto;
    background: beige;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .infodiv {
      height: 65%;
      flex: 1 1 auto;
      background: rgb(255, 255, 255);
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid rgb(221, 221, 210);
      padding: 10px 15px;
      overflow-y: scroll;

      li {
        margin-bottom: 15px;
      }
      .time {
          margin: 7px 0;
          text-align: center;

          > span {
              display: inline-block;
              padding: 0 18px;
              font-size: 12px;
              color: #fff;
              border-radius: 2px;
              background-color: #dcdcdc;
          }
      }
      .avatar {
          float: left;
          margin: 0 10px 0 0;
          border-radius: 3px;
      }
      .text {
          display: inline-block;
          position: relative;
          padding: 0 10px;
          max-width: calc(100% - 42px);
          min-height: 28px;
          line-height: 2;
          font-size: 12px;
          text-align: left;
          word-break: break-all;
          background-color: #a1bdc5;
          border-radius: 4px;
          white-space: pre-wrap;

          &:before {
              content: "";
              position: absolute;
              top: 9px;
              right: 100%;
              border: 6px solid transparent;
              border-right-color: #a1bdc5;
          }
      }

      .self {
          text-align: right;

          .avatar {
              float: right;
              margin: 0 0 0 10px;
          }
          .text {
              background-color: #b2e281;

              &:before {
                  right: inherit;
                  left: 100%;
                  border-right-color: transparent;
                  border-left-color: #b2e281;
              }
          }
      }
    }

    .editdiv {
      height: calc(35% - 40px);
      flex: 1 1 auto;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;

      $buttonsDivWidth: 0px;
      .buttonsdiv {
        height: $buttonsDivWidth;
        flex: 1 1 auto;
        background: rgb(245, 244, 244);
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .textdiv {
        height: calc(100% - #{$buttonsDivWidth}) ;
        flex: 1 1 auto;
        background: rgb(247, 247, 228);
        margin: 0;
        display: flex;
        padding-left: 1px;
        flex-direction: column;
        justify-content: center;
      }
    }
    .statusdiv {
      height: 40px;
      flex: 1 1 auto;
      background: rgb(250, 250, 250);
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;

      .statusdiv-1 {
        width: calc(100% - 160px);
        flex: 1 1 auto;
        justify-content: center;
      }
      .statusdiv-2 {
        width: 160px;
        flex: 1 1 auto;
        justify-content: center;
        text-align:center;
        margin-top: auto;
        margin-bottom: auto;
        
        .btn-ex{
          margin-right: 10px;
          width: 70px;
        }
      }
    }
  }

  .rightdiv {
    width: 30%;
    flex: 1 1 auto;
    background: white;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid rgb(221, 221, 210);

    .label {
        margin: 10px 10px;
        text-align: left;
        > span {
            //display: inline-block;
            padding: 0 0px;
            font-size: 12px;
            color: rgb(108, 117, 125);
            border-radius: 2px;
            //background-color: #b37878;
        }
    }
    .labelandimg {
        margin: 10px 10px;
        text-align: left;

        > span {
            //display: inline-block;
            padding: 0 0px;
            font-size: 12px;
            color: rgb(108, 117, 125);
            border-radius: 2px;
            //background-color: #b37878;
        }
    }
    .transfile-div {
      background: white;
      height: 60%;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
    }
  }
}
</style>
