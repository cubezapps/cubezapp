<template>
  <div class="app-bottombar">
     <vue-particles class="particles" color="#dedede" :moveSpeed="2" :particleSize="3" shapeType="circle" :particlesNumber="80"></vue-particles>
     <label class="tips" ref="tipsRef" v-if="showTips">{{$t('Tips: Press F4')}}</label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showTips: true
    }
  },
   methods: {

  },
  mounted () {
    let showTipsCount = 0
    let val = localStorage.getItem('showTipsCount')
    if(val != undefined && val !=null) {
      showTipsCount = val
    }
    if(showTipsCount <= 5) {
      this.showTips = true
      setTimeout(() => {
      this.showTips = false
      showTipsCount++
      localStorage.setItem('showTipsCount', showTipsCount)
    }, 30000)
    }
    else {
      this.showTips = false
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
    .particles {
      width: 100%;
      height: $height - 3;
    }
    .tips  {
      float: left;
      text-align: left;
      color: rgb(207, 204, 204);
      margin-left: 3px;
    }
  }
</style>
