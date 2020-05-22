<template>
  <div class="boxConntent1 container">
    <div class="s-form-box">
      <el-form>
        <el-form-item>
          <el-input type="textarea" v-model="signData" :rows="10"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendTxns">{{$t('title').sendTxns}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.s-form-box {
  width: 100%; max-width: size(600);margin: auto;padding: size(30) 0;
}
</style>

<script>
export default {
  name: 'sendTxns',
  data () {
    return {
      signData: ''
    }
  },
  mounted () {

  },
  methods: {
    sendTxns () {
      let dataObj = this.$$.web3.utils.hexToUtf8(this.signData)
      try {
        dataObj = JSON.parse(dataObj)
        let data = {
          from: dataObj.from,
          to: dataObj.to,
          value: dataObj.value,
          gas: dataObj.gas,
          gasPrice: dataObj.gasPrice,
          nonce: dataObj.nonce,
          data: dataObj.data ? dataObj.data : '' ,
          hash:  dataObj.hash
        }
        // this.$$.web3.coins.getTransactionInfo(dataObj.hash, dataObj.coinType).then(res => {
        //   console.log(res)
        // })
        console.log(dataObj)
        console.log(JSON.stringify(data))
        this.$$.web3.coins.makeSignedTransaction(JSON.stringify(data), dataObj.rsv, dataObj.coinType).then(res => {
        // this.$$.web3.coins.makeSignedTransaction(data, dataObj.rsv, dataObj.coinType).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>