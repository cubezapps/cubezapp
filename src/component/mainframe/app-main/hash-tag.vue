<template>
    <div class="hashtag-backpanel" >
        <p class="text"><span :style="{ 'color': 'red' }">Md5:</span> {{$data.hashObj["Md5"]}}</p>
        <p class="text"><span :style="{ 'color': 'red' }">Sha1:</span> {{$data.hashObj["Sha1"]}}</p>
        <p class="text"><span :style="{ 'color': 'red' }">Sha224:</span> {{$data.hashObj["Sha224"]}}</p>
        <p class="text"><span :style="{ 'color': 'red' }">Sha256:</span> {{$data.hashObj["Sha256"]}}</p>
        <p class="text"><span :style="{ 'color': 'red' }">Sha512:</span> {{$data.hashObj["Sha512"]}}</p>
        <p class="text"><span :style="{ 'color': 'red' }">Sha3_224:</span> {{$data.hashObj["Sha3_224"]}}</p>
        <p class="text"><span :style="{ 'color': 'red' }">Sha3_256:</span> {{$data.hashObj["Sha3_256"]}}</p>
        <p class="text"><span :style="{ 'color': 'red' }">Sha3_512:</span> {{$data.hashObj["Sha3_512"]}}</p>
    </div>
</template>

<script>

export default {
  data () {
    return {
     
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
  .hashtag-backpanel {
    flex: 1 1 auto;
    background-color: beige;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow: auto;
    text-align: left;
    word-break: break-all;
    white-space: normal;
  }
  .text {
    margin-left: 8px;
    margin-top: 1px;
    margin-right: 8px;
    margin-bottom: 1px;
  }
</style>
