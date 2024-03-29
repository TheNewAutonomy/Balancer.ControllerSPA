// const address = '0xD25E02047E76b688445ab154785F2642c6fe3f73' // Celo
// const address = '' // Gnosis
const address = "0xD25E02047E76b688445ab154785F2642c6fe3f73";
const ABI = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      {
        type: "address",
        name: "authorizer",
        internalType: "contract IAuthorizer"
      },
      { type: "address", name: "weth", internalType: "contract IWETH" },
      { type: "uint256", name: "pauseWindowDuration", internalType: "uint256" },
      { type: "uint256", name: "bufferPeriodDuration", internalType: "uint256" }
    ]
  },
  {
    type: "event",
    name: "AuthorizerChanged",
    inputs: [
      {
        type: "address",
        name: "newAuthorizer",
        internalType: "contract IAuthorizer",
        indexed: true
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "ExternalBalanceTransfer",
    inputs: [
      {
        type: "address",
        name: "token",
        internalType: "contract IERC20",
        indexed: true
      },
      {
        type: "address",
        name: "sender",
        internalType: "address",
        indexed: true
      },
      {
        type: "address",
        name: "recipient",
        internalType: "address",
        indexed: false
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "FlashLoan",
    inputs: [
      {
        type: "address",
        name: "recipient",
        internalType: "contract IFlashLoanRecipient",
        indexed: true
      },
      {
        type: "address",
        name: "token",
        internalType: "contract IERC20",
        indexed: true
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
        indexed: false
      },
      {
        type: "uint256",
        name: "feeAmount",
        internalType: "uint256",
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "InternalBalanceChanged",
    inputs: [
      { type: "address", name: "user", internalType: "address", indexed: true },
      {
        type: "address",
        name: "token",
        internalType: "contract IERC20",
        indexed: true
      },
      { type: "int256", name: "delta", internalType: "int256", indexed: false }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "PausedStateChanged",
    inputs: [
      { type: "bool", name: "paused", internalType: "bool", indexed: false }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "PoolBalanceChanged",
    inputs: [
      {
        type: "bytes32",
        name: "poolId",
        internalType: "bytes32",
        indexed: true
      },
      {
        type: "address",
        name: "liquidityProvider",
        internalType: "address",
        indexed: true
      },
      {
        type: "address[]",
        name: "tokens",
        internalType: "contract IERC20[]",
        indexed: false
      },
      {
        type: "int256[]",
        name: "deltas",
        internalType: "int256[]",
        indexed: false
      },
      {
        type: "uint256[]",
        name: "protocolFeeAmounts",
        internalType: "uint256[]",
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "PoolBalanceManaged",
    inputs: [
      {
        type: "bytes32",
        name: "poolId",
        internalType: "bytes32",
        indexed: true
      },
      {
        type: "address",
        name: "assetManager",
        internalType: "address",
        indexed: true
      },
      {
        type: "address",
        name: "token",
        internalType: "contract IERC20",
        indexed: true
      },
      {
        type: "int256",
        name: "cashDelta",
        internalType: "int256",
        indexed: false
      },
      {
        type: "int256",
        name: "managedDelta",
        internalType: "int256",
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "PoolRegistered",
    inputs: [
      {
        type: "bytes32",
        name: "poolId",
        internalType: "bytes32",
        indexed: true
      },
      {
        type: "address",
        name: "poolAddress",
        internalType: "address",
        indexed: true
      },
      {
        type: "uint8",
        name: "specialization",
        internalType: "enum IVault.PoolSpecialization",
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "RelayerApprovalChanged",
    inputs: [
      {
        type: "address",
        name: "relayer",
        internalType: "address",
        indexed: true
      },
      {
        type: "address",
        name: "sender",
        internalType: "address",
        indexed: true
      },
      { type: "bool", name: "approved", internalType: "bool", indexed: false }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Swap",
    inputs: [
      {
        type: "bytes32",
        name: "poolId",
        internalType: "bytes32",
        indexed: true
      },
      {
        type: "address",
        name: "tokenIn",
        internalType: "contract IERC20",
        indexed: true
      },
      {
        type: "address",
        name: "tokenOut",
        internalType: "contract IERC20",
        indexed: true
      },
      {
        type: "uint256",
        name: "amountIn",
        internalType: "uint256",
        indexed: false
      },
      {
        type: "uint256",
        name: "amountOut",
        internalType: "uint256",
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "TokensDeregistered",
    inputs: [
      {
        type: "bytes32",
        name: "poolId",
        internalType: "bytes32",
        indexed: true
      },
      {
        type: "address[]",
        name: "tokens",
        internalType: "contract IERC20[]",
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "TokensRegistered",
    inputs: [
      {
        type: "bytes32",
        name: "poolId",
        internalType: "bytes32",
        indexed: true
      },
      {
        type: "address[]",
        name: "tokens",
        internalType: "contract IERC20[]",
        indexed: false
      },
      {
        type: "address[]",
        name: "assetManagers",
        internalType: "address[]",
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "contract IWETH" }],
    name: "WETH",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      { type: "int256[]", name: "assetDeltas", internalType: "int256[]" }
    ],
    name: "batchSwap",
    inputs: [
      { type: "uint8", name: "kind", internalType: "enum IVault.SwapKind" },
      {
        type: "tuple[]",
        name: "swaps",
        internalType: "struct IVault.BatchSwapStep[]",
        components: [
          { type: "bytes32", name: "poolId", internalType: "bytes32" },
          { type: "uint256", name: "assetInIndex", internalType: "uint256" },
          { type: "uint256", name: "assetOutIndex", internalType: "uint256" },
          { type: "uint256", name: "amount", internalType: "uint256" },
          { type: "bytes", name: "userData", internalType: "bytes" }
        ]
      },
      { type: "address[]", name: "assets", internalType: "contract IAsset[]" },
      {
        type: "tuple",
        name: "funds",
        internalType: "struct IVault.FundManagement",
        components: [
          { type: "address", name: "sender", internalType: "address" },
          { type: "bool", name: "fromInternalBalance", internalType: "bool" },
          {
            type: "address",
            name: "recipient",
            internalType: "address payable"
          },
          { type: "bool", name: "toInternalBalance", internalType: "bool" }
        ]
      },
      { type: "int256[]", name: "limits", internalType: "int256[]" },
      { type: "uint256", name: "deadline", internalType: "uint256" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "deregisterTokens",
    inputs: [
      { type: "bytes32", name: "poolId", internalType: "bytes32" },
      { type: "address[]", name: "tokens", internalType: "contract IERC20[]" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "exitPool",
    inputs: [
      { type: "bytes32", name: "poolId", internalType: "bytes32" },
      { type: "address", name: "sender", internalType: "address" },
      { type: "address", name: "recipient", internalType: "address payable" },
      {
        type: "tuple",
        name: "request",
        internalType: "struct IVault.ExitPoolRequest",
        components: [
          {
            type: "address[]",
            name: "assets",
            internalType: "contract IAsset[]"
          },
          {
            type: "uint256[]",
            name: "minAmountsOut",
            internalType: "uint256[]"
          },
          { type: "bytes", name: "userData", internalType: "bytes" },
          { type: "bool", name: "toInternalBalance", internalType: "bool" }
        ]
      }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "flashLoan",
    inputs: [
      {
        type: "address",
        name: "recipient",
        internalType: "contract IFlashLoanRecipient"
      },
      { type: "address[]", name: "tokens", internalType: "contract IERC20[]" },
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
      { type: "bytes", name: "userData", internalType: "bytes" }
    ]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bytes32", name: "", internalType: "bytes32" }],
    name: "getActionId",
    inputs: [{ type: "bytes4", name: "selector", internalType: "bytes4" }]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "", internalType: "contract IAuthorizer" }
    ],
    name: "getAuthorizer",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bytes32", name: "", internalType: "bytes32" }],
    name: "getDomainSeparator",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256[]", name: "balances", internalType: "uint256[]" }
    ],
    name: "getInternalBalance",
    inputs: [
      { type: "address", name: "user", internalType: "address" },
      { type: "address[]", name: "tokens", internalType: "contract IERC20[]" }
    ]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getNextNonce",
    inputs: [{ type: "address", name: "user", internalType: "address" }]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "bool", name: "paused", internalType: "bool" },
      { type: "uint256", name: "pauseWindowEndTime", internalType: "uint256" },
      { type: "uint256", name: "bufferPeriodEndTime", internalType: "uint256" }
    ],
    name: "getPausedState",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "", internalType: "address" },
      {
        type: "uint8",
        name: "",
        internalType: "enum IVault.PoolSpecialization"
      }
    ],
    name: "getPool",
    inputs: [{ type: "bytes32", name: "poolId", internalType: "bytes32" }]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256", name: "cash", internalType: "uint256" },
      { type: "uint256", name: "managed", internalType: "uint256" },
      { type: "uint256", name: "lastChangeBlock", internalType: "uint256" },
      { type: "address", name: "assetManager", internalType: "address" }
    ],
    name: "getPoolTokenInfo",
    inputs: [
      { type: "bytes32", name: "poolId", internalType: "bytes32" },
      { type: "address", name: "token", internalType: "contract IERC20" }
    ]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address[]", name: "tokens", internalType: "contract IERC20[]" },
      { type: "uint256[]", name: "balances", internalType: "uint256[]" },
      { type: "uint256", name: "lastChangeBlock", internalType: "uint256" }
    ],
    name: "getPoolTokens",
    inputs: [{ type: "bytes32", name: "poolId", internalType: "bytes32" }]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IProtocolFeesCollector"
      }
    ],
    name: "getProtocolFeesCollector",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "hasApprovedRelayer",
    inputs: [
      { type: "address", name: "user", internalType: "address" },
      { type: "address", name: "relayer", internalType: "address" }
    ]
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "joinPool",
    inputs: [
      { type: "bytes32", name: "poolId", internalType: "bytes32" },
      { type: "address", name: "sender", internalType: "address" },
      { type: "address", name: "recipient", internalType: "address" },
      {
        type: "tuple",
        name: "request",
        internalType: "struct IVault.JoinPoolRequest",
        components: [
          {
            type: "address[]",
            name: "assets",
            internalType: "contract IAsset[]"
          },
          {
            type: "uint256[]",
            name: "maxAmountsIn",
            internalType: "uint256[]"
          },
          { type: "bytes", name: "userData", internalType: "bytes" },
          { type: "bool", name: "fromInternalBalance", internalType: "bool" }
        ]
      }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "managePoolBalance",
    inputs: [
      {
        type: "tuple[]",
        name: "ops",
        internalType: "struct IVault.PoolBalanceOp[]",
        components: [
          {
            type: "uint8",
            name: "kind",
            internalType: "enum IVault.PoolBalanceOpKind"
          },
          { type: "bytes32", name: "poolId", internalType: "bytes32" },
          { type: "address", name: "token", internalType: "contract IERC20" },
          { type: "uint256", name: "amount", internalType: "uint256" }
        ]
      }
    ]
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "manageUserBalance",
    inputs: [
      {
        type: "tuple[]",
        name: "ops",
        internalType: "struct IVault.UserBalanceOp[]",
        components: [
          {
            type: "uint8",
            name: "kind",
            internalType: "enum IVault.UserBalanceOpKind"
          },
          { type: "address", name: "asset", internalType: "contract IAsset" },
          { type: "uint256", name: "amount", internalType: "uint256" },
          { type: "address", name: "sender", internalType: "address" },
          {
            type: "address",
            name: "recipient",
            internalType: "address payable"
          }
        ]
      }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "int256[]", name: "", internalType: "int256[]" }],
    name: "queryBatchSwap",
    inputs: [
      { type: "uint8", name: "kind", internalType: "enum IVault.SwapKind" },
      {
        type: "tuple[]",
        name: "swaps",
        internalType: "struct IVault.BatchSwapStep[]",
        components: [
          { type: "bytes32", name: "poolId", internalType: "bytes32" },
          { type: "uint256", name: "assetInIndex", internalType: "uint256" },
          { type: "uint256", name: "assetOutIndex", internalType: "uint256" },
          { type: "uint256", name: "amount", internalType: "uint256" },
          { type: "bytes", name: "userData", internalType: "bytes" }
        ]
      },
      { type: "address[]", name: "assets", internalType: "contract IAsset[]" },
      {
        type: "tuple",
        name: "funds",
        internalType: "struct IVault.FundManagement",
        components: [
          { type: "address", name: "sender", internalType: "address" },
          { type: "bool", name: "fromInternalBalance", internalType: "bool" },
          {
            type: "address",
            name: "recipient",
            internalType: "address payable"
          },
          { type: "bool", name: "toInternalBalance", internalType: "bool" }
        ]
      }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bytes32", name: "", internalType: "bytes32" }],
    name: "registerPool",
    inputs: [
      {
        type: "uint8",
        name: "specialization",
        internalType: "enum IVault.PoolSpecialization"
      }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "registerTokens",
    inputs: [
      { type: "bytes32", name: "poolId", internalType: "bytes32" },
      { type: "address[]", name: "tokens", internalType: "contract IERC20[]" },
      { type: "address[]", name: "assetManagers", internalType: "address[]" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setAuthorizer",
    inputs: [
      {
        type: "address",
        name: "newAuthorizer",
        internalType: "contract IAuthorizer"
      }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setPaused",
    inputs: [{ type: "bool", name: "paused", internalType: "bool" }]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setRelayerApproval",
    inputs: [
      { type: "address", name: "sender", internalType: "address" },
      { type: "address", name: "relayer", internalType: "address" },
      { type: "bool", name: "approved", internalType: "bool" }
    ]
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      { type: "uint256", name: "amountCalculated", internalType: "uint256" }
    ],
    name: "swap",
    inputs: [
      {
        type: "tuple",
        name: "singleSwap",
        internalType: "struct IVault.SingleSwap",
        components: [
          { type: "bytes32", name: "poolId", internalType: "bytes32" },
          { type: "uint8", name: "kind", internalType: "enum IVault.SwapKind" },
          { type: "address", name: "assetIn", internalType: "contract IAsset" },
          {
            type: "address",
            name: "assetOut",
            internalType: "contract IAsset"
          },
          { type: "uint256", name: "amount", internalType: "uint256" },
          { type: "bytes", name: "userData", internalType: "bytes" }
        ]
      },
      {
        type: "tuple",
        name: "funds",
        internalType: "struct IVault.FundManagement",
        components: [
          { type: "address", name: "sender", internalType: "address" },
          { type: "bool", name: "fromInternalBalance", internalType: "bool" },
          {
            type: "address",
            name: "recipient",
            internalType: "address payable"
          },
          { type: "bool", name: "toInternalBalance", internalType: "bool" }
        ]
      },
      { type: "uint256", name: "limit", internalType: "uint256" },
      { type: "uint256", name: "deadline", internalType: "uint256" }
    ]
  },
  { type: "receive", stateMutability: "payable" }
];
export { address, ABI };
