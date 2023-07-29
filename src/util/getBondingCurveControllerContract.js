import Web3 from 'web3'
import {address, ABI} from './constants/bondingCurveController'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let bondingCurveControllerContractInstance = new web3.eth.Contract(ABI, address)
  resolve(bondingCurveControllerContractInstance)
})

export default getContract
