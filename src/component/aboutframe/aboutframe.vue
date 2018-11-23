<template>
  <div class="app-about">
    <div class="app-about-title">关于</div>
    <div class="app-about-close" @click.stop = "closeWindow"></div>
    <div class="app-about-copyright">版权所有 @2005-2017 YY.com, All Rights Reserved. 欢聚时代 版权所有</div>
    <div class="app-about-protocol">服务协议</div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.$WebSDK('win.resize', 500, 350)
    this.$WebSDK('win.move', 4)
    this.setCaptionArea()
    this.$WebSDK('win.show')
  },
  methods: {
    closeWindow () {
      window.close()
    },
    setCaptionArea () {
      const w = 500 - 35
      this.$WebSDK('win.setDragArea', [[0, 0, w, 50]])
    }
  }
}
</script>

<style lang='scss' scoped>
.app-about{
  position: relative;
  width: 500px;
  margin: 0;
  height: 350px;
  background: #282b30;
  border-radius: 0px;
  &-close{
    border: none;
    width: 12px;
    height: 12px;
    margin: 0;
    background: url('./src/imgs/close-bt.png');
    background-position: 0px -72px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 9;
  }
  &-protocol{
    text-align: center;
    position: absolute;
    left: 75px;
    right: 75px;
    bottom: 20px;
    color: #f29400;
    cursor: pointer;
    font-size: 12px;
    font-weight: normal;
  }
  &-copyright{
    text-align: center;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 41px;
    color: #a0a2a4;
    font-size: 12px;
    font-weight: normal;
    display: inline-block;
    max-width: 100%;
  }
  &-title{
    color: #ebebeb;
    position: absolute;
    left: 15px;
    top: 15px;
    font-weight: bold;
    font-size: 14px;
  }
}
</style>
