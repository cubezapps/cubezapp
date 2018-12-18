<template>
    <li :style="{ 'background-color': colorVal }"><input type="button" class="btnimg" :style="{ 'background-image':'url(' + getImgPath + ')' }" @click="onClick($event)" v-tooltip="tips" /></li> 
</template>

<script>
import img0 from './img/img0.png'
import img1 from './img/img1.png'
import img2 from './img/img2.png'
import img3 from './img/img3.png'
import img4 from './img/img4.png'
export default {
  props: {
    'id': {
        type: Number,
        required: true
    }
  },
  data () {
    return {
      img0: img0,
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
      isClick: false
    }
  },
  mounted() {
    this.$VueBus.$on('onBtnClick', (val) => {
        if(this.id != val.id) {
            console.log(this.id)
            this.isClick = false
            console.log(this.isClick)
        }
    })
  },
  computed: {
      colorVal() {
          if(this.isClick) {
            return 'yellow'
          }   
          else {
            return 'initial'
          }  
      },
      getImgPath() {
          let tmp = ''
          switch(this.id)  {
            case 0:
              tmp = img0
              break
            case 1:
              tmp = img1
              break
            case 2:
              tmp = img2
              break
            case 3:
              tmp = img3
              break
            case 4:
              tmp = img4
              break
          }
          return tmp
      },
      tips() {
        let tmp = ''
        switch(this.id)  {
            case 0:
              tmp = 'img0'
              break
            case 1:
              tmp = 'img1'
              break
            case 2:
              tmp = 'img2'
              break
            case 3:
              tmp = 'img3'
              break
            case 4:
              tmp = 'img4'
              break
          }
        return tmp
      }
  },
  methods: {
    onClick(event) {
      this.$VueBus.$emit('onBtnClick', { id: this.id })
      //console.log(event.target.parentElement.parentElement)
      this.isClick = true
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
li {
    margin: 0px;
    float: left;
    width: 62px;
    height: 100%;
    //background: blue;
    //&:active, &:focus{
    //  background-color: blue;
    //}
}
.btnimg {
    border: none;
    width: 42px;
    height: 40px;
    margin: 0;
    background: center no-repeat;
    background-size: 30px 30px;
    cursor: pointer;
    outline: none;
    &:hover {
      filter: drop-shadow(0 0 0.5rem rgb(2, 145, 223));
    }
  }
</style>
