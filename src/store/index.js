import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import getBondingCurveControllerContract from '../util/getBondingCurveControllerContract'
import getReserveControllerContract from '../util/getReserveControllerContract'
import getVaultContract from '../util/getVaultContract'
import getPoolContract from '../util/getPoolContract'
import getReservePoolContract from '../util/getReservePoolContract'
import getERC20Contract from '../util/getERC20Contract'

Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance (state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload)
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      state.web3 = web3Copy
      pollWeb3()
    },
    pollWeb3Instance (state, payload) {
      console.log('pollWeb3Instance mutation being executed', payload)
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
    },
    registerBondingCurveContractInstance (state, payload) {
      console.log('Bonding Curve Controller contract instance: ', payload)
      state.bondingCurveControllerContractInstance = () => payload
    },
    registerReserveContractInstance (state, payload) {
      console.log('Reserve Controller contract instance: ', payload)
      state.reserveControllerContractInstance = () => payload
    },
    registerVaultContractInstance (state, payload) {
      console.log('Vault contract instance: ', payload)
      state.vaultContractInstance = () => payload
    },
    registerPoolContractInstance (state, payload) {
      console.log('Pool contract instance: ', payload)

      if (state.poolContractInstance === null) {
        state.poolContractInstance = []
      }
      state.poolContractInstance.push(() => payload)
    },
    registerErc20ContractInstance (state, payload) {
      console.log('Token contract instance: ', payload)
      state.erc20ContractInstance = () => payload
    },
    registerReservePoolContractInstance (state, payload) {
      console.log('Reserve pool contract instance: ', payload)

      if (state.reservePoolContractInstance === null) {
        state.reservePoolContractInstance = []
      }
      state.reservePoolContractInstance.push(() => payload)
    }
  },
  actions: {
    registerWeb3 ({commit}) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },
    pollWeb3 ({commit}, payload) {
      console.log('pollWeb3 action being executed')
      commit('pollWeb3Instance', payload)
    },
    getContractInstance ({commit}) {
      getBondingCurveControllerContract.then(result => {
        commit('registerBondingCurveContractInstance', result)
      }).catch(e => console.log(e))

      getReserveControllerContract.then(result => {
        commit('registerReserveContractInstance', result)
      }).catch(e => console.log(e))

      getVaultContract.then(result => {
        commit('registerVaultContractInstance', result)
      }).catch(e => console.log(e))
    },
    getPoolContractInstance ({commit}, pool) {
      getPoolContract(pool, {commit})
    },
    getReservePoolContractInstance ({commit}, pool) {
      getReservePoolContract(pool, {commit})
    },
    getERC20ContractInstance ({commit}, token) {
      getERC20Contract(token, {commit})
    }
  }
})
