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
          @buy="buyRun"
          @sell="sellRun"
          @add="addRun"
        ></reservepool-details>
      </li>
    </ul>
    <register-selfmanaged-pool @register-selfmanaged-pool="registerSelfManagedPool" @deregister-selfmanaged-pool="deregisterSelfManagedPool"></register-selfmanaged-pool>
  </section>
</template>
<script>
import { defaultAbiCoder } from '@ethersproject/abi'
import BigNumber from 'bignumber.js'
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
      this.$store.state.reserveControllerContractInstance().methods.registerManagedPool(
        managedPoolAddress,
        reserveTokenAddress)
        .on('transactionHash', function (hash) {
          console.log(hash)
          this.pending = false
        })
        .on('error', function (error, receipt) {
          console.log(error)
          this.pending = false
        })
    },
    triggerRun (managedPoolAddress) {
      this.$store.state.bondingCurveControllerContractInstance().methods.runCheck(
        managedPoolAddress)
        .send({
          gas: 15696230,
          from: this.$store.state.web3.coinbase
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
          this.pending = false
        })
        .on('error', function (error, receipt) {
          console.log(error)
          this.pending = false
        })
    },
    buyRun (managedPoolAddress, amount, recipient) {
      this.$store.state.reserveControllerContractInstance().methods.buyReserveToken(
        managedPoolAddress,
        amount,
        recipient)
        .send({
          gas: 15696230,
          from: this.$store.state.web3.coinbase
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
          this.pending = false
        })
        .on('error', function (error, receipt) {
          console.log(error)
          this.pending = false
        })
    },
    sellRun (reserveTokenAddress, managedPoolAddress, amount, recipient) {
      this.$store.state.reserveControllerContractInstance().methods.sellReserveToken(
        reserveTokenAddress,
        managedPoolAddress,
        amount,
        recipient)
        .send({
          gas: 15696230,
          from: this.$store.state.web3.coinbase
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
          this.pending = false
        })
        .on('error', function (error, receipt) {
          console.log(error)
          this.pending = false
        })
    },
    addRun (poolId, amount) {
      const JOIN_KIND_EXACT_TOKENS_IN_FOR_BPT_OUT = 1

      const tokenBalances = [
        new BigNumber(amount).toString(), // 18 demials
        new BigNumber(amount).toString() // 18 decimals
      ]

      const initUserData = defaultAbiCoder.encode(
        ['uint256', 'uint256[]', 'uint256'],
        [JOIN_KIND_EXACT_TOKENS_IN_FOR_BPT_OUT, tokenBalances, 10]
      )

      var defaults = {
        assets: ['0x785fa6c4383c42def4182c1820d23f1196a112ce', '0x900b0c0762f7ee2d68eb07bb5d17629298aecb9a'],
        maxAmountsIn: tokenBalances,
        userData: initUserData,
        fromInternalBalance: false
      }
      console.log('defaults: ')
      console.log(defaults)

      this.$store.state.vaultContractInstance().methods.joinPool(
        poolId,
        this.$store.state.web3.coinbase,
        this.$store.state.web3.coinbase,
        [defaults])
        .send({
          gas: 15696230,
          from: this.$store.state.web3.coinbase
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
          this.pending = false
        })
        .on('error', function (error, receipt) {
          console.log(error)
          this.pending = false
        })

      /* this.$store.state.reserveControllerContractInstance().JoinPool(
        poolId,
        this.$store.state.web3.coinbase,
        this.$store.state.web3.coinbase,
        ['0x785fa6c4383c42def4182c1820d23f1196a112ce', '0x900b0c0762f7ee2d68eb07bb5d17629298aecb9a'],
        tokenBalances,
        initUserData,
        false,
        {
          gas: 15696230,
          from: this.$store.state.web3.coinbase,
          value: this.$store.state.web3
            .web3Instance()
            .toWei(this.amount, 'ether')
        },
        (err, result) => {
          if (err) {
            console.log(err)
            this.pending = false
          }
        }
      ) */
    },
    SwitchSwapEnabledRun (switchSwapEnabledValue, managedPoolAddress) {
      this.$store.state.bondingCurveControllerContractInstance().methods.setSwapEnabled(
        managedPoolAddress,
        switchSwapEnabledValue)
        .send({
          gas: 15696230,
          from: this.$store.state.web3.coinbase
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
          this.pending = false
        })
        .on('error', function (error, receipt) {
          console.log(error)
          this.pending = false
        })
    },
    addAutoManagedPool (name, symbol, poolTokens, poolNormalisedWeights, poolAssetManagers, swapFeePercentage, swapEnabledOnStart, mustAllowListLPs, managementAumFeePercentage, aumFeeId, tolerance, salt) {
      this.$store.state.bondingCurveControllerContractInstance().methods.createPool(
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
        salt)
        .send({
          gas: 15696230,
          from: this.$store.state.web3.coinbase
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
          this.pending = false
        })
        .on('error', function (error, receipt) {
          console.log(error)
          this.pending = false
        })
    },
    registerSelfManagedPool (poolAddress, reserveTokenAddress) {
      this.$store.state.reserveControllerContractInstance().methods.registerManagedPool(
        poolAddress,
        reserveTokenAddress)
        .send({
          gas: 15696230,
          from: this.$store.state.web3.coinbase
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
          this.pending = false
        })
        .on('error', function (error, receipt) {
          console.log(error)
          this.pending = false
        })
    },
    deregisterSelfManagedPool (poolAddress, reserveTokenAddress) {
      this.$store.state.reserveControllerContractInstance().methods.deregisterManagedPool(
        poolAddress,
        reserveTokenAddress)
        .send({
          gas: 15696230,
          from: this.$store.state.web3.coinbase
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
          this.pending = false
        })
        .on('error', function (error, receipt) {
          console.log(error)
          this.pending = false
        })
    },
    addSelfManagedPool (name, symbol, poolTokens, poolNormalisedWeights, poolAssetManagers, swapFeePercentage, swapEnabledOnStart, mustAllowListLPs, managementAumFeePercentage, aumFeeId, salt, reserveToken) {
      this.$store.state.reserveControllerContractInstance().methods.createPool(
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
        salt)
        .send({
          gas: 15696230,
          from: this.$store.state.web3.coinbase
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
          this.pending = false
        })
        .on('error', function (error, receipt) {
          console.log(error)
          this.pending = false
        })
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
      await this.sleep(1000)
    }
    this.$store.state.bondingCurveControllerContractInstance().methods.getPoolsUnderManagement().call((err, poolSet) => {
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
    })

    while (this.$store.state.poolContractInstance === null || this.$store.state.poolContractInstance.length !== this.poolCount) {
      await this.sleep(100)
    }
    this.pools = []
    this.$store.state.poolContractInstance.forEach((poolId, index) => {
      poolId().methods.getPoolId().call(
        (err, id) => {
          if (err) {
            console.log(err)
            this.pending = false
          } else {
            poolId().methods.getSwapEnabled().call(
              (err, isSwapEnabled) => {
                if (err) {
                  console.log(err)
                  this.pending = false
                } else {
                  poolId().methods.getCircuitBreakerState(this.poolAddresses[index]).call(
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
    await this.$store.state.reserveControllerContractInstance().methods.getRegisteredPools().call((err, poolSet) => {
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
      poolId().methods.getPoolId().call((err, id) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          poolId().methods.getSwapEnabled().call(
            (err, isSwapEnabled) => {
              if (err) {
                console.log(err)
                this.pending = false
              } else {
                poolId().methods.getCircuitBreakerState(this.reservePoolAddresses[index]).call((err, circuitBreakerState) => {
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
