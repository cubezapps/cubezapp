<template>
    <div class="clipboard-backpanel">
        <div class="clipboard-notice" ref="noticeTag">
          <p class="notice">{{text1}} <span :style="{ 'color': 'red' }">Ctrl+v</span></p>
          <p class="notice">{{text2}} <span :style="{ 'color': 'red' }">Ctrl+~</span> {{text3}}</p>
        </div>
    </div> 
</template>

<script>
export default {
  props: {
    
  },
  data () {
    return {
      text1: 'When you need to press ',
      text2: "Try",
      text3: " instead"
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
  .clipboard-backpanel {
    flex: 1 1 auto;
    background-color: beige;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  .notice {
      font-size: 14px;
  }
</style>
