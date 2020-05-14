<template>
  <div class="boxContent flex-c" v-loading="loading.init" element-loading-text="Loading...">
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
          <div class="mt-30 flex-bc" v-if="signHash">
            <el-input type="text" v-model="signHash"></el-input>
            <el-button type="primary" @click="copyTxt(signHash)" class="ml-10">Copy Hash</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Send Transaction" name="send">
          <el-form label-position="top" label-width="80px" :model="signData">
            <el-form-item>
              <span slot="label"><i class="color_red mr-5">*</i>SignTx:</span>
              <el-input type="textarea" v-model="signData.sign" :rows="8"></el-input>
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
  width: 100%;max-width: size(600);min-height: size(600);overflow:auto;
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
        from: 'mzEh4n6syEvTYXEWRdSzbyXJMThfJqCfH6',
        pubKey: '046725b0e28b6f1f597fbd642f556b3e1f603826ceb6acfb0e981bd51ee65c8e312e2d4b2dc6986e18fb7309c6971fdde1f300d799d237f10ba9b93b41ce03a829',
        to: 'myyBxePvJGtu8Uh63K7D78XVoSCMtMfmaL',
        value: '0.00001',
        data: '',
        coinType: 'BTC'
      },
      signData: {},
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
      signHash: '',
    }
  },
  mounted () {
    // console.log(web3)
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
          this.signHash = res.Data.result.TxHash[0]
        } else {
          this.signHash = ''
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
      web3.dcrm.lockOut(this.signData.sign).then(res => {
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
        this.signData = {}
      }
    }
  }
}
</script>