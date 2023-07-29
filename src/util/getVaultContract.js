import Web3 from 'web3'
import {address, ABI} from './constants/vault'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let vaultContractInstance = new web3.eth.Contract(ABI, address)
  resolve(vaultContractInstance)
})

export default getContract
