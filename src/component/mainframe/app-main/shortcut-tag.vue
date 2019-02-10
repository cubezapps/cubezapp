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
    this.refresh()
    this.$VueBus.$on('onRefresh', () => {
      this.refresh()
    })
  },
  computed: {
      
  },
  methods: {
    refresh() {
      this.$refs.shortcutTag.innerHTML = ''
      for (let i = 0; i < this.$data.items.length; i++) {
        this.$refs.shortcutTag.appendChild(CreateShortcutItem(this.$data.items[i], this.$data.menus).$el)
      }
    }
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
