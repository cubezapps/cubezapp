<template>
  <div class="app-bottombar">
     <button v-on:click="onClick()">click</button>
     <router-link to="/about">Go to about</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
   methods: {
    onClick() {
       this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.CloseWindow_SettingFrame, '')
       this.$WebSDK('sdk.openWindow', '/about', 'aboutframe', 'resizable:0,titlebar:0,topmost:0,taskbaricon:0,windowvisible:0,guardapp:0')
    }
  }
}
</script>

<style lang='scss' scoped>
$border-color-module: red;
$height: 20px;
$color: rgb(143, 133, 133);
.app-bottombar {
    position: relative;
    background: $color;
    background-size: cover;
    border-bottom: 1px solid $border-color-module;
    margin: auto;
    width: 100%;
    flex: 0 0 $height;
  }
</style>
