<template>
  <div class="backgrounddiv">
     <tittlebar :tittle="$t('About')" :showmin="false"></tittlebar>
     <div class="maindiv">
        <div class="maindiv-topdiv"></div>
        <div class="maindiv-middlediv">
          <p>{{$t("The software")}}<b-link href="https://bitbucket.org/woaicide/cubezapp" target="_blank">{{$t("here")}}</b-link></p>
          <p>{{$t("Feedback and comments")}}</p>
          <p>{{$t("If you")}}<b-link href="https://new.crcf.org.cn/donations/PayLove.aspx" target="_blank">{{$t("Red Cross foundation")}}</b-link></p>
          <p>{{$t("Version: ")}}<span :style="{'color': 'red'}">{{versionStr}}</span></p>
        </div>
        <div class="maindiv-bottomdiv"></div>
    </div>
  </div>
</template>

<script>
import i18n from '@/i18n'
import tittlebar from '@/component/common/tittlebar/tittlebar.vue'
export default {
  metaInfo: {
        title: 'Aboutframe', // set a title
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
      versionStr : String
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$WebSDK('win.resize', 360, 260)
      this.$WebSDK('win.move', 4)
      window.onresize = () => {
        this.setCaptionArea()
      }
      this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
      switch (uri) {
          case this.$DataUri.App_CloseAllWindow:
            window.close()
            break
          case this.$DataUri.AboutFrame_ShowWindow:
            this.$WebSDK('win.move', 4)
            this.$WebSDK('win.show')
            break
          case this.$DataUri.APP_LanguageChange:
              i18n.setLocale(data)
              break
        }
      }, this)
      this.$WebSDK('sdk.getSdkVersion').then((r) => {
        this.versionStr = r
      })
    },
    setCaptionArea () {
      let areaTop = [0, 0, document.body.offsetWidth - 30,  30]
      this.$WebSDK('win.setDragArea', [areaTop])
    },
  },
  computed: {

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

  .maindiv {
    height: 100%;
    flex: 1 1 auto;
    background: beige;
    margin: 0;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    font-size: 13px;

    .maindiv-topdiv {
      height: calc(25%);
      width: 100%;
      flex: 1 1 auto;
    }

    .maindiv-middlediv {
      margin-left: 10%;
      margin-right: 10%;
    }

    .maindiv-bottomdiv {
      height: calc(25%);
      flex: 1 1 auto;
    }
  }
}
</style>
