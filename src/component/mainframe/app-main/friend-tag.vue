<template>
    <div class="friendtag-backpanel">
      <frienditem v-for="(item, index) of tagdata.items" :key="index" :index="index" :item="item" :menus="tagdata.menus"></frienditem>
    </div>
</template>

<script>
import frienditem from './friend-item.vue'

export default {
  components: {
    frienditem
  },
  props: {
    'tagdata': {
        type: Object,
        required: true
    }
  },
  data () {
    return {

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
  .friendtag-backpanel {
    flex: 1 1 auto;
    background-color: beige;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
  }
</style>
