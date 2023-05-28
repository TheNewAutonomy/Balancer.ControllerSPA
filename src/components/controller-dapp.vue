<template>
   <section>
    <hello-metamask/>
    <header>
      <h1>Create auto-managed pool</h1>
    </header>
    <new-pool @add-pool="addPool"></new-pool>
    <header>
      <h1>Auto-managed pools</h1>
    </header>
    <ul>
      <li>
        <pool-details
          v-for="pool in pools"
          :key="pool.id"
          :id="pool.id"
          :address="pool.address"
          :isSwapEnabled="pool.isSwapEnabled"
          @trigger="triggerRun"
          @register="registerRun"
          @SwitchSwapEnabled="SwitchSwapEnabledRun"
        ></pool-details>
      </li>
    </ul>
  </section>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import PoolDetails from '@/components/pool-details'
import NewPool from '@/components/new-pool'
export default {
  name: 'controller-dapp',
  data () {
    return {
      pools: [
      ],
      poolCount: 0,
      poolAddresses: [

      ]
    }
  },
  methods: {
    sleep (milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds))
    },
    registerRun (idx, reserveAddress) {
      this.$store.state.registerControllerContractInstance().registerManagedPool(
        idx,
        reserveAddress,
        {
          gas: 15696230,
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
    triggerRun (idx, id) {
      this.$store.state.bondingCurveControllerContractInstance().runCheck(
        idx,
        {
          gas: 15696230,
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
    SwitchSwapEnabledRun (switchSwapEnabledValue, address) {
      this.$store.state.bondingCurveControllerContractInstance().setSwapEnabled(
        address,
        switchSwapEnabledValue,
        {
          gas: 15696230,
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
    addPool (name, symbol, poolTokens, poolNormalisedWeights, poolAssetManagers, swapFeePercentage, swapEnabledOnStart, mustAllowListLPs, managementAumFeePercentage, aumFeeId, tolerance, salt) {
      this.$store.state.bondingCurveControllerContractInstance().createPool(
        name,
        symbol,
        poolTokens,
        poolNormalisedWeights,
        poolAssetManagers,
        swapFeePercentage,
        swapEnabledOnStart,
        mustAllowListLPs,
        managementAumFeePercentage,
        aumFeeId,
        tolerance,
        salt,
        {
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
    'new-pool': NewPool
  },
  async mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')

    this.pools = []

    while (this.$store.state.bondingCurveControllerContractInstance === null) {
      await this.sleep(100)
    }

    await this.$store.state.bondingCurveControllerContractInstance().getPoolsUnderManagement.call(
      {
        from: this.$store.state.web3.coinbase
      },
      (err, poolSet) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          this.pools = []
          poolSet.forEach((item, index) => {
            console.log('dispatching getPoolContractInstance')
            this.$store.dispatch('getPoolContractInstance', {
              address: item
            })
            this.poolAddresses.push(item)
          })
          this.poolCount = poolSet.length
        }
      }
    )
    while (this.$store.state.poolContractInstance === null || this.$store.state.poolContractInstance.length !== this.poolCount) {
      await this.sleep(100)
    }
    this.pools = []
    this.$store.state.poolContractInstance.forEach((poolId, index) => {
      poolId().getPoolId.call(
        {
          from: this.$store.state.web3.coinbase
        },
        (err, id) => {
          if (err) {
            console.log(err)
            this.pending = false
          } else {
            poolId().getSwapEnabled.call(
              {
                from: this.$store.state.web3.coinbase
              },
              (err, isSwapEnabled) => {
                if (err) {
                  console.log(err)
                  this.pending = false
                } else {
                  poolId().getCircuitBreakerState.call(
                    this.poolAddresses[index],
                    {
                      from: this.$store.state.web3.coinbase
                    },
                    (err, circuitBreakerState) => {
                      if (err) {
                        console.log(err)
                        this.pending = false
                      } else {
                        console.log('FFFFFF')
                        console.log(circuitBreakerState)

                        const newPool = {
                          id: id,
                          address: this.poolAddresses[index],
                          isSwapEnabled: isSwapEnabled
                        }
                        this.pools.push(newPool)
                      }
                    }
                  )
                }
              }
            )
          }
        }
      )
    })
  }
}
</script>
<style scoped>
</style>
