<template>
    <div class="backpanel">
        <input type="button" :style="{ 'background-image': getIconUrl }" class="btnimg" ref="item" @click="onClick($event)" @contextmenu="onPopupMenu($event)"/>
        <textarea class="txt" :value="$data.item.name" readonly="true"/>
    </div> 
</template>

<script>

export default {
  props: {
    
  },
  data () {
    return {

    }
  },
  mounted() {
    this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
       switch (uri) {
         case this.$DataUri.APP_PopupMenuClick: {
           let obj = JSON.parse(data)
           if(this.$data.item.hash == obj.hash) {
             console.log(data)
             if(obj.name == 'Open') {
               this.$WebSDK('common.executeFile', obj.path)
             }
             else if(obj.name =='Open Path...') {
               this.$WebSDK('common.openFolder', obj.path, true)
             }
             else if(obj.name == 'Rename') {

             }
             else if(obj.name == 'Delete') {
               this.$VueBus.$emit('onDeleteItem', this.$data.id, obj)
             }
             else if(obj.name == 'Clear All') {
               
             }
           }
           break
         }
        }
    }, this)
    //console.log("createShortcutItem:" + this.$data.item)
  },
  computed: {
      getIconUrl() {
        let tmpUrl = `url(http://localhost/local/res/${this.$data.item.hash}.ico)`
        console.log(tmpUrl)
        return tmpUrl
      }
  },
  methods: {
    onPopupMenu(event) {
      let obj = {}
      obj.x = event.screenX
      obj.y = event.screenY
      obj.hash = this.$data.item.hash
      obj.menus = this.$data.menus
      obj.path = this.$data.item.path
      this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.APP_PopupMenu, JSON.stringify(obj))
    },
    onClick(event) {
      this.$WebSDK('common.executeFile', this.$data.item.path)
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  $width: 77px;
  $height: 70px;
  .backpanel {
    flex: 0 0 $width;
    width: $width;
    height: $height;
    //background-color: red;
    margin: 0px;
    padding: 0px; 
  }
  .btnimg {
    border: none;
    width: 42px;
    height: 40px;
    margin-left: 18px;
    margin-right: 18px;
    margin-top: 0px;
    background: center no-repeat;
    background-size: 32px 32px;
    //background-image: url('./img/img0.png');
    cursor: default;
    outline: none;
    &:hover {
      filter: drop-shadow(0 0 0.5rem rgb(2, 145, 223));
      cursor: pointer;
    }
  }
  .txt {
    width: $width;
    overflow:hidden;
    resize: none;
    border: none;
    outline: none;
    margin: none;
    text-align: center;
    background-color: inherit; 
    cursor: default;
  }
</style>
