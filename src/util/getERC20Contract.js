import Web3 from 'web3'
import {ABI} from './constants/erc20Contract'

function getERC20Contract (token, {commit}) {
  new Promise(function (resolve, reject) {
    let web3 = new Web3(window.web3.currentProvider)
    let erc20ContractInstance = new web3.eth.Contract(ABI, token.address)
    resolve(erc20ContractInstance)
  })
    .then(result => {
      commit('registerErc20ContractInstance', result)
    }).catch(e => console.log(e))
}

export default getERC20Contract
