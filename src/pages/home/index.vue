<template>
  <div class="boxContent1 pt-50" v-loading.fullscreen.lock="loading.init" element-loading-text="Loading...">
    <div class="action-box">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="Sign" name="sign">
          <el-form label-position="top" label-width="80px" :model="txData">
            <el-form-item>
              <span slot="label"><i class="color_red mr-5">*</i>Coin:</span>
              <el-select v-model="txData.coinType" class="WW100" placeholder="">
                <el-option v-for="(item, index) in allCoins" :key="index" :label="item.coinType" :value="item.coinType" :disabled="!item.isOpen">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <span slot="label"><i class="color_red mr-5">*</i>Form:</span>
              <el-input v-model="txData.from"></el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label"><i class="color_red mr-5">*</i>To:</span>
              <el-input v-model="txData.to"></el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label"><i class="color_red mr-5">*</i>Value:</span>
              <el-input v-model="txData.value"></el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label"><i class="color_red mr-5">*</i>Public Key:</span>
              <el-input v-model="txData.pubKey"></el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label">Data:</span>
              <el-input v-model="txData.data"></el-input>
            </el-form-item>
            <el-form class="mt-20">
              <el-button type="primary" @click="buildSignInfo">Sign</el-button>
              <el-button @click="resetData">Reset</el-button>
            </el-form>
          </el-form>
          <div class="mt-30" v-if="signData">
            <div class="flex-bc">
              <el-input type="textarea" v-model="signData" :rows="9"></el-input>
              <div id="signQRcode" class="ml-10"></div>
            </div>
            <el-button type="primary" @click="copyTxt(signData)" class="mt-10">Copy Hash</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Send Transaction" name="send">
          <el-form label-position="top" label-width="80px" :model="sendData">
            <el-form-item>
              <span slot="label"><i class="color_red mr-5">*</i>SignTx:</span>
              <el-input type="textarea" v-model="sendData.sign" :rows="8"></el-input>
            </el-form-item>
            <el-form class="mt-20">
              <el-button type="primary" @click="sendTxns">Send Transaction</el-button>
              <el-button @click="resetData">Reset</el-button>
            </el-form>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss">
.action-box {
  width: 100%;max-width: size(600);overflow:auto;margin:auto;
  .el-form-item {
    margin-bottom: size(10);
    .el-form-item__label {
      height: size(30);line-height: size(30);padding: 0;
    }
  }
}
</style>

<script>
import web3 from '@/assets/js/web3/index.js'
export default {
  name: 'HomePage',
  data () {
    return {
      activeName: 'sign',
      txData: {
        from: '0x3C93897270F5E42D08f08e2ac02BE2a21D544AAB',
        pubKey: '04cd0a27dadecd6d3dcb80e52bee3dcf5eaa39dc3e37eb9590c3f4601e757003aae0be85d40dc87e3a2a42ab9586dd06002a1a61b28f7be500d2d0fcba6941b108',
        to: '0x76c2ae4281fe1ee1a79ccbdda2516d4d7eb0eb37',
        value: '0.00001',
        data: '',
        coinType: 'FSN',
        hash: ''
      },
      signData: '',
      sendData: {},
      allCoins: [
        { coinType: 'BTC', address: '', balance: '', isOpen: 1},
        { coinType: 'ETH', address: '', balance: '', isOpen: 1},
        { coinType: 'USDT', address: '', balance: '', isOpen: 0},
        { coinType: 'FSN', address: '', balance: '', isOpen: 1},
        { coinType: 'RMBT', address: '', balance: '', isOpen: 0},
      ],
      loading: {
        init: false
      },
    }
  },
  mounted () {
    // let str = JSON.stringify(this.txData)
    // let hash = web3.utils.utf8ToHex(str)
    // console.log(hash)
    // let str1 = web3.utils.hexToUtf8(hash)
    // console.log(str1)
  },
  methods: {
    init () {
    },
    handleClick () {

    },
    buildSignInfo () {
      // console.log(web3)
      this.loading.init = true
      let value = this.$$.toWei(this.txData.value, this.txData.coinType)
      web3.coins.buildUnsignedTransaction(
        this.txData.from,
        this.txData.pubKey,
        this.txData.to,
        value,
        this.txData.data,
        this.txData.coinType
      ).then(res => {
        console.log(res)
        console.log(JSON.parse(res.Data.result.Tx))
        if (res.Status === 'Success') {
          this.txData.hash = res.Data.result.TxHash[0]
          let str = JSON.stringify(this.txData)
          console.log(str.length)
          this.signData = web3.utils.utf8ToHex(str)
          // this.signData = str
          console.log(this.signData.length)
          this.$nextTick(() => {
            this.$$.qrCode(this.signData, 'signQRcode')
          })
        } else {
          this.signData = this.txData.hash = ''
          this.msgError(res.Tip)
        }
        this.loading.init = false
      }).catch(err => {
        this.msgError(err.toString())
        this.loading.init = false
      })
    },
    sendTxns () {
      this.loading.init = true
      web3.dcrm.lockOut(this.sendData.sign).then(res => {
        cbData = res
        // console.log(cbData)
        if (cbData.Status !== 'Error') {
          this.msgSuccess('Success!')
        } else {
          this.msgError(cbData.Error)
        }
        this.loading.init = false
      }).catch(err => {
        this.msgError(err.toString())
        this.loading.init = false
      })
    },
    resetData () {
      if (this.activeName === 'sign') {
        this.txData = {}
      } else {
        this.sendData = {}
      }
    }
  }
}
</script>