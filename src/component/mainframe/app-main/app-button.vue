<template>
    <li :style="{ 'background-color': colorVal }"><input type="button" class="btnimg" :style="imgstyle" @click="onClick($event)" v-tooltip="tips" /></li> 
</template>

<script>
export default {
  props: {
    'id': {
        type: Number,
        required: true
    },
    'tips': {
        type: String,
        required: false
    },
    'imgstyle': {
       type: Object,
       required: false
    },
    'isClick': {
       type: Boolean,
       required: false
    }
  },
  data () {
    return {
      
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
