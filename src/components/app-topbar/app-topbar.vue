<template>
  <div class="app-topbar">
    <div class="app-topbar-logo"></div>
    <div class="app-topbar-space"></div>
    <div class="app-topbar-buttons"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang='scss' scoped>
$border-color-module: red;
$height: 30px;
$buttonswidth: 100px;
$logowidth: 80px;
.app-topbar {
    position: relative;
    height: $height;
    background: #141822;
    background-size: cover;
    border-bottom: 1px solid $border-color-module;
    user-select: none;
    margin: auto;
    display: block;
  }
.app-topbar-logo {
      position: relative;
      width: $logowidth;
      height: $height;
      background-color:#b0e0e6;
      margin: 0px;
      display: inline-block;
      float: left;
   }
.app-topbar-space {
      margin: 0px;
      width: auto;
      height: $height;
      background-color:#BBBBBB;
      display: inline-block;
   }
.app-topbar-buttons {
      margin: 0px;
      width: $buttonswidth;
      height: $height;
      background-color:#CCCCCC;
      display: inline-block;
      float: right;
   }
</style>
