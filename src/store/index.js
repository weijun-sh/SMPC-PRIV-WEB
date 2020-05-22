import Vue from 'vue'
import Vuex from 'vuex'
/**
 * @description 配置文件
 */
import config from '@/assets/js/config/base.js'
/**
 * @description web3文件
 */
// import web3 from '@/libs/web3Util'
/**
 * @description 基本信息设置
 */
import db from '@/db/index.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    eNode: '',
    eNodeTx: '',
    address: '',
    token: '',
    accountType: config.modeInit,
    dayAndNight: '',
    language: '',
    serverRPC: '',
    serverRPCname: '',
    networkMode: config.networkMode,
    approvalObj: {},
    keystore: '',
    email: '',
    connect: '',
    pubKeyArr: []
  },
  mutations: {
    setEnode (state, data) {
      state.eNode = data
    },
    setEnodeTx (state, data) {
      let info = data && data.info !== '' ? data.info.toString() : ''
      state.eNodeTx = info
    },
    setAddress (state, data) {
      let info = data && data.info !== '' ? data.info.toString() : ''
      state.address = info
    },
    setToken (state, data) {
      let info = data && data.info !== '' ? data.info.toString() : ''
      state.token = info
    },
    setAccountType (state, data) {
      let info = data && data.info !== '' ? data.info.toString() : config.modeInit
      state.accountType = info
      if (!data.type) {
        db.updateBaseInfo({
          key: config.cookies.accountType,
          value: info
        })
      }
    },
    setDayAndNight (state, data) {
      let info = data && data.info !== '' ? data.info.toString() : config.dayAndNight
      // console.log(data)
      // console.log(info)
      state.dayAndNight = info
      if (!data.type) {
        db.updateBaseInfo({
          key: 'dayAndNight',
          value: info
        })
      }
    },
    setLanguage (state, data) {
      let info = data && data.info !== '' ? data.info : ''
      state.language = info
      if (!data.type) {
        db.updateBaseInfo({
          key: 'language',
          value: info
        })
      }
    },
    setServerRPC (state, data) {
      let info = data && data.info !== '' ? data.info : ''
      state.serverRPC = info
      if (!data.type) {
        db.updateBaseInfo({
          key: 'serverRPC',
          value: info
        })
      }
    },
    setServerRPCname (state, data) {
      let info = data && data.info !== '' ? data.info : ''
      state.serverRPCname = info
      if (!data.type) {
        db.updateBaseInfo({
          key: 'serverRPCname',
          value: info
        })
      }
    },
    setNetworkMode (state, data) {
      // console.log(data)
      let info = data && data.info !== '' ? data.info : ''
      state.networkMode = info
    },
    setApprovalObj (state, data) {
      state.approvalObj = data
    },
    setKeystore (state, data) {
      state.keystore = data
    },
    setEmail (state, data) {
      state.email = data
    },
    SOCKET_CONNECT(state, data) {
      // console.log(data)
      state.connect = data
    },
    setPubKeyArr (state, data) {
      state.pubKeyArr = data
    },
  },
  actions: {
    getAccountType ({commit}) {
      let data = { type: 1, info: ''}
      db.findBaseInfo({key: config.cookies.accountType}).then(res => {
        if (res.length > 0) {
          data.info = res[0].value
        } else {
          data.info = config.modeInit
        }
        commit('setAccountType', data)
      }).catch(err => {
        data.info = config.modeInit
        commit('setAccountType', data)
        console.log(err)
      })
    },
    getDayAndNight ({commit}) {
      let data = { type: 1, info: ''}
      db.findBaseInfo({key: 'dayAndNight'}).then(res => {
        if (res.length > 0) {
          data.info = res[0].value
        } else {
          data.info = config.dayAndNight
        }
        commit('setDayAndNight', data)
      }).catch(err => {
        data.info = config.dayAndNight
        commit('setDayAndNight', data)
        console.log(err)
      })
    },
    getLanguage ({commit}) {
      let data = { type: 1, info: ''}
      db.findBaseInfo({key: 'language'}).then(res => {
        // console.log(res)
        if (res.length > 0) {
          data.info = res[0].value
        } else {
          data.info = ''
        }
        commit('setLanguage', data)
      }).catch(err => {
        data.info = ''
        commit('setLanguage', data)
        console.log(err)
      })
    },
    getServerRPC ({commit}) {
      let data = { type: 1, info: ''}
      db.findBaseInfo({key: 'serverRPC'}).then(res => {
        // console.log(res)
        if (res.length > 0) {
          data.info = res[0].value
        } else {
          data.info = config.serverRPC
        }
        commit('setServerRPC', data)
      }).catch(err => {
        data.info = config.serverRPC
        commit('setServerRPC', data)
        console.log(err)
      })
    },
    getServerRPCname ({commit}) {
      let data = { type: 1, info: ''}
      db.findBaseInfo({key: 'serverRPCname'}).then(res => {
        console.log(res)
        if (res.length > 0) {
          data.info = res[0].value
        } else {
          data.info = ''
        }
        commit('setServerRPCname', data)
      }).catch(err => {
        data.info = ''
        commit('setServerRPCname', data)
        console.log(err)
      })
    },
  }
})

export default store
