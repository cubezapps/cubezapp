<template>
  <div class="app-topbar">
    <div class="app-topbar-logo"></div>
    <div class="app-topbar-space"></div>
    <div class="app-topbar-buttons" ref="buttonsArea">
      <ul> 
        <li><input type="button" @click="onCloseBtnClick()" class="window-close-btn" v-tooltip="'Close'"/></li> 
        <li><input type="button" @click="onMinBtnClick()" class="window-min-btn" v-tooltip="'Minimize'"/></li>
        <li><input type="button" @click="onSettingBtnClick()" class="window-setting-btn" v-tooltip="'Setting'"/></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
      this.init()
  },
  methods: {
    init() {
      window.onresize = () => {
        this.resetCaptionArea()
      }
      this.resetCaptionArea()
    },
    resetCaptionArea () {
      let buttonsAreaWidth = this.$refs.buttonsArea.offsetWidth
      let areaTop = [0, 0, document.body.offsetWidth - buttonsAreaWidth,  30]
      this.$WebSDK('win.setDragArea', [areaTop])
    },
    onCloseBtnClick () {
      this.$WebSDK('win.minimize')
      this.$WebSDK('win.hide')
    },
    onMinBtnClick () {
      this.$WebSDK('win.minimize')
    },
    onSettingBtnClick() {
      this.$WebSDK('sdk.openWindow', '/setting', 'settingframe', 'resizable:0,forbidsystemclose:1,titlebar:0,topmost:0,taskbaricon:0,windowvisible:0,offscreenrendering:1,guardapp:0')
    }
  }
}
</script>

<style lang='scss' scoped>
$border-color-module: rgb(0, 137, 227);
$back-color: linear-gradient(to right, rgb(1, 132, 223), rgb(0, 149, 229));
$height: 30px;
$logowidth: 50px;
$buttonswidth: 80px;
.app-topbar {
    position: relative;
    background: $back-color;
    background-size: cover;
    border-bottom: 1px solid $border-color-module;
    user-select: none;
    margin: auto;
    width: 100%;
    flex: 0 0 $height;
    display: -webkit-flex;
    display: flex;
  }
.app-topbar-logo {
      position: relative;
      //background-color:$back-color;
      margin: 0px;
      flex: 0 0 $logowidth
   }
.app-topbar-space {
      //background-color:$back-color;
      flex: 1 1 auto;
   }
.app-topbar-buttons {
     // background-color: $back-color;
      flex: 0 0 $buttonswidth;
   }

  .window-setting-btn {
    border: none;
    width: 14px;
    height: 14px;
    margin: 0;
    background: url(./img/settting.png) 50% 50% no-repeat;
    cursor: pointer;
    &:hover {
      filter: brightness(2);
    }
  }
  .window-min-btn {
    border: none;
    width: 14px;
    height: 14px;
    margin: 0;
    background: url(./img/window_min.png) 50% 50% no-repeat;
    cursor: pointer;
    &:hover {
      filter: brightness(2);
    }
  }
  .window-close-btn {
    border: none;
    width: 14px;
    height: 14px;
    margin: 0;
    background: url(./img/window_close.png) 50% 50% no-repeat;
    &:hover {
      filter: brightness(2);
    }
  }
  .app-topbar-buttons {
    ul {
      width: $buttonswidth;
      margin: 0;
      padding: 0;
          li {
            margin-right: 8px;
            margin-top: 5px;
            margin-bottom: 5px;
            float: right;
            width: 14px;
            height: 14px;
          }
      }
  }
</style>
