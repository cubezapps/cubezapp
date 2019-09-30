/* eslint-disable */
<template>
    <div class="topdiv"> 
      <div class="captiondiv">
        <img class="logo-image" v-bind:src="logoImage" alt="">
        <label class="logo-link">{{tittle}}</label>
      </div>
      <div class="blankdiv"></div>
      <div class="btndiv">
        <input type="button" @click="onCloseBtnClick()" class="window-close-btn" v-tooltip="$t('Close')"/>
      </div>
    </div>
</template>

<script>
import i18n from '@/i18n'
import logoImage from './img/logo.png'
export default {
  props: {
    'tittle': {
        type: String,
        required: true
    }
  },
  data () {
    return {
        logoImage: logoImage
    }
  },
  mounted () {

  },
  methods: {
    onCloseBtnClick(event) {
       this.$WebSDK('win.hide')
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
$back-color: rgb(0, 137, 227);
.topdiv {
  width: 100%;
  position: relative;
  flex: 0 0 30px;
  background: $back-color;
  margin: 0;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
}
.captiondiv {
  flex: 0 0 150px;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .logo-image {
      width: 24px;
      height: 24px;
      margin-left: 5px;
      flex: 0 0 24px;
  }
  .logo-link { 
      margin-left: 6px;
      margin-top: auto;
      margin-bottom: auto;
      color: rgb(252, 254, 255);
      font-size: 12px;
      flex: 1 1 auto;
  }
}
.blankdiv {
  flex: 1 1 auto;
}
.btndiv {
  flex: 0 0 30px;
}
.window-close-btn {
  border: none;
  width: 30px;
  height: 30px;
  margin: 0px;
  background: url(./img/window_close.png) 50% 50% no-repeat;
  cursor: default;
  outline: none;
  &:hover {
    filter: brightness(2);
  }
  &:active {
    filter: brightness(1);
  }
}
</style>
