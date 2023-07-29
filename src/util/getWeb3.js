import MetaMaskSDK from '@metamask/sdk'
var Web3 = require('web3')
var web3 = new Web3(Web3.givenProvider)

/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

const sdk = new MetaMaskSDK({
  shouldShimWeb3: false,
  showQRCode: true
})

const ethereum = sdk.getProvider()

const hexToDecimal = hex => parseInt(hex, 16)

let coinbase = ''
let chainId = ''
let balance = 1

const start = async (resolve) => {
  const accounts = await ethereum.request({
    method: 'eth_requestAccounts',
    params: []
  })
  coinbase = accounts[0]
  console.log('account: ' + accounts)

  chainId = await ethereum.request({
    method: 'eth_chainId',
    params: []
  })

  const dec = hexToDecimal(chainId)
  console.log('chainId: ' + dec)

  balance = await ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] })
  console.log('balance: ' + balance)

  resolve({
    injectedWeb3: true,
    networkId: dec,
    coinbase: coinbase,
    balance: balance,
    web3: web3
  })
}

let getWeb3 = new Promise(function (resolve, reject) {
  start(resolve)
})

export default getWeb3
