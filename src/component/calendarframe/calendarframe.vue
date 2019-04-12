/* eslint-disable */
<template>
  <div class="backgrounddiv">
     <tittlebar :tittle="$t('Calendar')"></tittlebar>
     <div class="maindiv">
        <iframe src="/calendar.html" width=100% height=100% frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
      </div>
  </div>
</template>

<script>
import i18n from '@/i18n'
import tittlebar from '@/component/common/tittlebar/tittlebar.vue'
export default {
  metaInfo: {
        title: 'Calendarframe', // set a title
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
      html: '<iframe src="/calendar.html" frameborder="0"></iframe>'
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    
  },
  methods: {
    init() {
      this.$WebSDK('win.resize', 812, 550)
      this.$WebSDK('win.move', 4)
      this.$WebSDK('win.needSystemAutoMinMax', false)
      this.$WebSDK('win.setResizeBorderWidth', 0)
      //this.$WebSDK('win.show')
      window.onresize = () => {
        this.setCaptionArea()
      }
      this.setCaptionArea()
      this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
      switch (uri) {
        case this.$DataUri.CalendarFrame_ShowWindow:
          this.$WebSDK('win.move', 4)
          this.$WebSDK('win.show')
          this.$WebSDK('win.forefront')
          break
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
  background: beige;
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
  height: 100%;
  flex: 1 1 auto;
  background: beige;
  margin: 0;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  font-size: 12px;
}
</style>
