<template>
  <div class="bg flex-c">
    <div class="e-box">
      <div class="line-block logo">
        <img src="@/assets/img/logo/logo-white.svg" v-if="!dayAndNight">
        <img src="@/assets/img/logo/logo-black.svg" v-else>
      </div>
      <h3 class="title" v-html="$t('title').walletTitle"></h3>
      <p class="tip color_red" v-html="$t('tip').walletTip"></p>
      <div class="flex-c">
        <w-button :ok="$t('btn').login" :cancel="$t('btn').register" @onOk="toUrl('login')" @onCancel="registerTip" class="mt-20"></w-button>
      </div>
      <div class="flex-c mt-10">
        <div class="importFile flex-sc cursorP">
          <span class="font12 color_blue opacity6">{{$t('btn').importAccount}}</span>
          <input type="file" class="file" id="fileUpload" @change="fileUpChange" :title="$t('btn').importAccount">
        </div>
      </div>
      <!-- <div class="WW100 mt-5 flex-c flex-wrap">
        <set-enode :isShowEnode="false"></set-enode>
      </div> -->
    </div>

    <el-dialog :title="$t('btn').importAccount" :visible.sync="eDialog.import" width="300px" :before-close="modalClick"  :close-on-click-modal="false" :modal-append-to-body='false'>
      <div>
        {{$t('warn').w_20}}：{{accountData && accountData.account && accountData.account.username ? accountData.account.username : ''}} ?
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modalClick">{{$t('btn').cancel}}</el-button>
        <el-button type="primary" @click="importAccount">{{$t('btn').confirm}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('btn').importAccount" :visible.sync="eDialog.changeName" width="300px" :before-close="modalClick"  :close-on-click-modal="false" :modal-append-to-body='false'>
      <div>
        {{$t('error').err_7}}：{{accountData && accountData.account && accountData.account.username ? accountData.account.username : ''}} ！{{$t('warn').w_22}}：
      </div>
      <div>
        <el-input v-model="newAccountName" :placeholder="$t('warn').w_22"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modalClick">{{$t('btn').cancel}}</el-button>
        <el-button type="primary" @click="changeNewAccount">{{$t('btn').confirm}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
@import './scss/enter';
.importFile {
  width: size(240);position: relative;
  .file {
    width: 100%;height: 100%;position: absolute;top:0;left: 0;right: 0;bottom: 0;opacity: 0;cursor: pointer;
  }
}
</style>

<script>
import wButton from '@/components/btn/index.vue'
import setEnode from '@/components/setEnode/index.vue'
import regExp from '@/assets/js/config/RegExp.js'
import {computedPub} from '@/assets/js/pages/public'

export default {
  name: '',
  data () {
    return {
      eDialog: {
        import: false,
        changeName: false
      },
      accountData: {},
      newAccountName: ''
    }
  },
  components: {wButton, setEnode},
  computed: {
    ...computedPub
  },
  // sockets: {
  //   PrivateAccountsAdd (res) {
  //     console.log(res)
  //     if (res.msg === 'Success') {
  //       this.msgSuccess('Success')
  //     } else {
  //       if (res.error === 'Repeat') {
  //         this.eDialog.changeName = true
  //       } else {
  //         this.msgError(res.error)
  //       }
  //     }
  //   }
  // },
  sockets: {
    PrivateAccountsAdd (res) {
      console.log(res)
    },
    getNodeInfos  (res) {
      console.log(res)
    },
  },
  mounted () {
    // console.log(this.$db)
    // let url = 'https://stakingtest.fusionwallet.cn/'
    // this.$axios.post(url).then(res => {
    //   console.log(res)
    // })
    setTimeout(() => {
      this.$socket.emit('getNodeInfos')
    }, 1500)
  },
  methods: {
    modalClick () {
      this.eDialog.import = false
      this.eDialog.changeName = false
      this.accountData = {}
      this.newAccountName = ''
    },
    registerTip () {
      this.msgWarning('请下载客户端进行注册！')
    },
    changeNewAccount () {
      if (this.newAccountName) {
        if (!regExp.username.test(this.newAccountName)) {
          this.msgError(this.$t('error').err_2)
        } else {
          this.accountData.account.username = this.newAccountName
          this.importAccount()
        }
      } else {
        this.msgError(this.$t('error').err_1)
      }
    },
    importAccount () {
      let account = this.accountData.account
      // console.log(account)
      this.$db.findAccount({$or: [{address: account.address}, {username: account.username}]}).then(list => {
        // console.log(list)
        if (list.length <= 0) {
          this.$db.insertAccount({
            username: account.username,
            address: account.address,
            ks: account.ks,
            timestamp: account.timestamp,
          }).then(res => {
            console.log(res)
            this.msgSuccess(this.$t('success').s_7)
            this.modalClick()
          }).catch(err => {
            console.log(err.toString())
            this.msgError(err)
            this.modalClick()
          })
        } else {
          this.eDialog.import = false
          this.eDialog.changeName = true
          // this.msgError(this.$t('error').err_7)
          // this.modalClick()
        }
      }).catch(err => {
        console.log(err)
        // this.msgError(err.toString())
        this.msgError(this.$t('error').err_7)
        this.modalClick()
      })
    },
    fileUpChange (event) {
      let reader = new FileReader()
      let fileUpload = document.getElementById("fileUpload")
      let fileName = event.target.files[0].username
      reader.onload = onLoadEvent => {
        // console.log(onLoadEvent.currentTarget.result)
        let data = onLoadEvent.currentTarget.result
        try {
          data = data ? JSON.parse(data) : ''
          console.log(data)
          if (data) {
            if (data.account && data.account.ks && this.$$.walletRequirePass(data.account.ks)) {
              // this.accountData = data
              // this.eDialog.import = true
              // this.$store.commit('setAddress', {info: data.account.address})
              // this.$store.commit('setToken', {info: data.account.username})
              // this.$store.commit('setPubKeyArr', data.pubKey)
              // this.$store.commit('setKeystore', data.account.ks)
              // this.$router.push('/account')
              let dataObj = {
                username: data.account.username,
                address: data.account.address,
                ks: data.account.ks,
                pubKeyArr: data.pubKey
              }
              console.log(dataObj)
              setTimeout(() => {
                this.$socket.emit('PrivateAccountsAdd', dataObj)
              }, 1000)
              // console.log(fileUpload.value)
              fileUpload.value = ''
            } else {
              this.msgError(this.$t('error').err_11)
            }
          } else {
            this.msgError(this.$t('error').err_11)
          }
        } catch (error) {
          console.log(error.toString())
          this.msgError(this.$t('error').err_11)
        }
      }
      reader.readAsText(event.target.files[0])
    },
  }
}
</script>