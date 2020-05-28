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
      signData: '0x7b2266726f6d223a22307834363234383542343338354237623835314362463730373032376246373535396236326664443437222c22746f223a22307837366332616534323831666531656531613739636362646461323531366434643765623065623337222c2276616c7565223a2231303030303030303030303030303030303030222c22636f696e54797065223a2246534e222c225468726573486f6c64223a22332f33222c224d6f6465223a2231222c2254696d655374616d70223a2231353930343831333937303731222c22727376223a22307835343236464536324432374545444338313241324142323545373139333236303845423541384133413037334142424339423144353130413641313531383746324542313142303142393545384632383341453236333642393039363942443942383941443330423646383237413135433033373830384632433645364138313030222c2268617368223a22307862656438616538396537323736613839646365666132393834356438366133643138643433633235313365313131336135366438626533313866613336666361222c22676173223a22307839633430222c226761735072696365223a2230783737333539343030222c226e6f6e6365223a22307830222c2264617461223a22313233227d'
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
          gas: dataObj.gas,
          gasPrice: dataObj.gasPrice,
          hash:  dataObj.hash,
          input: this.$$.web3.utils.toHex(dataObj.data),
          nonce: dataObj.nonce,
          to: dataObj.to,
          value: this.$$.web3.utils.toHex(dataObj.value),
          r: '0x0',
          s: '0x0',
          v: '0x0',
        }
        console.log(dataObj)
        console.log(data)
        // console.log(JSON.stringify(data))
        this.$$.web3.coins.makeSignedTransaction(JSON.stringify(data), dataObj.rsv, dataObj.coinType).then(res => {
        // this.$$.web3.coins.makeSignedTransaction(data, dataObj.rsv, dataObj.coinType).then(res => {
          console.log(res)
          if (res.Status === 'Success') {
            // let cbData = res.Data.result ? JSON.parse(res.Data.result) : ''
            let cbData = res.Data.result ? res.Data.result : ''
            if (cbData) {
              console.log(cbData)
              this.$$.web3.coins.submitTransaction(cbData, dataObj.coinType).then(res1 => {
                console.log(res1)
              })
            }
          }
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