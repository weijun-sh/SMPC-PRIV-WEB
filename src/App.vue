<template>
  <div id="app" :class="Number(dayAndNight) ? '' : 'night'" v-loading="!isConnect && networkMode" :element-loading-text="$t('loading').l_1">
    <router-view></router-view>
  </div>
</template>

<script>
import {computedPub} from '@/assets/js/pages/public'
import {mapActions} from 'vuex'
export default {
  name: 'SMPC',
  data () {
    return {
      mouse1: '',
      mouse2: '',
      eventID: '',
      timeout: 60 * 1000 * 60,
      // timeout: this.$$.config.timeout,
      currentSecond: 0
    }
  },
  watch: {
    language () {
      this.$i18n.locale = this.language ? this.language : this.$i18n.locale
      // console.log(this.language)
    },
  },
  computed: {
    ...computedPub,
    isConnect () {
      return this.$store.state.connect
    }
  },
  sockets: {
    connect () {
      console.log("connect")
      this.$store.commit('SOCKET_CONNECT', true)
    },
    disconnect () {
      console.log("disconnect")
      this.$store.commit('SOCKET_CONNECT', false)
    }
  },
  created () {
    this.initData()
    this.StartPoint()
    document.body.onmousemove = () => {
      this.GetXYPosition()
    }
  },
  mounted () {
    // console.log(this.$$.web3)
    // console.log(this.$store.state)
  },
  methods: {
    ...mapActions(['getDayAndNight',  'getLanguage', 'getServerRPC', 'getServerRPCname']),
    initData () {
      this.getDayAndNight()
      this.getLanguage()
      this.getServerRPC()
      this.getServerRPCname()
    },
    mousePos (e) {
      e = e || window.event
      return {
        x: e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
        y: e.clientY+document.body.scrollTop+document.documentElement.scrollTop
      }
    },
    GetXYPosition (e) {
      this.mouse2 = this.mousePos(e).x + ',' + this.mousePos(e).y
    },
    StartPoint () {
      this.mouse1 = ""
      this.mouse2 = ""
      this.eventID = setInterval(() => {
        if(this.mouse1 === this.mouse2){
          this.currentSecond = this.currentSecond + 1000
          if(this.currentSecond > this.timeout){
            clearInterval(this.eventID)
            this.msgError('你已经超过3分钟没有操作，页面自动跳转至首页')
            this.quitApp()
            setTimeout(() => {
              history.go(0)
            }, 1500)
          }
        }else{
          this.currentSecond = 0
          this.mouse1 = this.mouse2
        }
      }, 1000)
    }
  },
  beforeDestroy () {
    this.quitApp()
  }
}
</script>

<style lang="scss">
// @import '@/assets/scss/index.scss';
// #app {
//   width: $test;
// }
</style>
