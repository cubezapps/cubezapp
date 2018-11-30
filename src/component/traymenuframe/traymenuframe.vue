<template>
  <div class="app-menu">
    <ul ref="appmenu"  class="dropdown-menu">
        <li class="about" @click.stop="showMainFrame">'Show MainFrame'</li>
        <li class="quit" @click.stop="quitClick">'Exit'</li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted () {
    this.init()
  },
  methods: {
    init () {
      //this.$WebSDK('win.setResizeBorderWidth', 0)
      this.$WebSDK('win.needTaskBar', false)
      this.$WebSDK('win.needResizable', false)
      let tmp = this.$refs.appmenu
      this.$WebSDK('win.resize', tmp.offsetWidth, tmp.offsetHeight)
      document.body.style = 'overflow: hidden'
      document.onmousemove = (e) => {
      
      }
      this.$WebSDK('ipc.addWindowEventListener', ({ uri, data }) => {
       
      }, this)
      document.addEventListener('mouseleave', (e) => {
        alert('ddddddddddddddd')
      }, false)
      document.body.oncontextmenu = (e) => {
        return false
      }
      this.$WebSDK('win.move', 4)
      this.$WebSDK('win.show')
    },
    quitClick () {
      
    }
  }
}
</script>

<style lang='scss' scoped>
.app-menu
{
  overflow: hidden;
}
.dropdown-menu{
  // width: 100%;
  border-radius: 4px;
  position: absolute;
  display: block;
  top: 0;
  background: #2d3849;
  margin: 0;
  left: 0;
  z-index: 1000;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 14px;
  text-align: left;
  list-style: none;
  border: 1px solid #17202c;
  // box-shadow: 0 2px 8px rgba(5, 12, 20, 0.2);
  li{
      list-style-type: none;
      box-sizing: border-box;
      width: 100%;
      height: 34px;
      line-height: 34px;
      padding-left: 20px;
      padding-right: 20px;
      margin: 0;
      font-weight: normal;
      white-space: nowrap;
      color: #e2e3e4;
      cursor: default;
    &:hover{
      background-color: #222e3f;
    }
  }
  .about{
    border-bottom: 1px solid #2c333c;
  }
  li:nth-child(3) {
    height: 44px;
    line-height: 44px;
    border-top: solid 1px rgba(250, 250, 250, 0.1);
  }
}
</style>
