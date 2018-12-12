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
       this.$WebSDK('sdk.openWindow', '/about', 'aboutframe', 'resizable:0,forbidsystemclose:1，titlebar:0,topmost:0,taskbaricon:0,windowvisible:0,guardapp:0')
    }
  }
}
</script>

<style lang='scss' scoped>
$border-color-module: rgb(0, 137, 227);
$height: 70px;
$back-color: linear-gradient(to bottom, rgb(2, 137, 240), rgb(2, 145, 223));
.app-bottombar {
    position: relative;
    //background: $back-color;
    //background-size: cover;
    //border-bottom: 1px solid $border-color-module;
    margin: auto;
    width: 100%;
    flex: 0 0 $height;
  }
</style>
