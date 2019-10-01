<template>
    <div class="transfileitem-backpanel">
        <div class="file-div" ref="fileDiv">
          <div class="file-top-div">
            <img class="avatar" :src="redImg" />
            <img class="avatar" :src="greenImg"/>
            <div class="text">{{ item.name }}</div>
          </div>
          <b-progress class="file-middle-div" :value="50" :max="max" show-progress animated></b-progress>
          <div class="file-bottom-div">
            <div class="speedDiv">10KB/s</div>
            <b-link>Recv</b-link>
            <b-link>Cancel</b-link>
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
      houseImg: 'asserts/house.png'
    }
  },
  mounted() {
    
  },
  computed: {

  },
  methods: {

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
        .b-link {
          margin-left: 4px;
          margin-right: 4px;
        }
      }
    }
  }
</style>
