<template>
    <div class="hash-backpanel" ref="hashRef">
       <div v-if="firstFlag"><p :style="{'font-size': '14px', 'color': 'gray'}">{{$t('Drag files here to calculate Hash')}}</p></div>
       <div class="btn-item" ref="btnItem" v-for="(fileName, index) of fileList" :key="index" data-id="index" @click="onClick($event)">{{ showText(fileName)}}</div>
    </div> 
</template>

<script>
import CreateHashTag from './createhashtag.js'
export default {
  props: {
    
  },
  data () {
    return {
      fileList: [],
      fileObj: {},
      tags: [],
      firstFlag: true
    }
  },
  updated() {
    
  },
  async mounted() {
    let mainBrowser = await this.$WebSDK('sdk.cefBrowser', 0)
    //console.log(mainBrowser)
    window.connectSignal(mainBrowser.onDragNames, (r) => {
      let names = r
      if(r.length >= 12) {
        names = r.slice(0, 11)
      }
      let curId = this.$store.getters['global/curTableId'] 
      if(curId != 2)
        return
      this.firstFlag = false
      let namesStr = []
      for(var i = 0; i < names.length; i++) {
        namesStr.push(names[i].link)
      }
      this.$WebSDK('common.getCryptographyHash', namesStr).then(ret => {
        this.fileList = Object.keys(ret)
        this.fileObj = ret
        for(let i = 0; i < this.tags.length; i++) {
            this.$refs.btnItem[i].parentNode.removeChild(this.tags[i].$el)
        }
        this.$nextTick(() => {
            for(let i = 0; i < this.fileList.length; i++) {
              this.tags[i] = CreateHashTag(this.fileObj[this.fileList[i]], this.fileList[i], i)
              this.tags[i].$el.style.display = 'none'
              this.$refs.btnItem[i].parentNode.insertBefore(this.tags[i].$el, this.$refs.btnItem[i].nextSibling)
            }
            this.tags[0].$el.style.display = 'flex'
        })
      })
    })
  },
  computed: {
      showText() {
        return function(fileName) {
            let text = fileName
            if(fileName.length > 50) {
                text = fileName.substr(0, 20)
                text += "......"
                text += fileName.substr(fileName.length - 20, 20)
            }
            return text
        }
      }
  },
  methods: {
    onClick($event) {
      let unfold = -1;
      for(let i = 0; i < this.$refs.btnItem.length; i++) {
        if(event.target == this.$refs.btnItem[i]) {
            if(this.tags[i].$el.style.display == 'flex') {
              this.tags[i].$el.style.display = 'none'
            }
            else {
              this.tags[i].$el.style.display = 'flex'
              unfold = i
            }
        }
      }
      if(unfold >= 0) {
        for(let i = 0; i < this.$refs.btnItem.length; i++) {
            if(unfold != i) {
              this.tags[i].$el.style.display = 'none'
            }
        }
      }
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  $itemheigh: 28px;
  .hash-backpanel {
    flex: 1 1 auto;
    //background-color: beige;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    overflow: auto;
  }
  .btn-item {
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
