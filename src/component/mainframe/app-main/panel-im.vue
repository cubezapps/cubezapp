<template>
    <div class="backpanel">
      <div class="item" ref="friendItem" @click="onClick($event)">{{this.$t('Friend')}}</div>
      <friendtag ref="friendTag" :tagdata="friendData"></friendtag>
    </div> 
</template>

<script>
import friendtag from './friend-tag.vue'
export default {
  components: {
    friendtag
  },
  props: {
    
  }, 
  data () {
    return {
      friendData: {}
    }
  },
  mounted() {
    let friendItemObj = {}
    friendItemObj['name'] = "Administrator"
    friendItemObj['ip'] = "192.168.1.1"
    friendItemObj['mac'] = "Administrator"
    this.friendData['items'] = []
    this.friendData['items'].push(friendItemObj)
    //let friendItemMenu = []
    //friendItemMenu.push('SendMessage')
    //friendItemMenu.push('Send File')
    this.friendData['menus'] = []
    console.log(this.friendData)
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
    //background-color: beige;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  $itemheigh: 28px;
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
