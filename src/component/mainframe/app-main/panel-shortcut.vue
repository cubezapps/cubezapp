<template>
    <div class="backpanel">
        <div class="item" ref="commonItem" @click="onClick($event)">{{this.$t('Common')}}</div>
        <shortcuttag ref="commonTag" :tagdata="commonData"></shortcuttag>
        <div class="item" ref="systemItem" @click="onClick($event)">{{this.$t('System')}}</div>
        <shortcuttag ref="systemTag" :tagdata="systemData"></shortcuttag>
        <div class="item" ref="desktopItem" @click="onClick($event)">{{this.$t('Desktop')}}</div>
        <shortcuttag ref="desktopTag" :tagdata="desktopData"></shortcuttag>
    </div> 
</template>

<script>
import SparkMd5 from 'spark-md5'
import shortcuttag from './shortcut-tag.vue'

export default {
  components: {
    shortcuttag
  },
  props: {
    
  },
  data () {
    return {
      commonData: {},
      systemData: {},
      desktopData: {}
    }
  },
  async mounted() {
    /* eslint-disable */ 
    let mainBrowser = await this.$WebSDK('sdk.cefBrowser', 0)
    //console.log(mainBrowser)
    this.$refs.commonTag.$el.style.display = 'flex'
    this.$refs.systemTag.$el.style.display = 'none'
    this.$refs.desktopTag.$el.style.display = 'none'
    window.connectSignal(mainBrowser.onDragNames, (names) => {
      let curId = this.$store.getters['global/curTableId'] 
      if(curId != 0)
        return
      if(this.$refs.commonTag.$el.style.display == 'flex')
      {
          let addNew = false
          for(let i = 0; i < names.length; i++) {
            let objFile = {}
            objFile['path'] = names[i].original
            objFile['param'] = names[i].param
            objFile['hash'] = SparkMd5.hash(objFile['path'].toLowerCase())
            objFile['name'] = names[i].linkname
            if(!this.isExist(objFile, this.commonData['items'])) {
              this.commonData['items'].push(objFile)
              addNew = true
            } 
          }
          if(addNew) {
            this.$WebSDK('common.parseShortcutFiles', JSON.stringify(this.commonData)).then(r => { 
                this.$VueBus.$emit('onRefresh', this.commonData.id)
                this.$WebSDK('common.setConfig', 'commonData', JSON.stringify(this.commonData['items']))
            })
          }
      }
    })
    this.$VueBus.$on('onDeleteItem', (id, obj) => {
      if(id == 'commonTag')  {
        for (let i = 0; i < this.commonData['items'].length; i++) {
          if(obj.hash == this.commonData['items'][i].hash)  {
              this.commonData['items'].splice(i, 1)
              this.$VueBus.$emit('onRefresh', this.commonData.id)
              this.$WebSDK('common.setConfig', 'commonData', JSON.stringify(this.commonData['items']))
              break
          }
        }
      }
      else if(id == 'desktopTag') {

      }
    })
    this.$VueBus.$on('onClearAll', (id) => {
      if(id == 'commonTag')  {
        this.commonData['items'].splice(0, this.commonData['items'].length)
        this.$VueBus.$emit('onRefresh', this.commonData.id)
        this.$WebSDK('common.setConfig', 'commonData', JSON.stringify(this.commonData['items']))
      }
      else if(id == 'desktopTag') {

      }
    })
    this.$VueBus.$on('onSaveAll', (id) => {
      if(id == 'commonTag')  {
        this.$WebSDK('common.setConfig', 'commonData', JSON.stringify(this.commonData['items']))
      }
      else if(id == 'desktopTag') {

      }
    })

    let commonJson = JSON.parse(await this.$WebSDK('common.getConfig', 'commonData'))
    if(commonJson != null) {
        this.commonData['items'] = commonJson
    }
    else {
        this.commonData['items'] = []
    }
      
    this.$WebSDK('common.parseShortcutFiles', JSON.stringify(this.commonData))

    let commonMenu = []
    commonMenu.push('Open')
    commonMenu.push('Admin Open')
    commonMenu.push('Open Path...')
    commonMenu.push('Rename')
    commonMenu.push('Delete')
    commonMenu.push('Clear All')
    this.commonData['menus'] = commonMenu
    this.commonData['id'] = 'commonTag'

    await this.createSystemShortcut()
    await this.createDesktopShortcut()

    let deskTopDir = (await this.$WebSDK('common.getDesktopDir')).trim()
    let watcherObj = await this.$WebSDK('common.fileSystemWatcher', deskTopDir)
    window.connectSignal(watcherObj.onFileSystemChanged, () => {
      this.createDesktopShortcut()
    })
    await this.$VueBus.$emit('onRefresh', this.commonData.id)
    this.$WebSDK('sdk.hideLoading')
    this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.MainFrame_ShowWindow, '')
  },
  computed: {
      
  },
  methods: {
    onClick(event) {
      console.log(event.target)
      if(event.target == this.$refs.commonItem) {
          if(this.$refs.commonTag.$el.style.display == 'none') {
            this.$refs.commonTag.$el.style.display = 'flex'
            this.$refs.systemTag.$el.style.display = 'none'
            this.$refs.desktopTag.$el.style.display = 'none'
          }
          else {
            this.$refs.commonTag.$el.style.display = 'none'
          }
      } 
      else if(event.target == this.$refs.systemItem) {
          if(this.$refs.systemTag.$el.style.display == 'none') {
            this.$refs.commonTag.$el.style.display = 'none'
            this.$refs.systemTag.$el.style.display = 'flex'
            this.$refs.desktopTag.$el.style.display = 'none'
          }
          else {
            this.$refs.systemTag.$el.style.display = 'none'
          }
      }
      else if(event.target == this.$refs.desktopItem) {
          if(this.$refs.desktopTag.$el.style.display == 'none') {
            this.$refs.commonTag.$el.style.display = 'none'
            this.$refs.systemTag.$el.style.display = 'none'
            this.$refs.desktopTag.$el.style.display = 'flex'
          }
          else {
            this.$refs.desktopTag.$el.style.display = 'none'
          }
      }
    },
    isExist(testObj, dataObj) {
      if(dataObj == null) {
        return false
      }
      for(let i = 0; i < dataObj.length; i++) {
         if (dataObj[i]['hash'] == testObj['hash']) {
           return true
         }
      }
      return false
    },
    async createSystemShortcut() {
      this.systemData['items'] = []
      let systemDir = (await this.$WebSDK('common.getSystemDir')).trim()
      let n = systemDir.lastIndexOf("\\")
      let windowDir = systemDir.substr(0, n)
      let programfileDir = (await this.$WebSDK('common.getProgramFileDir')).trim()
      let notepadObj = {}
      notepadObj['path'] = systemDir + '\\notepad.exe'
      notepadObj['hash'] = SparkMd5.hash(notepadObj['path'].toLowerCase())
      notepadObj['name'] = 'Notepad'
      let wordpadObj = {}
      wordpadObj['path'] = programfileDir + '\\Windows NT\\Accessories\\wordpad.exe'
      wordpadObj['hash'] = SparkMd5.hash(wordpadObj['path'].toLowerCase())
      wordpadObj['name'] = 'Wordpad'
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
      let powerShellObj = {}
      powerShellObj['path'] = systemDir + '\\WindowsPowerShell\\v1.0\\powershell.exe'
      powerShellObj['hash'] = SparkMd5.hash(powerShellObj['path'].toLowerCase())
      powerShellObj['name'] = 'Powershell'
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
      snippingtoolObj['name'] = 'Screenshot'
      let soundRecorderObj = {}
      soundRecorderObj['path'] = windowDir + '\\Sysnative\\SoundRecorder.exe'
      soundRecorderObj['hash'] = SparkMd5.hash(soundRecorderObj['path'].toLowerCase())
      soundRecorderObj['name'] = 'SoundRecorder'
      let charmapObj = {}
      charmapObj['path'] = windowDir + '\\Sysnative\\charmap.exe'
      charmapObj['hash'] = SparkMd5.hash(charmapObj['path'].toLowerCase())
      charmapObj['name'] = 'CharacterMap'
      let mipObj = {}
      mipObj['path'] = programfileDir + '\\Common Files\\Microsoft Shared\\Ink\\mip.exe'
      mipObj['hash'] = SparkMd5.hash(mipObj['path'].toLowerCase())
      mipObj['name'] = 'MathRef'
      let msinfo32Obj = {}
      msinfo32Obj['path'] = systemDir + '\\msinfo32.exe'
      msinfo32Obj['hash'] = SparkMd5.hash(msinfo32Obj['path'].toLowerCase())
      msinfo32Obj['name'] = 'SysInfo'
      let taskManagerObj = {}
      taskManagerObj['path'] = systemDir + '\\Taskmgr.exe'
      taskManagerObj['hash'] = SparkMd5.hash(taskManagerObj['path'].toLowerCase())
      taskManagerObj['name'] = 'TaskManager'
      let faxObj = {}
      faxObj['path'] = windowDir + '\\Sysnative\\WFS.exe'
      faxObj['hash'] = SparkMd5.hash(faxObj['path'].toLowerCase())
      faxObj['name'] = 'Fax Scan'
      let hostsObj = {}
      hostsObj['path'] = systemDir + '\\drivers\\etc\\hosts'
      hostsObj['hash'] = SparkMd5.hash(hostsObj['path'].toLowerCase())
      hostsObj['name'] = 'Hosts'

      if(await this.$WebSDK('common.fileExists', notepadObj["path"]))
        this.systemData['items'].push(notepadObj)
      if(await this.$WebSDK('common.fileExists', wordpadObj["path"]))
        this.systemData['items'].push(wordpadObj);
      if(await this.$WebSDK('common.fileExists', calcObj["path"]))
        this.systemData['items'].push(calcObj)
      if(await this.$WebSDK('common.fileExists', paintObj["path"]))
        this.systemData['items'].push(paintObj)
      if(await this.$WebSDK('common.fileExists', controlObj["path"]))
        this.systemData['items'].push(controlObj)
      if(await this.$WebSDK('common.fileExists', cmdObj["path"]))
        this.systemData['items'].push(cmdObj)
      if(await this.$WebSDK('common.fileExists', powerShellObj["path"]))
        this.systemData['items'].push(powerShellObj)
      if(await this.$WebSDK('common.fileExists', mstscObj["path"]))
        this.systemData['items'].push(mstscObj)
      if(await this.$WebSDK('common.fileExists', regedtObj["path"]))
        this.systemData['items'].push(regedtObj)
      if(await this.$WebSDK('common.fileExists', snippingtoolObj["path"]))
        this.systemData['items'].push(snippingtoolObj)
      if(await this.$WebSDK('common.fileExists', soundRecorderObj["path"]))
        this.systemData['items'].push(soundRecorderObj)
      if(await this.$WebSDK('common.fileExists', charmapObj["path"]))
        this.systemData['items'].push(charmapObj)
      if(await this.$WebSDK('common.fileExists', mipObj["path"]))
        this.systemData['items'].push(mipObj)
      if(await this.$WebSDK('common.fileExists', msinfo32Obj["path"]))
        this.systemData['items'].push(msinfo32Obj)
      if(await this.$WebSDK('common.fileExists', taskManagerObj["path"]))
        this.systemData['items'].push(taskManagerObj)
      if(await this.$WebSDK('common.fileExists', faxObj["path"]))
        this.systemData['items'].push(faxObj)
      if(await this.$WebSDK('common.fileExists', hostsObj["path"]))
        this.systemData['items'].push(hostsObj)
      
      let systemMenu = []
      systemMenu.push('Open')
      systemMenu.push('Admin Open')
      this.systemData['menus'] = systemMenu

      this.systemData['id'] = 'systemTag'
      //console.log(JSON.stringify(this.systemData))
      await this.$WebSDK('common.parseShortcutFiles', JSON.stringify(this.systemData))
      await this.$VueBus.$emit('onRefresh', this.systemData.id)
    },
    async createDesktopShortcut() {
      let deskNames = await this.$WebSDK('common.getDesktopFilePath')
      this.desktopData['items'] = []
      for(let i = 0; i < deskNames.length; i++) {
          let objFile = {}
          objFile['path'] = deskNames[i]
          objFile['hash'] = SparkMd5.hash(objFile['path'].toLowerCase())
          let n = objFile['path'].lastIndexOf("\\")
          objFile['name'] = objFile['path'].substr(n + 1)
          this.desktopData['items'].push(objFile)
      }
      let desktopMenu = []
      desktopMenu.push('Open')
      desktopMenu.push('Admin Open')
      desktopMenu.push('Open Path...')
      this.desktopData['menus'] = desktopMenu
      this.desktopData['id'] = 'desktopTag'
      await this.$WebSDK('common.parseShortcutFiles', JSON.stringify(this.desktopData))
      await this.$VueBus.$emit('onRefresh', this.desktopData.id)
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
