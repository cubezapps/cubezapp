<template>
    <li :style="{ 'background-color': colorVal }"><input type="button" class="btnimg" :style="imgstyle" @click="onClick($event)" v-tooltip.bottom="tips" /></li> 
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

  },
  computed: {
      colorVal() {
          if(this.isClick) {
            return 'rgb(237, 237, 237)'
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
    cursor: default;
    outline: none;
    &:hover {
      filter: drop-shadow(0 0 0.5rem rgb(2, 145, 223));
    }
  }
</style>
