<template>
  <div class="app-info">
    
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
$height: 90px;
$color: #DDDCCC;
.app-info {
    position: relative;
    background: $color;
    background-size: cover;
    border-bottom: 1px solid $border-color-module;
    margin: auto;
    width: 100%;
    flex: 0 0 $height;
  }
</style>
