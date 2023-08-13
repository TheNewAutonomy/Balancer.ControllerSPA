let state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null
  },
  bondingCurveControllerContractInstance: null,
  reserveControllerContractInstance: null,
  poolContractInstance: null,
  erc20ContractInstance: null,
  reservePoolContractInstance: null,
  vaultContractInstance: null
}
export default state
