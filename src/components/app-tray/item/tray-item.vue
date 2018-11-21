<template>
  <div :class="$style.item" @mouseout="onOutUnreadHandler()" @mouseover="onOverUnreadHandler()" >
    <div :class="$style.headcontainer">
      <div :class="$style.avatartainer">
      <div :class="$style.plusheadimg" v-if="isAppService"></div>
      <template v-else>
        <user-avatar
        :imgsrc="channeldata.photoURL"
        :nick="channeldata.channelName"
        :itemid="channelStyle"
        :class="$style.headimg"
        :key="channeldata.channelId"
        ></user-avatar>
      </template>
      </div>
      <div :class="$style.name">{{channelName}}</div>
      <div :class="$style.aside" @click="onClickIgnoreHandler($event)">
        <!-- <i :class="$style.iconNoPrompt"    v-if="!showUnread"> </i> -->
        <span :class="channeldata.at > 0 ? $style.atmsg : $style.unreadmsg" v-if="showUnread">{{showCount(channeldata)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Logger from '@/public/base/Logger'
import ChannelLogic from '@/public/proxy/ChannelLogic'
// import ConfigUtil from '../../../public/const/ConfigUtil'

// import i18n from '@/i18n'
export default {
  name: 'ChannelInfo',
  props: {
    'channeldata': {
      type: Object,
      reqruied: true
    }
  },
  data () {
    return {
      showUnread: true
    }
  },
  watch: {
  },
  computed: {
    channelStyle () {
      return ChannelLogic.channelStyleIndex(this.channeldata)
    },
    channelName () {
      return this.isAppService ? this.$t('pluginService.name') : this.channeldata.channelName
    },
    isAppService () {
      return ChannelLogic.isAppService(this.channeldata)
    }
  },
  methods: {
    showCount (channel) {
      let count = channel.at > 0 ? channel.at : 0
      if (count === 0) return ''
      if (count > 99) return '99+'
      return count.toString()
    },
    onOverUnreadHandler () {
      // this.showUnread = false
    },
    onOutUnreadHandler () {
      this.showUnread = true
    },
    onClickIgnoreHandler (e) {
      e.preventDefault()
      e.stopImmediatePropagation()
      e.stopPropagation()
      // this.$WebSDK('ipc.dispatchWindowEvent', DataUri.IgnoreChannelMsg, this.channeldata.channelId)
    }
  },
  mounted () {
    Logger.log('this.channeldata :' + this.channeldata)
  }
  /** channeldata 结构：
    channelName: "2220805944yy的组队频道"
    maincid: 1404715996
    owner: 2220527842
    photoURL: "img/commonannel-default.jpg"
    shortcid: 613274
    textcid: 118449836
    voicecid: 1404915984
   */
}
</script>

<style lang='scss' module>
  @import "~@/css/common/_variable.scss";

  .item {
    padding: 6px 16px;
    display: flex;
    cursor: pointer;
    height: 42px;
    &:hover{
      background-color: #1b2839;
    }
  }
  .headcontainer{
    // width: 40px;
    // height: 40px;
    display: flex;
  }
  .avatartainer{
    width: 30px;
    height: 30px;
    display: flex;
  }
  .headimg {
    width: 30px;
    height: 30px;
    border: 1px;
    pointer-events: none;
    user-select: none;
    border-radius: 8px;
    overflow: hidden;
    object-fit: cover;
  }
  .plusheadimg {
    width: 30px;
    height: 30px;
    border: 6px;
    pointer-events: none;
    border-radius: 8px;
    overflow: hidden;
    background: url(../imgs/icon-plugin-service.png) 50% 50% no-repeat, linear-gradient(22deg, rgb(134,58,238), rgb(202,100,250));
  }
  .name {
    font-size: 16px;
    line-height: 30px;
    color: #818f9c;
    max-width: 135px;
    width: 135px;
    margin-left: 8px;
    border: 6px;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow:ellipsis;                 /*适用opera*/
    cursor: default;
    overflow: hidden;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .aside {
    padding: 5px;
    width: 50px;
    text-align: center;
  }
  .iconNoPrompt {
    display: inline-block;
    width: 14px;
    height: 17px;
    background: url(../imgs/tray-ignore.png) no-repeat center;
    pointer-events: none;
  }
  .atmsg {
    vertical-align: top;
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
    background-color: $color-unread-at;
    font-size: 12px;
    color: #fff;
    border-radius: 8px;
    height: 18px;
    line-height: 18px;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
  }
  .unreadmsg {
    vertical-align: top;
    display: inline-block;
    background-color: $color-unread-msg;//#727c85;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    margin-right: 5.5px;
    margin-top: 5.5px;
  }
</style>
