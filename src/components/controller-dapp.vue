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
          @trigger="triggerRun"
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
          @buy="buyRun"
          @sell="sellRun"
        ></reservepool-details>
      </li>
    </ul>
    <register-selfmanaged-pool @register-selfmanaged-pool="registerSelfManagedPool" @deregister-selfmanaged-pool="deregisterSelfManagedPool"></register-selfmanaged-pool>
  </section>
</template>
<script>
import { defaultAbiCoder } from '@ethersproject/abi'
import HelloMetamask from '@/components/hello-metamask'
import PoolDetails from '@/components/pool-details'
import reservePoolDetails from '@/components/reservepool-details'
import NewAutomanagedPool from '@/components/new-automanaged-pool'
import NewManagedPool from '@/components/new-selfmanaged-pool'
import NewRegisterSelfManagedPool from '@/components/register-selfmanaged-pool'

const WeightedPoolJoinKind = {
  INIT: 0,
  EXACT_TOKENS_IN_FOR_BPT_OUT: 1,
  TOKEN_IN_FOR_EXACT_BPT_OUT: 2,
  ALL_TOKENS_IN_FOR_EXACT_BPT_OUT: 3,
  ADD_TOKEN: 4
}

const WeightedPoolExitKind = {
  EXACT_BPT_IN_FOR_ONE_TOKEN_OUT: 0,
  EXACT_BPT_IN_FOR_TOKENS_OUT: 1,
  BPT_IN_FOR_EXACT_TOKENS_OUT: 2,
  REMOVE_TOKEN: 3
}

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
    /**
     * Encodes the userData parameter for providing the initial liquidity to a WeightedPool
     * @param initialBalances - the amounts of tokens to send to the pool to form the initial balances
     */
    joinInit (amountsIn) {
      return defaultAbiCoder.encode(['uint256', 'uint256[]'], [WeightedPoolJoinKind.INIT, amountsIn])
    },
    /**
     * Encodes the userData parameter for joining a WeightedPool with exact token inputs
     * @param amountsIn - the amounts each of token to deposit in the pool as liquidity
     * @param minimumBPT - the minimum acceptable BPT to receive in return for deposited tokens
     */
    joinExactTokensInForBPTOut (amountsIn, minimumBPT) {
      return defaultAbiCoder.encode(
        ['uint256', 'uint256[]', 'uint256'],
        [WeightedPoolJoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT, amountsIn, minimumBPT]
      )
    },
    /**
     * Encodes the userData parameter for joining a WeightedPool with a single token to receive an exact amount of BPT
     * @param bptAmountOut - the amount of BPT to be minted
     * @param enterTokenIndex - the index of the token to be provided as liquidity
     */
    joinTokenInForExactBPTOut (bptAmountOut, enterTokenIndex) {
      return defaultAbiCoder.encode(
        ['uint256', 'uint256', 'uint256'],
        [WeightedPoolJoinKind.TOKEN_IN_FOR_EXACT_BPT_OUT, bptAmountOut, enterTokenIndex]
      )
    },
    /**
     * Encodes the userData parameter for joining a WeightedPool proportionally to receive an exact amount of BPT
     * @param bptAmountOut - the amount of BPT to be minted
     */
    joinAllTokensInForExactBPTOut (bptAmountOut) {
      return defaultAbiCoder.encode(
        ['uint256', 'uint256'],
        [WeightedPoolJoinKind.ALL_TOKENS_IN_FOR_EXACT_BPT_OUT, bptAmountOut]
      )
    },
    /**
     * Encodes the userData parameter for exiting a WeightedPool by removing a single token in return for an exact amount of BPT
     * @param bptAmountIn - the amount of BPT to be burned
     * @param enterTokenIndex - the index of the token to removed from the pool
     */
    exitExactBPTInForOneTokenOut (bptAmountIn, exitTokenIndex) {
      return defaultAbiCoder.encode(
        ['uint256', 'uint256', 'uint256'],
        [WeightedPoolExitKind.EXACT_BPT_IN_FOR_ONE_TOKEN_OUT, bptAmountIn, exitTokenIndex]
      )
    },
    /**
     * Encodes the userData parameter for exiting a WeightedPool by removing tokens in return for an exact amount of BPT
     * @param bptAmountIn - the amount of BPT to be burned
     */
    exitExactBPTInForTokensOut (bptAmountIn) {
      return defaultAbiCoder.encode(['uint256', 'uint256'], [WeightedPoolExitKind.EXACT_BPT_IN_FOR_TOKENS_OUT, bptAmountIn])
    },
    /**
     * Encodes the userData parameter for exiting a WeightedPool by removing exact amounts of tokens
     * @param amountsOut - the amounts of each token to be withdrawn from the pool
     * @param maxBPTAmountIn - the minimum acceptable BPT to burn in return for withdrawn tokens
     */
    exitBPTInForExactTokensOut (amountsOut, maxBPTAmountIn) {
      return defaultAbiCoder.encode(
        ['uint256', 'uint256[]', 'uint256'],
        [WeightedPoolExitKind.BPT_IN_FOR_EXACT_TOKENS_OUT, amountsOut, maxBPTAmountIn]
      )
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
          gas: 25696230,
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
    async buyRun (weightedPoolAddress, amount, recipient) {
      this.$store.state.reservePoolContractInstance.forEach((pool, index) => {
        if (this.reservePoolAddresses[index] === weightedPoolAddress) {
          pool().methods.approve('0xdfD5DCd09915318a5D2625771a78Cf8dBEE0b471', amount)
            .send({
              gas: 15696230,
              from: this.$store.state.web3.coinbase
            })
            .on('transactionHash', (hash) => {
              console.log(hash)
              this.$store.state.reserveControllerContractInstance().methods.buyReserveToken(
                weightedPoolAddress,
                amount,
                recipient)
                .send({
                  gas: 15696230,
                  from: this.$store.state.web3.coinbase
                })
                .on('transactionHash', (hash) => {
                  console.log(hash)
                })
                .on('error', (error, receipt) => {
                  console.log(error)
                })
            })
            .on('error', (error, receipt) => {
              console.log(error)
            })
        }
      })
    },
    async sellRun (weightedPoolAddress, amount, recipient) {
      if (this.$store.state.erc20ContractInstance === null) {
        this.$store.dispatch('getERC20ContractInstance', {
          address: '0x7d9d314Ee8183653F800e551030d0b27663A1557'
        })

        while (this.$store.state.erc20ContractInstance === null) {
          await this.sleep(100)
        }
      }
      this.$store.state.reservePoolContractInstance.forEach((pool, index) => {
        if (this.reservePoolAddresses[index] === weightedPoolAddress) {
          this.$store.state.erc20ContractInstance().methods.approve('0xc5dDb8822B874Af7eBE4FAC4BBBc4B1B43A5aD85', amount)
            .send({
              gas: 15696230,
              from: this.$store.state.web3.coinbase
            })
            .on('transactionHash', (hash) => {
              console.log(hash)
              this.$store.state.reserveControllerContractInstance().methods.sellReserveToken(
                weightedPoolAddress,
                amount,
                recipient)
                .send({
                  gas: 15696230,
                  from: this.$store.state.web3.coinbase
                })
                .on('transactionHash', (hash) => {
                  console.log(hash)
                })
                .on('error', (error, receipt) => {
                  console.log(error)
                })
            })
            .on('error', (error, receipt) => {
              console.log(error)
            })
        }
      })
    },
    SwitchSwapEnabledRun (switchSwapEnabledValue, weightedPoolAddress) {
      this.$store.state.bondingCurveControllerContractInstance().methods.setSwapEnabled(
        weightedPoolAddress,
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
        swapFeePercentage,
        tolerance)
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
      this.$store.state.reserveControllerContractInstance().methods.registerWeightedPool(
        poolAddress)
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
            const newAutomanagedPool = {
              id: id,
              address: this.poolAddresses[index]
            }
            this.pools.push(newAutomanagedPool)
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
          const newSelfmanagedPool = {
            id: id,
            address: this.reservePoolAddresses[index]
          }
          this.reservePools.push(newSelfmanagedPool)
        }
      }
      )
    })
  }
}
</script>
<style scoped>
</style>
