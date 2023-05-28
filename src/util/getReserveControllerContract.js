import Web3 from 'web3'
import {address, ABI} from './constants/reserveController'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let reserveController = web3.eth.contract(ABI)
  let reserveControllerContractInstance = reserveController.at(address)
  console.log(reserveController)
  console.log(reserveControllerContractInstance)
  resolve(reserveControllerContractInstance)
})

export default getContract
