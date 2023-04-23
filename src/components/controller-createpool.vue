<template>
  <div class="controller container">
    <h1>Create new pool</h1>
    <h3>Please complete pool details</h3>
    Pool name: <input v-model="poolName" placeholder="">
    Pool symbol: <input v-model="poolSymbol" placeholder="">
    <button @click="clickCreate">Create pool</button>
  </div>
</template>
<script>
import { parseFixed } from '@ethersproject/bignumber'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export default {
  name: 'controller-createpool',
  data () {
    return {
      poolName: 'TEST',
      poolSymbol: 'TST',
      poolTokens: [
        '0x471EcE3750Da237f93B8E339c536989b8978a438',
        '0x765DE816845861e75A25fCA122bb6898B8B1282a'
      ],
      poolNormalisedWeights: [
        parseFixed('0.4', 18).toString(),
        parseFixed('0.6', 18).toString()
      ],
      poolAssetManagers: [ZERO_ADDRESS, ZERO_ADDRESS],
      swapFeePercentage: 3000000000000000,
      swapEnabledOnStart: false,
      mustAllowListLPs: false,
      managementAumFeePercentage: 0,
      aumFeeId: 0,
      salt: 0x01020304,
      amount: 0
    }
  },
  methods: {
    clickCreate (event) {
      this.winEvent = null
      this.pending = true
      this.$store.state.contractInstance().createPool(
        this.poolName,
        this.poolSymbol,
        this.poolTokens,
        this.poolNormalisedWeights,
        this.poolAssetManagers,
        this.swapFeePercentage,
        this.swapEnabledOnStart,
        this.mustAllowListLPs,
        this.managementAumFeePercentage,
        this.aumFeeId,
        this.salt,
        {
          gas: 300000,
          value: this.$store.state.web3
            .web3Instance()
            .toWei(this.amount, 'ether'),
          from: this.$store.state.web3.coinbase
        },
        (err, result) => {
          if (err) {
            console.log(err)
            this.pending = false
          }
        }
      )
    }
  },
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  }
}
</script>

<style scoped>
.controller {
  margin-top: 50px;
  text-align: center;
}
#loader {
  width: 150px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
ul {
  margin: 25px;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 25px;
}
li {
  padding: 20px;
  margin-right: 5px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fff;
  border: -2px solid #bf0d9b;
  color: #bf0d9b;
  box-shadow: 3px 5px #bf0d9b;
}
li:hover {
  background-color: #bf0d9b;
  color: white;
  box-shadow: 0px 0px #bf0d9b;
}
li:active {
  opacity: 0.7;
}
* {
  color: #444444;
}
#has-won {
  color: green;
}
#has-lost {
  color: red;
}
</style>
