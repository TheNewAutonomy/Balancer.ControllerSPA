// const address = '0x39d3541477EcDa2C0409462D653Da2c40a467960' // Celo
// const address = '0x57155520Dcc18bE602071247d3c39C07F2Cc9836' // Gnosis
const address = "0xCFf82ec7E6De78191D78753b7B944Ea8f28a0ce8";
const ABI = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "_vaultAddress", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "buyReserveToken",
    inputs: [
      { type: "address", name: "_tokenIn", internalType: "address" },
      { type: "uint256", name: "_amountIn", internalType: "uint256" },
      { type: "address", name: "_recipient", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "deRegisterManagedPool",
    inputs: [{ type: "address", name: "_managedPool", internalType: "address" }]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "manager",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "registerManagedPool",
    inputs: [
      { type: "address", name: "_managedPool", internalType: "address" },
      { type: "address", name: "_reserveToken", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "sellReserveToken",
    inputs: [
      { type: "address", name: "_tokenIn", internalType: "address" },
      { type: "address", name: "_pool", internalType: "address" },
      { type: "uint256", name: "_amountIn", internalType: "uint256" },
      { type: "address", name: "_recipient", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferManagement",
    inputs: [{ type: "address", name: "_manager", internalType: "address" }]
  }
];
export { address, ABI };
