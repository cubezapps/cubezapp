<template>
    <div class="backpanel">
        <div class="item">{{tittle1}}</div>
        <div class="item">{{tittle2}}</div>
        <div class="item">{{tittle3}}</div>
    </div> 
</template>

<script>
export default {
  props: {
    
  },
  data () {
    return {
      tittle1: 'dddd',
      tittle2: '2dddddd',
      tittle3: 'ddddddddff'
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
  $itemheigh: 28px;
  .backpanel {
    flex: 1 1 auto;
    //background-color: beige;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  .item {
    flex: 0 0 $itemheigh;
    height: $itemheigh;
    padding-left: 8px;
    text-align: left;
    line-height: $itemheigh;
    border-bottom: 1px solid rgb(230, 230, 230);
    user-select: none;
    cursor: default;
    &:hover{
      background-color: rgb(230, 230, 230);
    }
  }
</style>
