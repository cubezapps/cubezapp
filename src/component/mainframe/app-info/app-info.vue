<template>
  <div class="app-info">
    <div class="app-topbar-left">
      <img class="left-image" v-bind:src="cubeImage" alt="">
    </div>
    <div class="app-topbar-middle"></div>
    <div class="app-topbar-right"></div>
  </div>
</template>

<script>
import cubeImage from './img/cube.png'
export default {
  data () {
    return {
        cubeImage: cubeImage
    }
  }
}
</script>

<style lang='scss' scoped>
$border-color-module: red;
$height: 50px;
$color: rgb(158, 157, 148);
.app-info {
    position: relative;
    background: $color;
    background-size: cover;
    border-bottom: 1px solid $border-color-module;
    margin: auto;
    width: 100%;
    flex: 0 0 $height;
    display: -webkit-flex;
    display: flex;
  }
$left: 50px;
$right: 50px;
.app-topbar-left {
    position: relative;
   // background-image: url(http://localhost/local/res/cube-2.ico);
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0px;
    padding: 0px;
    flex: 0 0 $left;
}
img {
  border: 0px solid #ddd;
  border-radius: 4px;
  padding: 0px;
}
img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
.left-image {
    width: 40px;
    height: 40px;
    margin: 5px 5px 5px 5px;
}
.app-topbar-middle {
    background-color:rgb(122, 106, 106);
    flex: 1 1 auto;
}
.app-topbar-right {
    background-color: rgb(101, 179, 101);
    flex: 0 0 $right;
}
</style>
