import Web3 from 'web3'
import {ABI} from './constants/poolContract'

function getReservePoolContract (pool, {commit}) {
  new Promise(function (resolve, reject) {
    let web3 = new Web3(window.web3.currentProvider)
    let poolContract = web3.eth.contract(ABI)
    let poolContractInstance = poolContract.at(pool.address)
    console.log(poolContract)
    console.log(poolContractInstance)
    resolve(poolContractInstance)
  })
    .then(result => {
      console.log(result)
      commit('registerReservePoolContractInstance', result)
    }).catch(e => console.log(e))
}

export default getReservePoolContract
