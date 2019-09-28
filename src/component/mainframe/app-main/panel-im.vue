<template>
    <div class="backpanel">
      <div class="item" ref="friendItem" @click="onClick($event)">{{this.$t('Friend')}}</div>
      <friendtag ref="friendTag" :tagdata="friendData"></friendtag>
    </div> 
</template>

<script>
import friendtag from './friend-tag.vue'
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
      myselfData: []
    }
  },
  mounted() {
    this.friendData['items'] = []
    let friendItemObj = {}
    friendItemObj['name'] = this.$t("Computer Name")
    friendItemObj['ip'] = this.$t("IP Address")
    friendItemObj['mac'] = this.$t("Mac Address")
    this.friendData['items'].push(friendItemObj)

    //this.addFriendData("123EMIC-KIATKGP_Administrator", "192.168.111.111", "B8-EE-65-2C-FD-48")
    
    window.Native.Network.addressEntries().then( r => {
        this.myselfData = r
    })
    window.connectSignal(window.Native.Network.onBoardCast, (ip, port, computerName, macAddr) => {
        this.addFriendData(computerName, ip, port, macAddr)
    });
    window.setTimeout(() => {
       window.Native.Network.boardCast()
    }, 1000)
    
    //let friendItemMenu = []
    //friendItemMenu.push('SendMessage')
    //friendItemMenu.push('Send File')
    this.friendData['menus'] = []
    this.friendData['id'] = "friendData"
    this.$VueBus.$emit('onRefresh', this.friendData.id)
    this.$VueBus.$on('onFriendItemDbClick', (val) => {
        if(JSON.stringify(this.chatFrameObjs[val.uniqueId]) == '{}') {
          this.$WebSDK('sdk.openWindow', '/#/chatframe', 'charframe', 'left=9999,top=9999,resizable:0,forbidsystemclose:1,titlebar:0,topmost:1,taskbaricon:0,windowvisible:0,offscreenrendering:0,guardapp:0').then(r => {
            this.chatFrameObjs[val.uniqueId] = r
            window.connectSignal(this.chatFrameObjs[val.uniqueId].loadStateChanged, (state, data) => {
               if(state == 1){
                  this.$Logger.log('!!!!!!!!!!!!!!!!!!')
                  this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_SetData, JSON.stringify(val))
                }
            });
          })
        }
        else {
          this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_ShowWindow, JSON.stringify(val))
        }
    })
  },
  computed: {
      
  },
  methods: {
    addFriendData(name, ip, port, mac) {
        let friendItemObj = {}
        friendItemObj['name'] = name
        friendItemObj['ip'] = ip
        friendItemObj['port'] = port
        friendItemObj['mac'] = mac
        friendItemObj['ismyself'] = false
        for(let i = 0; i < this.myselfData.length; i++) {
          if(ip == this.myselfData[i].address.ip) {
            friendItemObj['ismyself'] = true
            this.$Logger.log('ismyself')
          }
        }
        let uniqueVal = (++this.uniqueId).toString()
        friendItemObj['uniqueId'] = uniqueVal
        this.friendData['items'].push(friendItemObj)
        let chatObj = {}
        this.chatFrameObjs[uniqueVal] = {}
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
  .item {
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
  }
</style>
