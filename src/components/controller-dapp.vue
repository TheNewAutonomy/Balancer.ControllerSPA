<template>
   <section>
    <hello-metamask/>
    <header>
      <h1>Controller Pools</h1>
    </header>
    <button @click="loadPoolSet">
        Load Pools
    </button>
    <ul>
      <li>
        <pool-details
          v-for="pool in pools"
          :key="pool.id"
          :id="pool.id"
          :address="pool.address"
          :vault="pool.vault"
          @trigger="triggerRun"
        ></pool-details>
      </li>
    </ul>
    <new-pool @add-pool="addPool"></new-pool>
  </section>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import PoolDetails from '@/components/pool-details'
import NewPool from '@/components/new-pool'
import ControllerCreatePool from '@/components/controller-createpool'
export default {
  name: 'controller-dapp',
  data () {
    return {
      pools: [
      ]
    }
  },
  methods: {
    loadPoolSet () {
      this.$store.state.controllerContractInstance().getPoolsUnderManagement.call(
        {
          from: this.$store.state.web3.coinbase
        },
        (err, result) => {
          if (err) {
            console.log(err)
            this.pending = false
          } else {
            this.pools = []
            result.forEach((item, index) => {
              this.loadPoolDetails(item)
            })
          }
        }
      )
    },
    sleep (milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds))
    },
    async loadPoolDetails (poolAddress) {
      console.log('dispatching getPoolContractInstance')
      this.$store.dispatch('getPoolContractInstance', {
        address: poolAddress
      })
      while (this.$store.state.poolContractInstance === null) {
        await this.sleep(100)
      }

      this.$store.state.poolContractInstance().getVault.call(
        {
          from: this.$store.state.web3.coinbase
        },
        (err, result) => {
          if (err) {
            console.log(err)
            this.pending = false
          } else {
            const newPool = {
              id: poolAddress,
              address: poolAddress,
              vault: result
            }
            this.pools.push(newPool)
          }
        }
      )
    },
    triggerRun (idx) {
      this.$store.state.controllerContractInstance().runCheck(
        idx,
        {
          // gas: 15696230, //  Gnosis
          gas: 15696230,
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
    },
    addPool (name, symbol) {
      this.$store.state.controllerContractInstance().createPool(
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
          // gas: 15696230, //  Gnosis
          gas: 15696230,
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
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from controller-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'pool-details': PoolDetails,
    'new-pool': NewPool,
    'controller-createpool': ControllerCreatePool
  },
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  }
}
</script>
<style scoped>
</style>
