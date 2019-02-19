<template>
    <div class="backpanel">
        <div class="item" ref="commonItem" @click="onClick($event)">{{commonTittle}}</div>
        <div class="item" ref="systemItem" @click="onClick($event)">{{systemTittle}}</div>
        <div class="item" ref="desktopItem" @click="onClick($event)">{{desktopTittle}}</div>
    </div> 
</template>

<script>
import CreateShortcut from './createshortcut.js'
import SparkMd5 from 'spark-md5'

export default {
  props: {
    
  },
  data () {
    return {
      commonTittle: 'Common',
      systemTittle: 'System',
      desktopTittle: 'Desktop',
      commonData: {},
      systemData: {},
      desktopData: {}
    }
  },
  async mounted() {
    let mainBrowser = await this.$WebSDK('sdk.cefBrowser', 0)
    window.connectSignal(mainBrowser.onDragNames, (names) => {
      let addNew = false
      for(let i = 0; i < names.length; i++) {
         let objFile = {}
         objFile['path'] = names[i]
         objFile['hash'] = SparkMd5.hash(objFile['path'].toLowerCase())
         let n = objFile['path'].lastIndexOf("\\")
         objFile['name'] = objFile['path'].substr(n + 1)
         if(!this.isExist(objFile, this.commonData['items'])) {
           this.commonData['items'].push(objFile)
           addNew = true
         } 
      }
      console.log(this.commonData)
      if(addNew) {
        this.$WebSDK('common.parseShortcutFiles', JSON.stringify(this.commonData))
        this.$VueBus.$emit('onRefresh')
        this.$WebSDK('common.setConfig', 'commonData', JSON.stringify(this.commonData['items']))
      }
    })
      this.commonData['items'] = JSON.parse(await this.$WebSDK('common.getConfig', 'commonData'))
      this.$WebSDK('common.parseShortcutFiles', JSON.stringify(this.commonData))

      let commonMenu = []
      commonMenu.push('Open')
      commonMenu.push('Open Path...')
      commonMenu.push('Rename')
      commonMenu.push('Delete')
      commonMenu.push('Clear All')
      this.commonData['menus'] = commonMenu
      this.commonData['id'] = 'commonTag'

      let notepadObj = {}
      this.systemData['items'] = []
      let systemDir = (await this.$WebSDK('common.getSystemDir')).trim()
      let n = systemDir.lastIndexOf("\\")
      let windowDir = systemDir.substr(0, n)
      notepadObj['path'] = systemDir + '\\notepad.exe'
      notepadObj['hash'] = SparkMd5.hash(notepadObj['path'].toLowerCase())
      notepadObj['name'] = 'Notepad'  
      let calcObj = {}
      calcObj['path'] = systemDir + '\\calc.exe'
      calcObj['hash'] = SparkMd5.hash(calcObj['path'].toLowerCase())
      calcObj['name'] = 'Calc'
      let paintObj = {}
      paintObj['path'] = systemDir + '\\mspaint.exe'
      paintObj['hash'] = SparkMd5.hash(paintObj['path'].toLowerCase())
      paintObj['name'] = 'Paint'
      let controlObj = {}
      controlObj['path'] = systemDir + '\\control.exe'
      controlObj['hash'] = SparkMd5.hash(controlObj['path'].toLowerCase())
      controlObj['name'] = 'Control'
      let cmdObj = {}
      cmdObj['path'] = systemDir + '\\cmd.exe'
      cmdObj['hash'] = SparkMd5.hash(cmdObj['path'].toLowerCase())
      cmdObj['name'] = 'Cmd'
      let mstscObj = {}
      mstscObj['path'] = systemDir + '\\mstsc.exe'
      mstscObj['hash'] = SparkMd5.hash(mstscObj['path'].toLowerCase())
      mstscObj['name'] = 'Remote'
      let regedtObj = {}
      regedtObj['path'] = systemDir + '\\regedt32.exe'
      regedtObj['hash'] = SparkMd5.hash(regedtObj['path'].toLowerCase())
      regedtObj['name'] = 'Regedit'
      let snippingtoolObj = {}
      snippingtoolObj['path'] = windowDir + '\\Sysnative\\snippingtool.exe'
      snippingtoolObj['hash'] = SparkMd5.hash(snippingtoolObj['path'].toLowerCase())
      snippingtoolObj['name'] = 'Shortcut'
      let soundRecorderObj = {}
      soundRecorderObj['path'] = windowDir + '\\Sysnative\\SoundRecorder.exe'
      soundRecorderObj['hash'] = SparkMd5.hash(soundRecorderObj['path'].toLowerCase())
      soundRecorderObj['name'] = 'SoundRecorder'
      let msinfo32Obj = {}
      msinfo32Obj['path'] = systemDir + '\\msinfo32.exe'
      msinfo32Obj['hash'] = SparkMd5.hash(msinfo32Obj['path'].toLowerCase())
      msinfo32Obj['name'] = 'SysInfo'

      this.systemData['items'].push(notepadObj)
      this.systemData['items'].push(calcObj)
      this.systemData['items'].push(paintObj)
      this.systemData['items'].push(controlObj)
      this.systemData['items'].push(cmdObj)
      this.systemData['items'].push(mstscObj)
      this.systemData['items'].push(regedtObj)
      this.systemData['items'].push(snippingtoolObj)
      this.systemData['items'].push(soundRecorderObj)
      this.systemData['items'].push(msinfo32Obj)
      this.systemData['menus'] = []
      this.systemData['id'] = 'systemTag'
      console.log(JSON.stringify(this.systemData))
      this.$WebSDK('common.parseShortcutFiles', JSON.stringify(this.systemData))

      let obj3 = {}
      this.desktopData['items'] = []
      obj3['path'] = 'C:\\Program Files (x86)\\duowan\\yy\\yy.exe'
      obj3['hash'] = SparkMd5.hash(obj3['path'].toLowerCase())
      obj3['name'] = 'yy'
      this.desktopData['items'].push(obj3)
      this.desktopData['menus'] = []
      this.desktopData['id'] = 'desktopTag'
      
      this.commonTag = CreateShortcut(this.commonData)
      this.commonTag.$el.style.display = 'none'
      this.$refs.commonItem.parentNode.insertBefore(this.commonTag.$el, this.$refs.commonItem.nextSibling)
      this.systemTag = CreateShortcut(this.systemData)
      this.systemTag.$el.style.display = 'none'
      this.$refs.systemItem.parentNode.insertBefore(this.systemTag.$el, this.$refs.systemItem.nextSibling)
      this.desktopTag = CreateShortcut(this.desktopData)
      this.desktopTag.$el.style.display = 'none'
      this.$refs.desktopItem.parentNode.insertBefore(this.desktopTag.$el, this.$refs.desktopItem.nextSibling)
  },
  computed: {
      
  },
  methods: {
    onClick(event) {
      console.log(event.target)
      if(event.target == this.$refs.commonItem) {
          if(this.commonTag.$el.style.display == 'none') {
            this.commonTag.$el.style.display = 'flex'
            this.systemTag.$el.style.display = 'none'
            this.desktopTag.$el.style.display = 'none'
          }
          else {
            this.commonTag.$el.style.display = 'none'
          }
      } 
      else if(event.target == this.$refs.systemItem) {
          if(this.systemTag.$el.style.display == 'none') {
            this.commonTag.$el.style.display = 'none'
            this.systemTag.$el.style.display = 'flex'
            this.desktopTag.$el.style.display = 'none'
          }
          else {
            this.systemTag.$el.style.display = 'none'
          }
      }
      else if(event.target == this.$refs.desktopItem) {
          if(this.desktopTag.$el.style.display == 'none') {
            this.commonTag.$el.style.display = 'none'
            this.systemTag.$el.style.display = 'none'
            this.desktopTag.$el.style.display = 'flex'
          }
          else {
            this.desktopTag.$el.style.display = 'none'
          }
      }
    },
    isExist(testObj, dataObj) {
      for(let i = 0; i < dataObj.length; i++) {
         if (dataObj[i]['hash'] == testObj['hash']) {
           return true
         }
      }
      return false
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  $itemheigh: 28px;
  .backpanel {
    flex: 1 1 auto;
    //background-color: beige;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
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
