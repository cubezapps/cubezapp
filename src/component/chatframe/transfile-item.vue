<template>
    <div class="transfileitem-backpanel">
        <div class="file-div" ref="fileDiv">
          <div class="file-top-div">
            <img class="avatar" :src="item.issendfile ? sendImg : recvImg" />
            <img class="avatar" :src="item.issendfile ? getIconUrl : folderImg"/>
            <div class="text">{{ showText(item.name) }}</div>
          </div>
          <b-progress class="file-middle-div" ref="progressRef" :precision="2" :value="progressData" :max="100" show-progress animated></b-progress>
          <div class="file-bottom-div">
            <div class="speedDiv" ref="speedRef" v-if="item.status != 3" >{{ speedData }}</div>
            <b-link id="acceptBtn" v-if="!item.issendfile && item.status == 0" @click="onAcceptClick">{{ $t("Accept")}}</b-link>
            <b-link id="cancelBtn" ref="cancelRef" @click="onCancelClick">{{ cancelText }}</b-link>
          </div>
        </div>
    </div> 
</template>

<script>

export default {
  props: {
    'item': {
        type: Object,
        required: true
    },
    'index': {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      redImg: 'asserts/red.png',
      greenImg: 'asserts/green.png',
      houseImg: 'asserts/house.png',
      sendImg: 'asserts/send.png',
      recvImg: 'asserts/recv.png',
      folderImg: 'asserts/folder.png',
      speedData: '0MB/S',
      progressData: 0
    }
  },
  mounted() {
    this.$WebSDK('network.onTransFileRes', (ip, port, jobid, accept) => {
      if(this.item.jobid == jobid) {
        this.item.status = 1
      }
    })

    this.$WebSDK('network.onTransFileJobFinish', (ip, jobid) => {
      if(this.item.jobid == jobid && this.item.issendfile) {
        this.item.status = 2
        this.progressData = 100.00
      }
    })

    this.$WebSDK('network.onRecvAllJobFinish', (ip, jobid) => {
      if(this.item.jobid == jobid && !this.item.issendfile) {
        this.item.status = 2
        this.progressData = 100.00
      }
    })

    this.$WebSDK('network.onStaticst', (data) => {
      console.log(data)
      if(this.item.status == 1) {
        if(this.item.issendfile) {
          for(let i = 0; i < data.send.length; ++i) {
            if(this.item.jobid == data.send[i].jobid) {
              this.progressData = parseFloat(data.send[i].percent)
              this.speedData = data.send[i].speed + 'MB/S'
            }
          }
        }
        else {
          for(let i = 0; i < data.recv.length; ++i) {
            if(this.item.jobid == data.recv[i].jobid) {
              this.progressData = parseFloat(data.recv[i].percent)
              this.speedData = data.recv[i].speed + 'MB/S'
            }
          }
        }
      }
    })
  },
  computed: {
    cancelText() {
      if(this.item.status == 2) {
        return this.$t("Close")
      }
      else {
        return this.$t("Cancel")
      }
    },
    showText() {
      return function(fileName) {
          let text = fileName
          if(fileName.length > 20) {
              text = fileName.substr(0, 10)
              text += "..."
              text += fileName.substr(fileName.length - 8, 8)
          }
          return text
      }
    },
    getIconUrl() {
      let tmpUrl = `http://localhost/local/res/${this.item.hash}.ico`
      //console.log(tmpUrl)
      return tmpUrl
    }
  },
  methods: {
    onAcceptClick(event) {
      window.Native.Common.chooseFolder("", "").then(r => {
        if(r.code == 0) {
          this.$WebSDK('network.recvFile', this.item.ip, this.item.port, this.item.jobid, r.folder, this.item.filename, this.item.type)
          this.item.status = 1
        }
      })
    },
    onCancelClick(event) {
      if(this.$refs.cancelRef.$el.outerText == this.$t("Cancel")) {
        this.$WebSDK('network.cancelTransfile', this.item.ip, this.item.port, this.item.jobid)
      }
      let val = {}
      val.itemuniqueid = this.item
      this.$WebSDK('ipc.dispatchWindowEvent', this.$DataUri.ChatFrame_ItemClose, JSON.stringify(this.item))
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/index.scss';
</style>

<style lang='scss' scoped>
  $height: 50px;
  .transfileitem-backpanel {
    flex: 0 0 $height;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    user-select: none;
    margin: 2px 2px;

    .file-div {
      flex: 1 1 $height;
      display: flex;
      flex-direction: column;

      .file-top-div {
        flex: 1 1 16px;
        display: flex;
        flex-direction: row;

        .avatar {
            width: 16px;
            height: 16px;
            flex: 0 0 16px;
            margin-right: 2px;
            //border-radius: 3px;
            //margin-top: 6px;
            //margin-bottom: auto;
        }
        .text {
            line-height: 1;
            text-align: left;
            word-break: break-all;
        }
      }
      .file-middle-div {
        flex: 1 1 12px;
        margin: 4px 0px;
        display: flex;
        flex-direction: row;
      }
      .file-bottom-div {
        //flex: 1 1 calc(100% - 8px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
       
        .speedDiv {
          flex: 1 1 auto;
          text-align: left;
        }
        #acceptBtn {
          margin-left: 4px;
          margin-right: 4px;
        }
        #cancelBtn{
          margin-left: 4px;
          margin-right: 4px;
        }
        a {
          user-select: none;
          -webkit-user-drag: none;
        }
        a:link { 
          text-decoration: none;
        }
        a:hover {
          color: rgb(187, 14, 14);
        }
      }
    }
  }
</style>
