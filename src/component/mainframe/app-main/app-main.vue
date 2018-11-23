<template>
  <div class="app-main">
    
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
$height: 250px;
$color: rgb(140, 140, 148);
.app-main {
    position: relative;
    background: $color;
    background-size: cover;
    border-bottom: 1px solid $border-color-module;
    margin: auto;
    width: 100%;
    flex: 1 1 $height;
  }
</style>
