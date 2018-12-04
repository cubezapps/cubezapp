/* eslint-disable */
<template>
  <div class="backgrounddiv">
  </div>
</template>

<script>
export default {
  metaInfo: {
        title: 'my vue app settingframe', // set a title
        meta: [{                 // set meta
          name: 'keyWords',
          content: 'My Example App'
         }],
        htmlAttrs: {
          lang: 'zh-CN'
        }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      this.$WebSDK('win.resize', 400, 400)
      this.$WebSDK('win.move', 4)
      this.$WebSDK('win.needResizable', true)
      this.$WebSDK('win.show')
      window.onresize = () => {
        this.resetCaptionArea()
      }
      this.resetCaptionArea()
      // eslint-disable-next-line
      this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
      switch (uri) {
        case this.$DataUri.SettingFrame_CloseWindow:
          window.close()
          break
        case this.$DataUri.$App_CloseAllWindow:
          window.close()
          break
      }
    })
    },
    resetCaptionArea () {
      let areaTop = [0, 0, document.body.offsetWidth,  30]
      this.$WebSDK('win.setDragArea', [areaTop])
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
.backgrounddiv{
  position: relative;
  width: 100%;
  margin: 0;
  height: 100%;
  background: url('./img/back.png') no-repeat;
  border-radius: 0px;
  background-size: 100% 100%
}
</style>
