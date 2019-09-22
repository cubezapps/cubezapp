/* eslint-disable */
<template>
  <div class="backgrounddiv">
     <tittlebar :tittle="$t('Chat')"></tittlebar>
     <div class="maindiv">
         <div class="leftdiv">
            <div class="infodiv"></div>
            <div class="editdiv">
               <div class="buttonsdiv">
               </div>
               <div class="textdiv">

               </div>
               
            </div>
            <div class="statusdiv"></div>
          </div>
          <div class="rightdiv">
         
          </div>
      </div>
  </div>
</template>

<script>
import i18n from '@/i18n'
import tittlebar from '@/component/common/tittlebar/tittlebar.vue'
export default {
  components: {
    tittlebar,
  },
  data () {
    return {
      chatData: {},
      editor: null,
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy() {

  },
  methods: {
    init() {
      this.$WebSDK('win.resize', 600, 500)
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
      height: 55%;
      flex: 1 1 auto;
      background: linear-gradient(to bottom, beige, rgb(245, 245, 209));
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid rgb(221, 221, 210);
    }

    .editdiv {
      height: calc(45% - 40px);
      flex: 1 1 auto;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .buttonsdiv {
        height: 30px;
        flex: 1 1 auto;
        background: rgb(247, 247, 228);
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .textdiv {
        height: calc(100% - 30px);
        flex: 1 1 auto;
        background: rgb(247, 247, 228);
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    .statusdiv {
      height: 40px;
      flex: 1 1 auto;
      background: rgb(230, 230, 208);
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }

  .rightdiv {
    width: 30%;
    flex: 1 1 auto;
    background: linear-gradient(to bottom, beige, rgb(243, 243, 196));
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid rgb(221, 221, 210);
  }
}
</style>
