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
$logowidth: 50px;
$buttonswidth: 100px;
.app-topbar {
    position: relative;
    background: #141822;
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
      background-color:#b0e0e6;
      margin: 0px;
      flex: 0 0 $logowidth
      /*display: inline-block;*/
   }
.app-topbar-space {
      background-color:#FFFFFF;
      flex: 1 1 auto;
   }
.app-topbar-buttons {
      background-color: green;
      flex: 0 0 $buttonswidth;
   }
</style>
