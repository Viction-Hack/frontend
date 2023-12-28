import { tokenList } from "./tokenlist";

const tokensList = tokenList();
export const CONTROLLER_ADDR = '0x0789FdE58A90c4B80C273767dbe5165ba4c9c518';
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
export const ARB_VIC_ADDR = "0x8269c57FBea0176ae1d4e302661c07ae11873751";

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
        type: "function",
        name: "sendFrom",
        inputs:[
            {name: "_from",type:"address",internalType: "address"},
            {name: "_dstChainId", type: "uint16",internalType: "uint16"},
            {name: "_toAddress", type: "bytes32", internalType: "bytes32"},
            {name: "_amount", type: "uint256", internalType: "uint256"},
            {name: "_callParams", type :"tuple", internalType :"struct ICommonOFT.LzCallParams", components:[
                {name: "refundAddress", type: "address", internalType: "address payable"},
                {name: "zroPaymentAddress", type: "address", internalType: "address"},
                {name: "adapterParams", type: "bytes", internalType: "bytes"}]
            }
        ],
        outputs:[],
        stateMutability: "payable"}
];

export const ARB_FUTURES_ADDR = '0x07DCBBd3dD79AD8adA931b184Ba3e5e61366588B';
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

export const VIC_VAULT_ADDR = '0xde22aE28d9dad32938fe339f5E7a999Ff737e907';
export const DAI_VAULT_ADDR = '0x95df672dA95De0b85272E46576d9C3EEd18c1482';
export const ETH_VAULT_ADDR = '0xa5643aeDf7d69AABd53F2e3a610ACeC8B2ae6338';

export const VICTION_MULTICALL_ADDR = '0xb35042A41B49c5Fe09c8c3946650Cc3d73a22074';
export const ARB_MULTICALL_ADDR = '0xF9B74aF132e63031B5546e93425A9De56ED9e38c';

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

export const FAUCET_ADDR = '0xc460FFa08Ee49cBfCFD06A95De0EFB54391C2f24';
export const FAUCET_ABI = [
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]