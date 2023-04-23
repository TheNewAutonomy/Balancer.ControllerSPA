const address = "0x960Edb2AA0960be66c65FB52e83c99c3C0F4CeD5";
const ABI = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "vault", internalType: "contract IVault" },
      {
        type: "address",
        name: "protocolFeeProvider",
        internalType: "contract IProtocolFeePercentagesProvider"
      },
      {
        type: "address",
        name: "externalWeightedMath",
        internalType: "contract IExternalWeightedMath"
      },
      {
        type: "address",
        name: "recoveryModeHelper",
        internalType: "contract IRecoveryModeHelper"
      },
      { type: "string", name: "factoryVersion", internalType: "string" },
      { type: "string", name: "poolVersion", internalType: "string" },
      {
        type: "uint256",
        name: "initialPauseWindowDuration",
        internalType: "uint256"
      },
      { type: "uint256", name: "bufferPeriodDuration", internalType: "uint256" }
    ]
  },
  { type: "event", name: "FactoryDisabled", inputs: [], anonymous: false },
  {
    type: "event",
    name: "PoolCreated",
    inputs: [
      { type: "address", name: "pool", internalType: "address", indexed: true }
    ],
    anonymous: false
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "address", name: "pool", internalType: "address" }],
    name: "create",
    inputs: [
      {
        type: "tuple",
        name: "params",
        internalType: "struct ManagedPool.ManagedPoolParams",
        components: [
          { type: "string", name: "name", internalType: "string" },
          { type: "string", name: "symbol", internalType: "string" },
          {
            type: "address[]",
            name: "assetManagers",
            internalType: "address[]"
          }
        ]
      },
      {
        type: "tuple",
        name: "settingsParams",
        internalType: "struct ManagedPoolSettings.ManagedPoolSettingsParams",
        components: [
          {
            type: "address[]",
            name: "tokens",
            internalType: "contract IERC20[]"
          },
          {
            type: "uint256[]",
            name: "normalizedWeights",
            internalType: "uint256[]"
          },
          {
            type: "uint256",
            name: "swapFeePercentage",
            internalType: "uint256"
          },
          { type: "bool", name: "swapEnabledOnStart", internalType: "bool" },
          { type: "bool", name: "mustAllowlistLPs", internalType: "bool" },
          {
            type: "uint256",
            name: "managementAumFeePercentage",
            internalType: "uint256"
          },
          { type: "uint256", name: "aumFeeId", internalType: "uint256" }
        ]
      },
      { type: "address", name: "owner", internalType: "address" },
      { type: "bytes32", name: "salt", internalType: "bytes32" }
    ]
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "disable",
    inputs: []
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
    outputs: [{ type: "bytes", name: "", internalType: "bytes" }],
    name: "getCreationCode",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "contractA", internalType: "address" },
      { type: "address", name: "contractB", internalType: "address" }
    ],
    name: "getCreationCodeContracts",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256", name: "pauseWindowDuration", internalType: "uint256" },
      { type: "uint256", name: "bufferPeriodDuration", internalType: "uint256" }
    ],
    name: "getPauseConfiguration",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "getPoolVersion",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IProtocolFeePercentagesProvider"
      }
    ],
    name: "getProtocolFeePercentagesProvider",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IRecoveryModeHelper"
      }
    ],
    name: "getRecoveryModeHelper",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "contract IVault" }],
    name: "getVault",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IExternalWeightedMath"
      }
    ],
    name: "getWeightedMath",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isDisabled",
    inputs: []
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isPoolFromFactory",
    inputs: [{ type: "address", name: "pool", internalType: "address" }]
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "version",
    inputs: []
  }
];
export { address, ABI };
