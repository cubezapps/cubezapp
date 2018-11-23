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
       this.$router.push('/about')
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
