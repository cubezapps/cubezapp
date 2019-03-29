<template>
    <div class="clipboard-backpanel">
        <div class="clipboard-notice" ref="noticeTag">
          <p class="notice">{{text1}} <span :style="{ 'color': 'red' }">Ctrl+v</span></p>
          <p class="notice">{{text2}} <span :style="{ 'color': 'red' }">Ctrl+~</span> {{text3}}</p>
        </div>
        <div class="memoDiv">
           <textarea class="memo" ref="memoTag" spellcheck="false" readonly="true" >qweqwewq</textarea>
        </div>
    </div> 
</template>

<script>
export default {
  props: {
    
  },
  data () {
    return {
      text1: 'When you need to press ',
      text2: "Try",
      text3: " instead",
      clearFlag : 0
    }
  },
  mounted() {
    this.$refs.memoTag.value = ''
    window.connectSignal(window.Native.Common.ClipBoard.onClipBoardChanged, (list) => {
           this.clearFlag++
           if(this.clearFlag % 50 == 0) {
             this.$refs.memoTag.value = ''
           }
           if(list.length > 0) {
              this.$refs.memoTag.scrollTop = 0
              this.addMemo(list[0])
           }
      });
  },
  computed: {
      
  },
  methods: {
      addMemo(clipdata) {
          let text = ''
          if(clipdata.type === 1) {
            //text
            text = '【CopyText】'
            text += clipdata.text
          }
          else if(clipdata.type === 2) {
            //HBITMAP
            text = '【CopyMemory】'
            text += 'Image'
          }
          else if(clipdata.type === 15) {
            //copy files
            text = '【CopyFiles】'
            for(let i = 0; i < clipdata.files.length; i++) {
                text += clipdata.files[i]
                if(i < clipdata.files.length - 1)
                  text += '\n'
            }
          }
          text += '\n'
          this.$refs.memoTag.value = text + this.$refs.memoTag.value
      }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  .clipboard-backpanel {
    flex: 1 1 auto;
    background-color: beige;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  .notice {
      font-size: 14px;
      margin: 5px;
  }
  .memoDiv {
    flex: 1 1 auto;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  .memo {
    flex: 1 1 auto;
    overflow:auto;
    resize: none;
    margin: 1px;
    border: solid 1px rgb(143, 171, 218);
    font-size: 14px;
    white-space: normal;
    word-break: break-all;
  }
</style>
