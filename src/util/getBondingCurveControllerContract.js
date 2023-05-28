import Web3 from 'web3'
import {address, ABI} from './constants/bondingCurveController'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let bondingCurveController = web3.eth.contract(ABI)
  let bondingCurveControllerContractInstance = bondingCurveController.at(address)
  console.log(bondingCurveController)
  console.log(bondingCurveControllerContractInstance)
  resolve(bondingCurveControllerContractInstance)
})

export default getContract
