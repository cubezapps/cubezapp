<template>
  <div class="app-main">
     <div class="main-buttons">
       <ul ref="ulpanel"> 
         <appbutton v-for="item of btnItems" :key="item.id" :id="item.id" :tips="item.tips" :imgstyle="item.imgstyle" :isClick="item.isClick"></appbutton>
       </ul>
     </div>
     <div ref="mainPanelsRef" class="main-panels"></div>
  </div>
</template>

<script>
import appbutton from './app-button.vue'
import img0 from './img/img0.png'
import img1 from './img/img1.png'
import img2 from './img/img2.png'
import img3 from './img/img3.png'
import img4 from './img/img4.png'
import CreateShortcutPanel from './createshortcutpanel.js'

export default {
  components: {
    appbutton
  },
  data () {
    return {
        img0: img0,
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
        btnItems: []
    }
  },
  watch: {
      'btnItems'(val, old) {
         
      }
  },
  mounted() {
      this.btnItems.push({
        'id': 0,
        'tips': 'tips0',
        'imgstyle': {'background-image':`url(${this.img0})`},
        'isClick': true
      })
      this.btnItems.push({
        'id': 1,
        'tips': 'tips1',
        'imgstyle': {'background-image':`url(${this.img1})`},
        'isClick': false
      })
      this.btnItems.push({
        'id': 2,
        'tips': 'tips22',
        'imgstyle': {'background-image':`url(${this.img2})`},
        'isClick': false
      })
      this.btnItems.push({
        'id': 3,
        'tips': 'tips333',
        'imgstyle': {'background-image':`url(${this.img3})`},
        'isClick': false
      })
      this.btnItems.push({
        'id': 4,
        'tips': 'tips44',
        'imgstyle': {'background-image':`url(${this.img4})`},
        'isClick': false
      })
      let child = CreateShortcutPanel()
      this.$refs.mainPanelsRef.appendChild(child.$el)
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
