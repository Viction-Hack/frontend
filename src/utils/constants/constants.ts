import { tokenList } from "./tokenlist";

const tokensList = tokenList();
export const CONTROLLER_ADDR = '0x6379b2D963e1E3b92067C65E3f96c3469F1B920e';
export const CONTROLLER_ABI = [
    {
      "type":"function",
      "name":"mintWithVic",
      "inputs":
        [
          {"name":"receiver","type":"address","internalType":"address"},
          {"name":"minDUSDCAmountOut","type":"uint256","internalType":"uint256"},
          {"name":"deadline","type":"uint256","internalType":"uint256"}
        ],
      "outputs":[],
      "stateMutability":"payable",
    },
    {
      "type":"function",
      "name":"mint",
      "inputs":
        [
          {"name":"underlying","type":"address","internalType":"address"},
          {"name":"receiver","type":"address","internalType":"address"},
          {"name":"collateralAmountIn","type":"uint256","internalType":"uint256"},
          {"name":"minDUSDCAmountOut","type":"uint256","internalType":"uint256"},
          {"name":"deadline","type":"uint256","internalType":"uint256"}
        ],
      "outputs":[],
      "stateMutability":"nonpayable"
    },
    {
      "type":"function",
      "name":"redeem",
      "inputs":
        [
          {"name":"underlying","type":"address","internalType":"address"},
          {"name":"receiver","type":"address","internalType":"address"},
          {"name":"dusdAmountIn","type":"uint256","internalType":"uint256"},
          {"name":"minCollateralAmountOut","type":"uint256","internalType":"uint256"},
          {"name":"deadline","type":"uint256","internalType":"uint256"}
        ],
      "outputs":[],
      "stateMutability":"nonpayable"
    }
];

export const VICTION_DAI_ADDR = tokensList[1].address;
export const VICTION_ETH_ADDR = tokensList[2].address;
export const DUSD_ADDR = tokensList[3].address;
export const ARB_VIC_ADDR = "0xe65c74456282E63Adc7f43d8a69A0D6BAD0005b6";

export const ERC20_ABI = [
    {
        inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'address', name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'spender', type: 'address' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        type: "function",
        name: "circulatingSupply",
        inputs: [],
        outputs: [{name: "", type: "uint256", internalType: "uint256"}],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "totalSupply",
        inputs: [],
        outputs: [{name: "", type: "uint256", internalType: "uint256"}],
        stateMutability: "view"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "uint16",
          "name": "_dstChainId",
          "type": "uint16"
        },
        {
          "internalType": "bytes",
          "name": "_toAddress",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "sendFrom",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
];

export const ARB_FUTURES_ADDR = '0xa8F27a15F7188A8938ed15b4AF1fd3f2E47C8848';
export const ARB_FUTURES_ABI = [
  {
    "inputs": [
      {"internalType":"address","name":"account","type":"address"}
    ],
    "stateMutability":"view",
    "type":"function",
    "name":"getPosition",
    "outputs":[
      {
        "internalType":"struct IMockPerpDex.Position",
        "name":"",
        "type":"tuple",
        "components":[
          {"internalType":"int256","name":"amount","type":"int256"},
          {"internalType":"uint256","name":"entryPrice","type":"uint256"}
        ]
      }
    ]
  },
];

export const VIC_VAULT_ADDR = '0x77a451ea43C5EdF31a6d22C1FA22DEbF5D32e0A3';
export const DAI_VAULT_ADDR = '0xa5b210F54537afeB39314a31a8BD594B0ecBB6b4';
export const ETH_VAULT_ADDR = '0x493925fbf88579E8B8C76BC4695e558588F8A57D';

export const VICTION_MULTICALL_ADDR = '0xb35042A41B49c5Fe09c8c3946650Cc3d73a22074';
export const ARB_MULTICALL_ADDR = '0xAbE7DCBf580d485f669805FF42C31df2Ed3BE4a5';

export const MULTICALL_ABI = [
  {
    "constant": false,
    "inputs": [
      {
        "components": [
          { "name": "target", "type": "address" },
          { "name": "callData", "type": "bytes" }
        ],
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "aggregate",
    "outputs": [
      { "name": "blockNumber", "type": "uint256" },
      { "name": "returnData", "type": "bytes[]" }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getLastBlockHash",
    "outputs": [{ "name": "blockHash", "type": "bytes32" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{ "name": "addr", "type": "address" }],
    "name": "getEthBalance",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCurrentBlockDifficulty",
    "outputs": [{ "name": "difficulty", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCurrentBlockGasLimit",
    "outputs": [{ "name": "gaslimit", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCurrentBlockCoinbase",
    "outputs": [{ "name": "coinbase", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{ "name": "blockNumber", "type": "uint256" }],
    "name": "getBlockHash",
    "outputs": [{ "name": "blockHash", "type": "bytes32" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

export const FAUCET_ADDR = '0x328D0E5E9a1D51a3100987C459cCa2833E3bd077';
export const FAUCET_ABI = [
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]