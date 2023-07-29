import Web3 from 'web3'
import {ABI} from './constants/poolContract'

function getPoolContract (pool, {commit}) {
  new Promise(function (resolve, reject) {
    let web3 = new Web3(window.web3.currentProvider)
    let poolContractInstance = new web3.eth.Contract(ABI, pool.address)
    resolve(poolContractInstance)
  })
    .then(result => {
      console.log(result)
      commit('registerPoolContractInstance', result)
    }).catch(e => console.log(e))
}

export default getPoolContract
