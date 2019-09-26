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
                  <b-form-textarea id="textarea" v-model="editText" placeholder="" rows="10" max-rows="20" no-resize no-auto-shrink @Click="onClick($event)"></b-form-textarea>
               </div>
               
            </div>
            <div class="statusdiv">
                 <div class="statusdiv-1"></div>
                 <div class="statusdiv-2">
                     <b-button variant="danger" class="btn-ex">{{$t('Close')}}</b-button>
                     <b-button variant="primary" class="btn-ex">{{$t('Send')}}</b-button>
                 </div>
            </div>
          </div>
          <div class="rightdiv">
              <div :style="{'height': '50%'}">
                
              </div>
              <div :style="{'height': '50%'}"></div>
          </div>
      </div>
  </div>
</template>

<script>
import i18n from '@/i18n'
import tittlebar from '@/component/common/tittlebar/tittlebar.vue'
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
  },
  data () {
    return {
      chatItem: {},
      editText: 'input text!!!'
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
            if(JSON.stringify(this.chatItem) == '{}') {
              this.chatItem = obj
            }
            else if(obj.uniqueId == this.chatItem.uniqueId){
              this.chatItem = obj
            }
            break
          }
          case this.$DataUri.ChatFrame_ShowWindow:{
            let obj = JSON.parse(data)
            this.$Logger.log('show window:' + this.chatItem.uniqueId)
            if(obj.uniqueId == this.chatItem.uniqueId){
              this.$Logger.log('ChatFrame_ShowWindow uniqueId: ' + this.chatItem.uniqueId + ' name:' + this.chatItem.name)
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
    },
    onClick(event) {

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
      background: rgb(255, 255, 255);
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
        height: 22px;
        flex: 1 1 auto;
        background: rgb(245, 244, 244);
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .textdiv {
        height: calc(100% - 22px);
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
    background: linear-gradient(to bottom, beige, rgb(243, 243, 196));
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid rgb(221, 221, 210);
  }
}
</style>
