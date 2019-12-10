<template>
    <div class="clipboard-backpanel">
        <div class="clipboard-notice" ref="noticeTag">
          <p class="notice" :style="{'color': 'gray'}">{{$t('When need to press ')}} <span :style="{ 'color': 'deeppink' }">Ctrl + v</span></p>
          <p class="notice" :style="{'color': 'gray'}">{{$t("Try")}} <span :style="{ 'color': 'deeppink' }">Ctrl + Alt + v</span> {{$t(" instead")}}</p>
        </div>
        <div class="memoDiv">
           <textarea class="memo" ref="memoTag" spellcheck="false"></textarea>
        </div>
    </div> 
</template>

<script>
export default {
  props: {
    
  },
  data () {
    return {
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
            text = this.$t('【CopyText】')
            text += clipdata.text
          }
          else if(clipdata.type === 2) {
            //HBITMAP
            text = this.$t('【CopyImage】')
            text += 'Bitmap'
          }
          else if(clipdata.type === 15) {
            //copy files
            text = this.$t('【CopyFiles】')
            for(let i = 0; i < clipdata.files.length; i++) {
                text += clipdata.files[i]
                if(i < clipdata.files.length - 1)
                  text += '\r\n'
            }
          }
          text += '\r\n'
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
    font-size: 12px;
    font-family: "Microsoft YaHei";
    //color: #2b2b2b;
    white-space: normal;
    word-break: break-all;
  }
</style>
