<template>
    <div class="frienditem-backpanel">
        <div class="name-div" ref="nameDivItem">{{"1111111"}}</div>
        <div class="ip-div" ref="ipDivItem">22222</div>
        <div class="mac-div" ref="macDivItem">{{this.$t(item.mac)}}</div>
    </div> 
</template>

<script>

export default {
  props: {
    'item': {
        type: Object,
        required: true
    }
  },
  data () {
    return {
      
    }
  },
  mounted() {
   
  },
  computed: {

  },
  methods: {
    
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  $height: 60px;
  .frienditem-backpanel {
    flex: 0 0 $height;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .name-div {
    width: 100px;
    background-color: rgb(65, 65, 60)dc;
  }
  .ip-div {
    width: 160px;
    background-color: rgb(59, 59, 19);
  }
  .mac-div {
    width: 160px;
    background-color: rgb(136, 136, 11);
  }
</style>
