import Web3 from 'web3'
import {ABI} from './constants/poolContract'

function getReservePoolContract (pool, {commit}) {
  new Promise(function (resolve, reject) {
    let web3 = new Web3(window.web3.currentProvider)
    let reserveControllerContractInstance = new web3.eth.Contract(ABI, pool.address)
    resolve(reserveControllerContractInstance)
  })
    .then(result => {
      console.log(result)
      commit('registerReservePoolContractInstance', result)
    }).catch(e => console.log(e))
}

export default getReservePoolContract
