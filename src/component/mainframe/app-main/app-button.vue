<template>
    <li><input type="button" class="btnimg" v-tooltip="'Quick Open'"/></li> 
</template>

<script>
export default {
  /*props: {
    'imgpath': {
      type: String,
      required: true
    },
    'tip': {
      type: String,
      required: true
    }
  },*/
  data () {
    return {

    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
li {
    margin-left: 0px;
    margin-top: 0px;
    float: left;
    width: 62px;
    height: 100%;
    background: blue;
}
.btnimg {
    border: none;
    width: 40px;
    height: 40px;
    margin: 0;
    background: url(./img/img1.png) center no-repeat;
    background-size: 30px 30px;
    cursor: pointer;
    &:hover {
      filter: brightness(2);
    }
  }
</style>
