<template>
   <section>
    <hello-metamask/>
    <header>
      <h1>Create managed pool</h1>
    </header>
    <ul>
        <li><strong>Auto-managed pools are created and owned by the controller.<br>
          </strong><font size="1">
            The controllers owner issues requests to the controller to take actions such as triggering balancing actions but
          all pool shares and control rests with the controller.
        </font></li>
    </ul>
    <new-automanaged-pool @add-automanaged-pool="addAutoManagedPool"></new-automanaged-pool>
    <br>
    <ul>
        <li><strong>Self-managed pools are created and owned by the caller.<br>
          </strong><font size="1">
            Self-managed pools are managed pools created and owned by the caller.
        </font></li>
    </ul>
    <new-selfmanaged-pool @add-selfmanaged-pool="addSelfManagedPool"></new-selfmanaged-pool>
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
          @SwitchSwapEnabled="SwitchSwapEnabledRun"
        ></pool-details>
      </li>
    </ul>
    <header>
      <h1>Self-managed pool</h1>
    </header>
    <ul>
      <li>
        <reservepool-details
          v-for="pool in reservePools"
          :key="pool.id"
          :id="pool.id"
          :address="pool.address"
          :isSwapEnabled="pool.isSwapEnabled"
          @SwitchSwapEnabled="SwitchSwapEnabledRun"
        ></reservepool-details>
      </li>
    </ul>
    <register-selfmanaged-pool @register-selfmanaged-pool="registerSelfManagedPool" @deregister-selfmanaged-pool="deregisterSelfManagedPool"></register-selfmanaged-pool>
  </section>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import PoolDetails from '@/components/pool-details'
import reservePoolDetails from '@/components/reservepool-details'
import NewAutomanagedPool from '@/components/new-automanaged-pool'
import NewManagedPool from '@/components/new-selfmanaged-pool'
import NewRegisterSelfManagedPool from '@/components/register-selfmanaged-pool'
export default {
  name: 'controller-dapp',
  data () {
    return {
      pools: [
      ],
      poolCount: 0,
      poolAddresses: [

      ],
      reservePools: [

      ],
      reservePoolCount: 0,
      reservePoolAddresses: [

      ]
    }
  },
  methods: {
    sleep (milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds))
    },
    registerRun (managedPoolAddress, reserveTokenAddress) {
      this.$store.state.registerControllerContractInstance().registerManagedPool(
        managedPoolAddress,
        reserveTokenAddress,
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
    triggerRun (managedPoolAddress) {
      this.$store.state.bondingCurveControllerContractInstance().runCheck(
        managedPoolAddress,
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
    SwitchSwapEnabledRun (switchSwapEnabledValue, managedPoolAddress) {
      this.$store.state.bondingCurveControllerContractInstance().setSwapEnabled(
        managedPoolAddress,
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
    addAutoManagedPool (name, symbol, poolTokens, poolNormalisedWeights, poolAssetManagers, swapFeePercentage, swapEnabledOnStart, mustAllowListLPs, managementAumFeePercentage, aumFeeId, tolerance, salt) {
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
    },
    registerSelfManagedPool (poolAddress, reserveTokenAddress) {
      this.$store.state.reserveControllerContractInstance().registerManagedPool(
        poolAddress,
        reserveTokenAddress,
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
    },
    deregisterSelfManagedPool (poolAddress, reserveTokenAddress) {
      this.$store.state.reserveControllerContractInstance().deregisterManagedPool(
        poolAddress,
        reserveTokenAddress,
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
    },
    addSelfManagedPool (name, symbol, poolTokens, poolNormalisedWeights, poolAssetManagers, swapFeePercentage, swapEnabledOnStart, mustAllowListLPs, managementAumFeePercentage, aumFeeId, salt) {
      this.$store.state.reserveControllerContractInstance().createPool(
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
        salt,
        poolTokens[0],
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
    'reservepool-details': reservePoolDetails,
    'new-automanaged-pool': NewAutomanagedPool,
    'new-selfmanaged-pool': NewManagedPool,
    'register-selfmanaged-pool': NewRegisterSelfManagedPool
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
                        const newAutomanagedPool = {
                          id: id,
                          address: this.poolAddresses[index],
                          isSwapEnabled: isSwapEnabled
                        }
                        this.pools.push(newAutomanagedPool)
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
    await this.$store.state.reserveControllerContractInstance().getRegisteredPools.call(
      {
        from: this.$store.state.web3.coinbase
      },
      (err, poolSet) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          this.reservePools = []
          poolSet.forEach((item, index) => {
            console.log('dispatching getReservePoolContractInstance')
            this.$store.dispatch('getReservePoolContractInstance', {
              address: item
            })
            this.reservePoolAddresses.push(item)
          })
          this.reservePoolCount = poolSet.length
        }
      }
    )
    while (this.$store.state.reservePoolContractInstance === null || this.$store.state.reservePoolContractInstance.length !== this.reservePoolCount) {
      await this.sleep(100)
    }
    this.reservePools = []
    this.$store.state.reservePoolContractInstance.forEach((poolId, index) => {
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
                    this.reservePoolAddresses[index],
                    {
                      from: this.$store.state.web3.coinbase
                    },
                    (err, circuitBreakerState) => {
                      if (err) {
                        console.log(err)
                        this.pending = false
                      } else {
                        const newSelfmanagedPool = {
                          id: id,
                          address: this.reservePoolAddresses[index],
                          isSwapEnabled: isSwapEnabled
                        }
                        this.reservePools.push(newSelfmanagedPool)
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
