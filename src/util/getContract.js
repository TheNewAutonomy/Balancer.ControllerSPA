import Web3 from 'web3'
import {address, ABI} from './constants/controllerContract'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let controllerContract = web3.eth.contract(ABI)
  let controllerContractInstance = controllerContract.at(address)
  console.log(controllerContract)
  console.log(controllerContractInstance)
  resolve(controllerContractInstance)
})

export default getContract
