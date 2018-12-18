<template>
  <div class="app-main">
     <div class="main-buttons">
       <ul ref="ulpanel"> 
         <appbutton :id="0"></appbutton>
         <appbutton :id="1"></appbutton>
         <appbutton :id="2"></appbutton>
         <appbutton :id="3"></appbutton>
         <appbutton :id="4"></appbutton>
       </ul>
     </div>
     <div class="main-panels"></div>
  </div>
</template>

<script>
import appbutton from './app-button.vue'

export default {
  components: {
    appbutton
  },
  data () {
    return {

    }
  },
  mounted() {
    
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
//$border-color-module: red;
$height: 250px;
$back-color: linear-gradient(to bottom, rgb(255, 255, 255), rgb(180, 209, 224));
.app-main {
    position: relative;
    background: $back-color;
    background-size: cover;
    //border-bottom: 1px solid $border-color-module;
    margin: auto;
    width: 100%;
    flex: 1 1 $height;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
$buttonsHeight: 40px;
.main-buttons {
    flex: 0 0 $buttonsHeight;
    border-bottom: 1px solid rgb(230, 230, 230);

    ul {
      width: 100%;
      margin: 0;
      padding: 0;
      margin: 0;
    }
}
.main-panels {
    flex: 1 1 auto;
}
</style>
