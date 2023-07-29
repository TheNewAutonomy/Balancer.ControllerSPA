// const address = '0x39d3541477EcDa2C0409462D653Da2c40a467960' // Celo
// const address = '0x57155520Dcc18bE602071247d3c39C07F2Cc9836' // Gnosis
const address = "0xCFf82ec7E6De78191D78753b7B944Ea8f28a0ce8";
const ABI = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "_vaultAddress", internalType: "address" },
      { type: "address", name: "_managedPoolFactory", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addAllowedAddress",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      { type: "address", name: "_member", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addToken",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      { type: "address", name: "_tokenToAdd", internalType: "contract IERC20" },
      { type: "address", name: "_assetManager", internalType: "address" },
      {
        type: "uint256",
        name: "_tokenToAddNormalizedWeight",
        internalType: "uint256"
      },
      { type: "uint256", name: "_mintAmount", internalType: "uint256" },
      { type: "address", name: "_recipient", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "collectAumManagementFees",
    inputs: [{ type: "address", name: "_poolAddress", internalType: "address" }]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "createPool",
    inputs: [
      { type: "string", name: "_name", internalType: "string" },
      { type: "string", name: "_symbol", internalType: "string" },
      { type: "address[]", name: "_tokens", internalType: "contract IERC20[]" },
      {
        type: "uint256[]",
        name: "_normalizedWeights",
        internalType: "uint256[]"
      },
      { type: "address[]", name: "_assetManagers", internalType: "address[]" },
      { type: "uint256", name: "_swapFeePercentage", internalType: "uint256" },
      { type: "bool", name: "_swapEnabledOnStart", internalType: "bool" },
      { type: "bool", name: "_mustAllowlistLPs", internalType: "bool" },
      {
        type: "uint256",
        name: "_managementAumFeePercentage",
        internalType: "uint256"
      },
      { type: "uint256", name: "_aumFeeId", internalType: "uint256" },
      { type: "uint256", name: "_tolerance", internalType: "uint256" },
      { type: "bytes32", name: "_salt", internalType: "bytes32" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "depositTokens",
    inputs: [
      { type: "uint256", name: "_amount", internalType: "uint256" },
      { type: "address", name: "_tokenAddress", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bytes32", name: "", internalType: "bytes32" }],
    name: "getPoolId",
    inputs: [{ type: "address", name: "_poolAddress", internalType: "address" }]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address[]", name: "", internalType: "address[]" }],
    name: "getPoolsUnderManagement",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "getSwapEnabled",
    inputs: [{ type: "address", name: "_poolAddress", internalType: "address" }]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "", internalType: "contract ManagedPoolFactory" }
    ],
    name: "managedPoolFactory",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "string", name: "poolName", internalType: "string" },
      { type: "string", name: "poolSymbol", internalType: "string" },
      { type: "uint256", name: "tolerance", internalType: "uint256" }
    ],
    name: "managedPools",
    inputs: [{ type: "address", name: "", internalType: "address" }]
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
    name: "removeAllowedAddress",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      { type: "address", name: "_member", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "removeToken",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      {
        type: "address",
        name: "_tokenToRemove",
        internalType: "contract IERC20"
      },
      { type: "uint256", name: "_burnAmount", internalType: "uint256" },
      { type: "address", name: "_sender", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "runCheck",
    inputs: [{ type: "address", name: "_poolAddress", internalType: "address" }]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setCircuitBreakers",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      { type: "address[]", name: "_tokens", internalType: "contract IERC20[]" },
      { type: "uint256[]", name: "_bptPrices", internalType: "uint256[]" },
      {
        type: "uint256[]",
        name: "_lowerBoundPercentages",
        internalType: "uint256[]"
      },
      {
        type: "uint256[]",
        name: "_upperBoundPercentages",
        internalType: "uint256[]"
      }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setJoinExitEnabled",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      { type: "bool", name: "_joinExitEnabled", internalType: "bool" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setManagementAumFeePercentage",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      {
        type: "uint256",
        name: "_managementAumFeePercentage",
        internalType: "uint256"
      }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setMustAllowlistLPs",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      { type: "bool", name: "_mustAllowlistLPs", internalType: "bool" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setSwapEnabled",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      { type: "bool", name: "_swapEnabled", internalType: "bool" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferManagement",
    inputs: [{ type: "address", name: "_manager", internalType: "address" }]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "updateSwapFeeGradually",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      { type: "uint256", name: "_startTime", internalType: "uint256" },
      { type: "uint256", name: "_endTime", internalType: "uint256" },
      {
        type: "uint256",
        name: "_startSwapFeePercentage",
        internalType: "uint256"
      },
      {
        type: "uint256",
        name: "_endSwapFeePercentage",
        internalType: "uint256"
      }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "updateWeightsGradually",
    inputs: [
      { type: "address", name: "_poolAddress", internalType: "address" },
      { type: "uint256", name: "_startTime", internalType: "uint256" },
      { type: "uint256", name: "_endTime", internalType: "uint256" },
      { type: "address[]", name: "_tokens", internalType: "contract IERC20[]" },
      { type: "uint256[]", name: "_endWeights", internalType: "uint256[]" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "withdrawFunds",
    inputs: [
      { type: "address", name: "_recipientAddress", internalType: "address" },
      { type: "address", name: "_tokenAddress", internalType: "address" },
      { type: "uint256", name: "_amount", internalType: "uint256" }
    ]
  }
];
export { address, ABI };
