/* eslint-disable */
<template>
  <div class="backgrounddiv">
     <tittlebar :tittle="$t('Chat')"></tittlebar>
     <div class="maindiv">
         
      </div>
  </div>
</template>

<script>
import i18n from '@/i18n'
import tittlebar from '@/component/common/tittlebar/tittlebar.vue'
export default {
  metaInfo: {
        title: 'Chatframe', // set a title
        meta: [{                 // set meta
          name: 'keyWords',
          content: 'My Example App'
         }],
        htmlAttrs: {
          lang: 'zh-CN'
        }
  },
  components: {
    tittlebar
  },
  data () {
    return {
      chatData: {},
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      this.$WebSDK('win.resize', 590, 360)
      this.$WebSDK('win.move', 4)
      this.$WebSDK('win.needSystemAutoMinMax', false)
      this.$WebSDK('win.setResizeBorderWidth', 0)
      this.$WebSDK('win.show')
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
            if(JSON.stringify(this.chatData) == '{}') {
              this.chatData = obj
            }
            else if(obj.uniqueId == this.chatData.uniqueId){
              this.chatData = obj
            }
            break
          }
          case this.$DataUri.ChatFrame_ShowWindow:{
            let obj = JSON.parse(data)
            this.$Logger.log('show window:' + this.chatData.uniqueId)
            if(obj.uniqueId == this.chatData.uniqueId){
              this.$Logger.log('ChatFrame_ShowWindow uniqueId: ' + this.chatData.uniqueId + ' name:' + this.chatData.name)
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
          }
      })
      document.body.oncontextmenu = (e) => {
          return false
      }
    },
    setCaptionArea () {
      let areaTop = [0, 0, document.body.offsetWidth - 30,  30]
      this.$WebSDK('win.setDragArea', [areaTop])
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
  flex-direction: column;
  justify-content: center;
  font-size: 12px;

}

input[type=checkbox]{
	height: 0;
	width: 0;
	visibility: hidden;
}
</style>
