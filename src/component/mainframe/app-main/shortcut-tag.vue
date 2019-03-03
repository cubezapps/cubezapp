<template>
    <div ref="shortcutTag" :key="key" class="backpanel" v-drag-and-drop:options="options">
        <shortcutitem v-for="item of tagdata.items" :key="item.hash" :id="tagdata.id" :item="item" :menus="tagdata.menus"></shortcutitem>
    </div> 
</template>

<script>
import shortcutitem from './shortcut-item.vue'

export default {
  components: {
    shortcutitem
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
     options: {
        // dropzoneSelector: 'ul',
        // draggableSelector: 'li',
        // showDropzoneAreas: true,
        // multipleDropzonesItemsDraggingEnabled: true,
        // onDrop(event) {
        //   console.log(event);
        // },
        // onDragstart(event) {
        //   event.stop();
        // },
        onDragend(event) {
          // if you need to stop d&d
          // event.stop();

          // you can call component methods, just don't forget 
          // that here `this` will not reference component scope,
          // so out from this returned data object make reference
          // to component instance
          componentInstance.someDummyMethod();

          // to detect if draggable element is dropped out
          if (!event.droptarget) {
            console.log('event is dropped out');
          }
        }
      }
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
        this.key = this.key + 1
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
    flex: 0 1 auto;
    background-color: beige;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    overflow: auto;
  }
</style>
