<template>
  <div class="app-topbar">
    <div class="app-topbar-logo">
      <img class="logo-image" v-bind:src="logoImage" alt="">
      <label class="logo-link">A Box</label>
    </div>
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
import logoImage from './img/logo.png'
export default {
  data () {
    return {
        logoImage: logoImage
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
      let areaTop = [0, 0, document.body.offsetWidth - buttonsAreaWidth,  50]
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

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
$border-color-module: rgb(0, 137, 227);
//$back-color: linear-gradient(to right, rgb(1, 132, 223), rgb(0, 149, 229));
$height: 50px;
$logowidth: 110px;
$buttonswidth: 80px;
.app-topbar {
    position: relative;
    //background: $back-color;
    //background-size: cover;
    //border-bottom: 1px solid $border-color-module;
    user-select: none;
    margin: auto;
    width: 100%;
    flex: 0 0 $height;
    display: -webkit-flex;
    display: flex;
  }
.app-topbar-logo {
      position: relative;
      //background-color: rgb(146, 159, 168);
      margin: 0px;
      flex: 0 0 $logowidth;
      display: -webkit-flex;
      display: flex;

      img {
        border: 0px solid #ddd;
        border-radius: 4px;
        padding: 0px;
      }
      img:hover {
        box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
      }
      .logo-image {
          width: 36px;
          height: 36px;
          margin: 7px 0px 7px 15px;
      }
      .logo-link { 
          margin: 16px 5px 0px 5px;
          color: rgb(252, 254, 255);
          font-size: 12px;
      }
   }
.app-topbar-space {
      //background-color:$back-color;
      flex: 1 1 auto;
   }
.app-topbar-buttons {
     // background-color: $back-color;
      flex: 0 0 $buttonswidth;
      width: $buttonswidth;
      ul {
        width: $buttonswidth;
        margin: 0;
        padding: 0;
          li {
            margin-right: 10px;
            margin-top: 15px;
            margin-bottom: 5px;
            float: right;
            width: 14px;
            height: 14px;
          }
      }
   }

  .window-setting-btn {
    border: none;
    width: 14px;
    height: 14px;
    margin: 0;
    background: url(./img/settting.png) 50% 50% no-repeat;
    cursor: pointer;
    outline: none;
    &:hover {
      filter: brightness(2);
    }
    &:active {
      filter: brightness(1);
    }
  }
  .window-min-btn {
    border: none;
    width: 14px;
    height: 14px;
    margin: 0;
    background: url(./img/window_min.png) 50% 50% no-repeat;
    cursor: pointer;
    outline: none;
    &:hover {
      filter: brightness(2);
    }
    &:active {
      filter: brightness(1);
    }
  }
  .window-close-btn {
    border: none;
    width: 14px;
    height: 14px;
    margin: 0;
    background: url(./img/window_close.png) 50% 50% no-repeat;
    cursor: pointer;
    outline: none;
    &:hover {
      filter: brightness(2);
    }
    &:active {
      filter: brightness(1);
    }
  }
</style>
