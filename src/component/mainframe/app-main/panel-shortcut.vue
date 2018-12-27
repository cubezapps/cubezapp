<template>
    <div class="backpanel">
        <div class="item" ref="commonItem" @click="onClick($event)">{{commonTittle}}</div>
        <div class="item" ref="systemItem" @click="onClick($event)">{{systemTittle}}</div>
        <div class="item" ref="desktopItem" @click="onClick($event)">{{desktopTittle}}</div>
    </div> 
</template>

<script>
import CreateShortcut from './createshortcut.js'
import SparkMd5 from 'spark-md5'

export default {
  props: {
    
  },
  data () {
    return {
      commonTittle: 'Common',
      systemTittle: 'System',
      desktopTittle: 'Desktop',
      commonData: {},
      systemData: {},
      desktopData: {}
    }
  },
  mounted() {
      let obj = {}
      this.commonData['items'] = []
      obj['name'] = 'C:\\Program Files (x86)\\Tencent\\QQ\\Bin\\QQ.exe'
      obj['hash'] = SparkMd5.hash(obj['name'].toLowerCase())
      obj['display'] = 'QQ'
      this.commonData['items'].push(obj)
      
      this.commonTag = CreateShortcut(this.commonData)
      this.commonTag.$el.style.display = 'none'
      this.$refs.commonItem.parentNode.insertBefore(this.commonTag.$el, this.$refs.commonItem.nextSibling)
      this.systemTag = CreateShortcut(this.commonData)
      this.systemTag.$el.style.display = 'none'
      this.$refs.systemItem.parentNode.insertBefore(this.systemTag.$el, this.$refs.systemItem.nextSibling)
      this.desktopTag = CreateShortcut(this.commonData)
      this.desktopTag.$el.style.display = 'none'
      this.$refs.desktopItem.parentNode.insertBefore(this.desktopTag.$el, this.$refs.desktopItem.nextSibling)
  },
  computed: {
      
  },
  methods: {
    onClick(event) {
      console.log(event.target)
      if(event.target == this.$refs.commonItem) {
          if(this.commonTag.$el.style.display == 'none') {
            this.commonTag.$el.style.display = 'flex'
            this.systemTag.$el.style.display = 'none'
            this.desktopTag.$el.style.display = 'none'
          }
          else {
            this.commonTag.$el.style.display = 'none'
          }
      } 
      else if(event.target == this.$refs.systemItem) {
          if(this.systemTag.$el.style.display == 'none') {
            this.commonTag.$el.style.display = 'none'
            this.systemTag.$el.style.display = 'flex'
            this.desktopTag.$el.style.display = 'none'
          }
          else {
            this.systemTag.$el.style.display = 'none'
          }
      }
      else if(event.target == this.$refs.desktopItem) {
          if(this.desktopTag.$el.style.display == 'none') {
            this.commonTag.$el.style.display = 'none'
            this.systemTag.$el.style.display = 'none'
            this.desktopTag.$el.style.display = 'flex'
          }
          else {
            this.desktopTag.$el.style.display = 'none'
          }
      }
    }
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
