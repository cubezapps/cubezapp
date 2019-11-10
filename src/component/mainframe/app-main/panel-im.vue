<template>
    <div class="backpanel">
      <div class="friendDiv" ref="friendItem" @click="onClick($event)">{{this.$t('Friend')}}
        <div class="hintDiv" ref="hintRef" :style="{ 'margin-left': hintMarginLeft }">
          <img class="avatar" id="imgid1" :src="greenImg"/>
          <div class="text">{{ $t("online") }}</div>
          <img class="avatar" id="imgid2" :src="houseImg"/>
          <div class="text">{{ $t("myself") }}</div>
        </div>
      </div>
      <friendtag ref="friendTag" :tagdata="friendData"></friendtag>
    </div> 
</template>

<script>
import friendtag from './friend-tag.vue'
import i18n from '@/i18n'
export default {
  components: {
    friendtag
  },
  props: {
    
  }, 
  data () {
    return {
      friendData: {},
      chatFrameObjs: {},
      uniqueId: 0,
      myselfData: [],
      greenImg: 'asserts/green.png',
      houseImg: 'asserts/house.png',
      hintMarginLeft: 'calc(100% - 120px)'
    }
  },
  mounted() {
    this.friendData['items'] = []
    let friendItemObj = {}
    friendItemObj['computer'] = this.$t("Computer")
    friendItemObj['ip'] = this.$t("IP Address")
    friendItemObj['mac'] = this.$t("Mac Address")

    this.friendData['items'].push(friendItemObj)
    //this.addFriendData("123EMIC-KIATKGP_Administrator", "192.168.111.111", 8888, "B8-EE-65-2C-FD-48")
    //let friendItemMenu = []
    //friendItemMenu.push('SendMessage')
    //friendItemMenu.push('Send File')
    this.friendData['menus'] = []
    this.friendData['id'] = "friendData"
    
    window.Native.Network.addressEntries().then( r => {
        this.myselfData = r
    })
    window.connectSignal(window.Native.Network.onBoardCast, (ip, port, computerName, macAddr) => {
        this.$Logger.log('onBoardCast computerName:' + computerName + ' ip:' + ip + ' port:' + port + ' mac:' + macAddr)
        let ismyself = false
        for(let i = 0; i < this.myselfData.length; i++) {
          //this.$Logger.log('ip:' + ip + ' myselfip:' + this.myselfData[i].address.ip)
          //this.$Logger.log('mac:' + mac + ' myselfmac:' + this.myselfData[i].mac)
          if(macAddr == this.myselfData[i].mac) {
            ismyself = true
            break
          }
        }
        if(!ismyself) {
          let index = this.getSelfDataIndex(ip)
          this.$Logger.log('doUnicast ===> ip:' + ip + ' port:' + port + ' computer:' + this.friendData.items[index]['computer'] + ' mac:' + this.friendData.items[index]['mac'])
          window.Native.Network.uniCast(ip, port, this.friendData.items[index]['computer'], this.friendData.items[index]['mac'])
        }
        //else {
          this.updateFriendData(computerName, ip, port, macAddr)
        //}
    });
    window.connectSignal(window.Native.Network.onUniCast, (ip, port, computerName, macAddr) => {
        this.$Logger.log('===> onUniCast computerName:' + computerName + ' ip:' + ip + ' port:' + port + ' mac:' + macAddr)
        this.updateFriendData(computerName, ip, port, macAddr)
    });
    window.Native.Network.boardCast()
    window.setInterval(() => {
       window.Native.Network.boardCast()
    }, 1000)
    //window.setInterval(() => {
      // this.keepAlive()
    //}, 750)
    
    this.$VueBus.$on('onFriendItemDbClick', (val) => {
        let index = this.getSelfDataIndex(val.ip)
        window.Native.Network.uniCast(val.ip, val.port, this.friendData.items[index]['computer'], this.friendData.items[index]['mac'])
        if(JSON.stringify(this.chatFrameObjs[val.uniqueId]) == '{}') {
          this.$WebSDK('sdk.openWindow', '/#/chatframe', 'charframe', 'left=9999,top=9999,minimizeresizable:0,maximizeresizable:0,forbidsystemclose:1,titlebar:0,topmost:0,taskbaricon:1,windowvisible:0,offscreenrendering:0,guardapp:0').then(r => {
            this.chatFrameObjs[val.uniqueId] = r
            window.connectSignal(this.chatFrameObjs[val.uniqueId].loadStateChanged, (state, data) => {
               if(state == 1){
                  this.$Logger.log('!!!onFriendItemDbClick!!')
                  this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_SetData, JSON.stringify(val))
                  this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_ShowWindow, JSON.stringify(val))
                }
            });
          })
        }
        else {
          this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_ShowWindow, JSON.stringify(val))
        }
    })
    window.connectSignal(window.Native.Network.onMessage, (ip, port, message) => {
         var index = this.getFriendItemIndexByIp(ip)
         var uniqueId = this.friendData.items[index]['uniqueId']
         if(JSON.stringify(this.chatFrameObjs[uniqueId]) == '{}') {
          this.$WebSDK('sdk.openWindow', '/#/chatframe', 'charframe', 'left=9999,top=9999,minimizeresizable:0,maximizeresizable:0,forbidsystemclose:1,titlebar:0,topmost:0,taskbaricon:1,windowvisible:0,offscreenrendering:0,guardapp:0').then(r => {
            this.chatFrameObjs[uniqueId] = r
            window.connectSignal(this.chatFrameObjs[uniqueId].loadStateChanged, (state, data) => {
               if(state == 1){
                  this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_SetData, JSON.stringify(this.friendData.items[index]))
                  var msgObj = {}
                  msgObj['ip'] = ip
                  msgObj['port'] = port
                  msgObj['message'] = message
                  this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_OnMessage, JSON.stringify(msgObj))
                }
            });
          })
        }
    })
    window.connectSignal(window.Native.Network.onTransFileReq, (ip, port, jobid, filename, type) => {
         var index = this.getFriendItemIndexByIp(ip)
         var uniqueId = this.friendData.items[index]['uniqueId']
         if(JSON.stringify(this.chatFrameObjs[uniqueId]) == '{}') {
          this.$WebSDK('sdk.openWindow', '/#/chatframe', 'charframe', 'left=9999,top=9999,minimizeresizable:0,maximizeresizable:0,forbidsystemclose:1,titlebar:0,topmost:0,taskbaricon:1,windowvisible:0,offscreenrendering:0,guardapp:0').then(r => {
            this.chatFrameObjs[uniqueId] = r
            window.connectSignal(this.chatFrameObjs[uniqueId].loadStateChanged, (state, data) => {
               if(state == 1){
                  this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_SetData, JSON.stringify(this.friendData.items[index]))
                  var msgObj = {}
                  msgObj['ip'] = ip
                  msgObj['port'] = port
                  msgObj['jobid'] = jobid
                  msgObj['filename'] = filename
                  msgObj['type'] = type
                  this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_OnTransFileReq, JSON.stringify(msgObj))
                }
            });
          })
        }  
    })
    this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
        switch (uri) {
          case this.$DataUri.APP_LanguageChange: {
              //i18n.setLocale(data)
              if(data == 'cn') {
                this.hintMarginLeft = "calc(100% - 120px)"
              }
              else if(data == 'en') {
                this.hintMarginLeft = "calc(100% - 140px)"
              }
            }
            break
        }
    })
    if(i18n.locale == 'cn') {
      this.hintMarginLeft = "calc(100% - 120px)"
    }
    else if(i18n.locale == 'en') {
      this.hintMarginLeft = "calc(100% - 140px)"
    }
  },
  computed: {

  },
  methods: {
    addFriendData(computer, ip, port, mac) {
        let friendItemObj = {}
        friendItemObj['computer'] = computer
        friendItemObj['ip'] = ip
        friendItemObj['port'] = port
        friendItemObj['mac'] = mac
        friendItemObj['ismyself'] = false
        friendItemObj['isonline'] = true
        friendItemObj['updatetime'] = new Date().getTime()

        for(let i = 0; i < this.myselfData.length; i++) {
          //this.$Logger.log('ip:' + ip + ' myselfip:' + this.myselfData[i].address.ip)
          //this.$Logger.log('mac:' + mac + ' myselfmac:' + this.myselfData[i].mac)
          if(mac == this.myselfData[i].mac) {
            friendItemObj['ismyself'] = true
          }
        }
        let uniqueVal = (++this.uniqueId).toString()
        friendItemObj['uniqueId'] = uniqueVal
        this.friendData['items'].push(friendItemObj)
        let chatObj = {}
        this.chatFrameObjs[uniqueVal] = {}

        this.$Logger.log('addFriendData computer:' + computer + ' ip:' + ip + ' mac:' + mac)
    },
    getFriendItemIndexByIp(ip) {
        for(let i = 1; i < this.friendData.items.length; i++) {
          if(this.friendData.items[i].ip == ip) {
            return i
          }
        }
    },
    updateFriendData(computer, ip, port, mac) {
        let isExists = false
        let updatedIndex = -1
        for(let i = 0; i < this.friendData.items.length; i++) {
          if(this.friendData.items[i].mac == mac) {
            if(this.friendData.items[i]['ip'] != ip || this.friendData.items[i]['computer'] != computer || !this.friendData.items[i]['isonline']) {
              this.friendData.items[i]['isonline'] = true
              this.friendData.items[i]['ip'] = ip
              this.friendData.items[i]['computer'] = computer
              updatedIndex = i
            }
            this.friendData.items[i]['updatetime'] = new Date().getTime()
            isExists = true
            break
          }
        }
        if(!isExists) {
          this.addFriendData(computer, ip, port, mac)
        }
        this.checkOnline()
        if(updatedIndex >= 0)
          this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_SetData, JSON.stringify(this.friendData.items[updatedIndex]))
        this.$VueBus.$emit('onRefresh', this.friendData.id)
    },
    checkOnline() {
        for(let i = 0; i < this.friendData.items.length; i++) {
          let timeval = new Date().getTime()
          if(timeval - this.friendData.items[i]['updatetime'] > 5000 && !this.friendData.items[i]['ismyself']) {
            if(this.friendData.items[i]['isonline']) {
              this.friendData.items[i]['isonline'] = false
              this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_SetData, JSON.stringify(this.friendData.items[i]))
              this.$Logger.log('OnlineStatus changed: ' + this.friendData.items[i]['ip'])
            }
            //this.$set(this.friendData.items[i], 'isonline', false)
          }
        }
    },
    getSelfDataIndex(ip) {
      let preStr = ip.substring(0, ip.lastIndexOf('.') + 1)
      for(let i = 1; i < this.friendData.items.length; i++) {
        if(this.friendData.items[i]['ismyself']) {
          let tempStr = this.friendData.items[i]['ip'].substring(0, this.friendData.items[i]['ip'].lastIndexOf('.') + 1)
          if(preStr == tempStr) {
            return i
          }
        }
      }
      return 0
    },
    keepAlive() {
      for(let i = 1; i < this.friendData.items.length; i++) {
          if(!this.friendData.items[i]['ismyself']) {
            let index = this.getSelfDataIndex(this.friendData.items[i]['ip'])
            this.$Logger.log('doUnicast ===> ip:' + this.friendData.items[i]['ip'] + ' port:' + this.friendData.items[i]['port'] + ' computer:' + this.friendData.items[index]['computer'] + ' mac:' + this.friendData.items[index]['mac'])
            window.Native.Network.uniCast(this.friendData.items[i]['ip'], this.friendData.items[i]['port'], this.friendData.items[index]['computer'], this.friendData.items[index]['mac'])
          }
        }
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  .backpanel {
    flex: 1 1 auto;
    //background-color: beige;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  $itemheigh: 28px;
  .friendDiv {
    flex: 0 0 $itemheigh;
    height: $itemheigh;
    padding-left: 8px;
    text-align: left;
    line-height: $itemheigh;
    border-bottom: 1px solid rgb(230, 230, 230);
    user-select: none;
    cursor: default;
    &:hover{
      background-color: rgb(230, 230, 230);
    }
    display: flex;
    flex-direction: row;

    .hintDiv {
      //margin-left: calc(100% - 120px);
      .avatar {
          float: left;
          margin-right: 2px;
          border-radius: 3px;
          margin-top: 7px;
          margin-bottom: auto;
          width: 15px;
          height: 15px;
      }
      .text {
        float: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      #imgid2 {
        margin-left: 5px;
      }
    }
  }
</style>
