<template>
    <div class="shortcutitem-backpanel">
        <input type="button" :style="{ 'background-image': getIconUrl }" class="btnimg" ref="buttonItem" @click="onClick($event)" @contextmenu="onPopupMenu($event)"/>
        <textarea class="txt" ref="textItem" spellcheck="false" :value="item.name" readonly="true" @change="onChange($event)" @blur="onBlur($event)"/>
    </div> 
</template>

<script>

export default {
  props: {
    'id': {
        type: String,
        required: true
    },
    'item': {
        type: Object,
        required: true
    },
    'menus': {
       type: Array,
       required: false
    },
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
           if(this.item.hash == obj.hash) {
             console.log('onclickpopup: ' + data)
             if(obj.name == 'Open') {
               this.$WebSDK('common.executeFile', obj.path)
             }
             else if(obj.name =='Open Path...') {
               this.$WebSDK('common.openFolder', obj.path, true)
             }
             else if(obj.name == 'Rename') {
                this.$refs.textItem.removeAttribute('readonly')
                this.$refs.textItem.select()
                this.$refs.textItem.focus()
             }
             else if(obj.name == 'Delete') {
               this.$VueBus.$emit('onDeleteItem', this.id, obj)
             }
             else if(obj.name == 'Clear All') {
               this.$VueBus.$emit('onClearAll', this.id)
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
        let tmpUrl = `url(http://localhost/local/res/${this.item.hash}.ico)`
        //console.log(tmpUrl)
        return tmpUrl
      }
  },
  methods: {
    onPopupMenu(event) {
      let obj = {}
      obj.x = event.screenX
      obj.y = event.screenY
      obj.hash = this.item.hash
      obj.menus = this.menus
      obj.path = this.item.path
      this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.APP_PopupMenu, JSON.stringify(obj))
    },
    onClick(event) {
      this.$WebSDK('common.executeFile', this.item.path)
    },
    onChange(event) {
      this.$refs.textItem.setAttribute('readonly', true)
      this.item.name = this.$refs.textItem.value
      this.$VueBus.$emit('onSaveAll', this.id)
    },
    onBlur(event) {
      this.$refs.textItem.setAttribute('readonly', true)
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  $width: 77px;
  $height: 74px;
  .shortcutitem-backpanel {
    flex: 0 0 $width;
    width: $width;
    height: $height;
    //background-color: red;
    margin: 1px;
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
    -webkit-user-select: none;
    cursor: default;
  }
</style>
