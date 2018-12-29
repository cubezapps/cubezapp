<template>
    <div class="backpanel">
        <input type="button" class="btnimg" @contextmenu="onPopupMenu($event)"/>
        <input class="txt" :value="$data.display" readonly="true"/>
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
    console.log(this.$data)
  },
  computed: {
      
  },
  methods: {
    onPopupMenu(event) {
      let obj = {}
      obj.x = event.screenX
      obj.y = event.screenY
      obj.id = this.$data.hash
      obj.names = []
      obj.names.push('aaaaa')
      obj.names.push('bbbbb')
      obj.names.push('evdsfd123')
      this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.APP_PopupMenu, JSON.stringify(obj))
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  $width: 77px;
  $height: 64px;
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
    background-image: url('./img/img0.png');
    cursor: default;
    outline: none;
    &:hover {
      filter: drop-shadow(0 0 0.5rem rgb(2, 145, 223));
      cursor: pointer;
    }
  }
  .txt {
    width: $width - 10px;
    border: none;
    outline: none;
    margin: none;
    text-align: center;
    background-color: inherit; 
    cursor: default;
  }
</style>
