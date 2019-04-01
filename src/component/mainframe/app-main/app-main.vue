<template>
  <div class="app-main">
     <div class="main-buttons">
       <ul ref="ulpanel"> 
         <appbutton v-for="item of btnItems" :key="item.id" :id="item.id" :tips="item_i18n(item.tips)" :imgstyle="item.imgstyle" :isClick="item.isClick"></appbutton>
       </ul>
     </div>
     <div ref="mainPanelsRef" class="main-panels">
         <shortcutpanel v-show="curId == 0"></shortcutpanel>
         <clipboardpanel v-show="curId == 1"></clipboardpanel>
         <hashpanel v-show="curId == 2"></hashpanel>
         <impanel v-show="curId == 3"></impanel>
     </div>
  </div>
</template>

<script>
import appbutton from './app-button.vue'
import img0 from './img/img0.png'
import img1 from './img/img1.png'
import img2 from './img/img2.png'
import img3 from './img/img3.png'
import img4 from './img/img4.png'
import shortcutpanel from './panel-shortcut.vue'
import clipboardpanel from './panel-clipboard.vue'
import hashpanel from './panel-hash.vue'
import impanel from './panel-im.vue'
import i18n from '@/i18n'

export default {
  components: {
    appbutton,
    shortcutpanel,
    clipboardpanel,
    hashpanel,
    impanel
  },
  data () {
    return {
        img0: img0,
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
        btnItems: [],
        curId: 0
    }
  },
  watch: {
      'btnItems'(val, old) {
         
      }
  },
  mounted() {
      this.$store.dispatch('global/setCurrentTableId', { id: this.curId }) 
      this.btnItems.push({
        'id': 0,
        'tips': 'shortcut',
        'imgstyle': {'background-image':`url(${this.img0})`},
        'isClick': true
      })
      this.btnItems.push({
        'id': 1,
        'tips': 'clipboard',
        'imgstyle': {'background-image':`url(${this.img1})`},
        'isClick': false
      })
      this.btnItems.push({
        'id': 2,
        'tips': 'hash',
        'imgstyle': {'background-image':`url(${this.img2})`},
        'isClick': false
      })
      this.btnItems.push({
        'id': 3,
        'tips': 'flying pigeon',
        'imgstyle': {'background-image':`url(${this.img3})`},
        'isClick': false
      })
      this.btnItems.push({
        'id': 4,
        'tips': 'developing',
        'imgstyle': {'background-image':`url(${this.img4})`},
        'isClick': false
      })
      this.$VueBus.$on('onBtnClick', (val) => {
        if(this.curId != val.id) {
          this.btnItems[this.curId].isClick = false
          this.btnItems[val.id].isClick = true
          this.curId = val.id
          this.$store.dispatch('global/setCurrentTableId', { id: this.curId }) 
        }
      })
  },
  computed: {
      item_i18n(tip) {
        return function(tip) {
          return this.$t(tip)
        }
      }
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
    height: $buttonsHeight;
    border-bottom: 1px solid rgb(230, 230, 230);
    ul {
      height: $buttonsHeight;
      margin: 0;
      padding: 0;
    }
}
.main-panels {
    flex: 1 1 auto;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
}
</style>
