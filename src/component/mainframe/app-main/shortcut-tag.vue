<template>
    <div ref="shortcutTag" class="backpanel">

    </div> 
</template>

<script>
import CreateShortcutItem from './createshortcutitem.js'

export default {
  props: {
    
  },
  data () {
    return {
     
    }
  },
  mounted() {
    this.$refs.shortcutTag.appendChild(CreateShortcutItem(this.$data.items[0], this.$data.menus).$el)
    this.$refs.shortcutTag.appendChild(CreateShortcutItem(this.$data.items[0], this.$data.menus).$el)
    this.$refs.shortcutTag.appendChild(CreateShortcutItem(this.$data.items[0], this.$data.menus).$el)
    this.$refs.shortcutTag.appendChild(CreateShortcutItem(this.$data.items[0], this.$data.menus).$el)
    this.$refs.shortcutTag.appendChild(CreateShortcutItem(this.$data.items[0], this.$data.menus).$el)
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
  .backpanel {
    flex: 1 1 auto;
    background-color: beige;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
  }
</style>
