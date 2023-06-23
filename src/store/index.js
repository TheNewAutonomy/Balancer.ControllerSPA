import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import getBondingCurveControllerContract from '../util/getBondingCurveControllerContract'
import getReserveControllerContract from '../util/getReserveControllerContract'
import getPoolContract from '../util/getPoolContract'

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
      web3Copy.web3Instance = result.web3
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
    registerPoolContractInstance (state, payload) {
      console.log('Pool contract instance: ', payload)

      if (state.poolContractInstance === null) {
        state.poolContractInstance = []
      }
      state.poolContractInstance.push(() => payload)
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
    },
    getPoolContractInstance ({commit}, pool) {
      getPoolContract(pool, {commit})
    }
  }
})
