<template>
  <div class="app-menu">
    <ul ref="appmenu"  class="dropdown-menu">
        <li v-for="menuname of menus" :key="menuname" @click.stop="onPopupClick($event, menuname)">{{menuname_I18n(menuname)}}</li>
    </ul>
  </div>
</template>

<script>
import i18n from '@/i18n'
export default {
  name: 'popupmenu',
  metaInfo: {
        title: 'Popupmenu', // set a title
        meta: [{                 // set meta
          name: 'popupmenu',
          content: 'popupmenu'
         }],
        htmlAttrs: {
          lang: 'en'
        }
  },
  data() {
    return {
      x: 0,
      y: 0,
      hash: '',
      menus: [],
      path: '',
      param: '',
      langChanged: false
    }
  },
  mounted () {
    this.init()
  },
  watch: {

  },
  updated() {
      if(this.menus.length === 0) {
        this.$WebSDK('win.hide')
      }
      else {
        if(!this.langChanged) {
          let tmp = this.$refs.appmenu
          this.$WebSDK('win.resize', tmp.offsetWidth, tmp.offsetHeight)
          console.log('popup resize: ' + tmp.offsetWidth + ' ' + tmp.offsetHeight)
          this.$WebSDK('win.move', this.x, this.y)
          this.$WebSDK('win.show')
          this.$WebSDK('win.bringToFront')
          this.clearDelay()
          this._mouseenter = true
        }
        else {
          this.$WebSDK('win.move', 9999, 9999)
          this.langChanged = false
        }
      } 
  },
  methods: {
    init () {
      document.body.style = 'overflow: hidden'

      this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
       switch (uri) {
          case this.$DataUri.App_CloseAllWindow: {
            window.close()
            break
          }
          case this.$DataUri.APP_PopupMenu: {
            let obj = JSON.parse(data)
            this.x = obj.x
            this.y = obj.y
            this.hash = obj.hash
            this.menus = obj.menus
            this.path = obj.path
            this.param = obj.param
            break
          }
          case this.$DataUri.APP_LanguageChange:
            i18n.setLocale(data)
            this.langChanged = true
            break
        }
      }, this)
      this.$WebSDK('win.regEvent', 'MouseEnter', () => {
        this.clearDelay()
        this._mouseenter = true
      }, this)
      this.$WebSDK('win.regEvent', 'MouseLeave', () => {
        this._mouseenter = false
        this.delayHide()
      }, this)
      this.$WebSDK('win.regEvent', 'ActiveWindow', (param) => {
        if(param === 0) {
          this._mouseenter = false
          this.delayHide()  
        }
        else {
          this.clearDelay()
          this._mouseenter = true
        }
      }, this)

      document.body.oncontextmenu = (e) => {
        return false
      }
      this.$WebSDK('win.setResizeBorderWidth', 0)
      this.$WebSDK('win.needAlwaysFront', true)
    },
    onPopupClick (event, name) {
      let obj = {}
      obj['path'] = this.path
      obj['param'] = this.param
      obj['hash'] = this.hash
      obj['name'] = name
      this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.APP_PopupMenuClick, JSON.stringify(obj))
      this.$WebSDK('win.hide')
    },
    clearDelay () {
      if (this._timeId !== undefined && this._timeId > 0) {
        clearTimeout(this._timeId)
      }
    },
    delayHide() {
      this._timeId = setTimeout(() => {
          if(!this._mouseenter) {
            this.$WebSDK('win.hide')
          }
        }, 500)
    }
  },
  computed: {
    menuname_I18n() {
        return function(name) {
          return this.$t(name)
        }
      }
  }
}
</script>

<style lang='scss' scoped>
.app-menu
{
  overflow: hidden;
}
.dropdown-menu{
  position: absolute;
  display: block;
  border-radius: 4px;
  top: 0;
  background: rgb(250, 255, 255);
  margin: 0;
  left: 0;
  z-index: 1000;
  padding: 5px 2px 5px 2px;
  font-size: 12px;
  text-align: left;
  list-style: none;
  border: 1px solid rgb(198, 208, 218);
  li{
      list-style-type: none;
      box-sizing: border-box;
      width: 100%;
      height: 28px;
      line-height: 28px;
      padding-left: 20px;
      padding-right: 20px;
      margin: 0;
      font-weight: normal;
      white-space: nowrap;
      color: rgb(0, 0, 0);
      cursor: default;
    &:hover{
      background-color: rgb(205, 214, 226);
    }
  }
  .borderline{
    border-bottom: 1px solid rgb(212, 216, 221);
  }
}
</style>
