<template>
    <div class="frienditem-backpanel motion-class" id="backpanelId" ref="friendItem" @dblclick="onDoubleClick($event)">
        <div class="name-div" ref="nameDivItem">
          <img class="avatar" v-if="index > 0" width="15" height="15" :src="item.isonline ? greenImg : redImg" />
          <img class="avatar" v-if="item.ismyself && index > 0" width="15" height="15" :src="houseImg" />
          <div class="text" ref="textRef" id="textId">{{ this.$t(item.name) }}</div>
        </div>
        <div class="ip-div" ref="ipDivItem">{{this.$t(item.ip)}}</div>
        <div class="mac-div" ref="macDivItem">{{this.$t(item.mac)}}</div>
    </div> 
    
</template>

<script>

export default {
  props: {
    'item': {
        type: Object,
        required: true
    },
    'index': {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      redImg: 'asserts/red.png',
      greenImg: 'asserts/green.png',
      houseImg: 'asserts/house.png'
    }
  },
  mounted() {
    if(this.index == 0) {
       this.$refs.friendItem.classList.remove("motion-class")
    }
  },
  computed: {

  },
  methods: {
    onDoubleClick(event) {
      if(this.index != 0) {
        this.$VueBus.$emit('onFriendItemDbClick', this.item)
      }
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  $height: 28px;
  .frienditem-backpanel {
    flex: 0 0 $height;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-bottom: 1px solid rgb(245, 245, 220);
    user-select: none;
  }
  $color: rgb(181, 209, 224);
  .motion-class:hover div{
    background-color: $color;
  }
  .name-div {
    width: 32%;
    background-color: rgb(236, 236, 214);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0px 2px;
    line-height: $height;
  }
  .ip-div {
    width: 30%;
    background-color: rgb(230, 230, 211);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: $height;
  }
  .mac-div {
    width: 38%;
    background-color: rgb(223, 223, 204);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: $height;
  }
  .avatar {
      float: left;
      margin-right: 2px;
      border-radius: 3px;
      margin-top: 6px;
      margin-bottom: auto;
  }
  .text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
