/* eslint-disable */
<template>
  <div class="backgrounddiv">
     <tittlebar :tittle="$t('Setting')" :showmin="false"></tittlebar>
     <div class="maindiv">
         <div class="linediv">
            <div :style="{'margin-right': '6px'}">{{$t('Start with the system')}}</div><input type="checkbox" ref="boot" id="switch1" @click="onBootBtnClick()"/><label for="switch1" :style="{'margin-top': 'auto', 'margin-bottom': 'auto'}">Toggle</label><div class="spacediv"></div>
         </div>
         <div class="linediv">
            <div :style="{'margin-right': '6px'}">{{$t('Switch to Chinese')}}</div><input type="checkbox" ref="chineseLang" id="switch2" @click="onChineseLangCheck($event)"/><label for="switch2" :style="{'margin-top': 'auto', 'margin-bottom': 'auto'}">Toggle</label><div class="spacediv"></div>
         </div>
         <div class="linediv">
            <div :style="{'margin-right': '6px'}">{{$t('Switch to English')}}</div><input type="checkbox" ref="englishLang" id="switch3" @click="onEnglishLangCheck($event)"/><label for="switch3" :style="{'margin-top': 'auto', 'margin-bottom': 'auto'}">Toggle</label><div class="spacediv"></div>
         </div>
      </div>
  </div>
</template>

<script>
import i18n from '@/i18n'
import tittlebar from '@/component/common/tittlebar/tittlebar.vue'
export default {
  metaInfo: {
        title: 'Settingframe', // set a title
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
      
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      this.$WebSDK('win.resize', 360, 240)
      this.$WebSDK('win.move', 4)
      this.$WebSDK('win.needSystemMaximize', false)
      this.$WebSDK('win.needSystemMinimize', true)
      this.$WebSDK('win.setResizeBorderWidth', 0)
      //this.$WebSDK('win.show')
      window.onresize = () => {
        this.setCaptionArea()
      }
      this.setCaptionArea()
      if(i18n.locale == 'cn') {
        this.$refs.chineseLang.checked = true
        this.$refs.englishLang.checked = false
      }
      else if(i18n.locale == 'en') {
        this.$refs.englishLang.checked = true
        this.$refs.chineseLang.checked = false
      }
      else {
        this.$refs.chineseLang.checked = true
        this.$refs.englishLang.checked = false
      }
      this.$WebSDK('common.isAutoRun').then(r => {
        this.$refs.boot.checked = r
      })
      // eslint-disable-next-line
      this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
      switch (uri) {
        case this.$DataUri.SettingFrame_ShowWindow:
          this.$WebSDK('win.move', 4)
          this.$WebSDK('win.show')
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
    },
    onBootBtnClick() {
      this.$WebSDK('common.setAutoRun', this.$refs.boot.checked)
    },
    onChineseLangCheck(event) {
      if(i18n.locale == 'cn') {
        this.$refs.chineseLang.checked = true
      }
      else {
        if(this.$refs.chineseLang.checked) {
         i18n.setLocale('cn', true)
         this.$refs.englishLang.checked = false
        }
      }
    },
    onEnglishLangCheck(event) {
      if(i18n.locale == 'en') {
        this.$refs.englishLang.checked = true
      }
      else {
        if(this.$refs.englishLang.checked) {
         i18n.setLocale('en', true)
         this.$refs.chineseLang.checked = false
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

  .linediv {
    height: 30px;
   // background-color: red;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    .spacediv {
      flex: 0 0 auto;
    }
  }
}

input[type=checkbox]{
	height: 0;
	width: 0;
	visibility: hidden;
}

label {
	cursor: pointer;
	text-indent: -9999px;
	width: 46px;
	height: 20px;
	background: grey;
	display: block;
	border-radius: 100px;
	position: relative;
}

label:after {
	content: '';
	position: absolute;
	top: 0px;
	left: 5px;
	width: 20px;
	height: 20px;
	background: #fff;
	border-radius: 90px;
	transition: 0.3s;
}

input:checked + label {
	background: rgb(0, 153, 38);
}

input:checked + label:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
}

label:active:after {
	width: 20px;
}
</style>
