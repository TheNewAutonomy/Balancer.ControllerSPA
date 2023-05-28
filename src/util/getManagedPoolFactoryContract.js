import Web3 from 'web3'
import {address, ABI} from './constants/managedPoolFactory'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let managedPoolFactory = web3.eth.contract(ABI)
  let managedPoolFactoryContractInstance = managedPoolFactory.at(address)
  console.log(managedPoolFactory)
  console.log(managedPoolFactoryContractInstance)
  resolve(managedPoolFactoryContractInstance)
})

export default getContract
