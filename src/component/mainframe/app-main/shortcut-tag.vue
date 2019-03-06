<template>
    <draggable ref="shortcutTag" :key="key" class="shortcuttag-backpanel" :list="tagdata.items" :disabled="!enabled" ghost-class="ghost" @start="dragging=true" @end="dragging=false">
        <shortcutitem v-for="(item, index) of tagdata.items" :key="index" :id="tagdata.id" :item="item" :menus="tagdata.menus"></shortcutitem>
    </draggable> 
</template>

<script>
import shortcutitem from './shortcut-item.vue'
import draggable from 'vuedraggable'

export default {
  components: {
    shortcutitem,
    draggable
  },
  props: {
   'tagdata': {
        type: Object,
        required: true
    }
  },
  data () {
    return {
     key: 9000,
     enabled: true,
     dragging: false
     }
  },
  mounted() {
    this.$VueBus.$on('onRefresh', (id) => {
      this.refresh(id)
    })
  },
  computed: {
  
  },
  methods: {
    refresh(id) {
      if(this.tagdata.id == id) {
        console.log('refresh tagdata: ' + JSON.stringify(this.tagdata))
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  .shortcuttag-backpanel {
    flex: 1 1 auto;
    background-color: beige;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
  }
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
