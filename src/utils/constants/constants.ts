import { tokenList } from "./tokenlist";

const tokensList = tokenList();
export const CONTROLLER_ADDR = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
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
export const ARB_VIC_ADDR = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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

export const ARB_FUTURES_ADDR = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const ARB_FUTURES_ABI = "TODO";

export const VICTION_MULTICALL_ADDR = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const ARB_MULTICALL_ADDR = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const MULTICALL_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "getCurrentBlockTimestamp",
    "outputs": [{ "name": "timestamp", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
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

export const FAUCET_ADDR = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const FAUCET_ABI = [
  {
    "inputs": [{ "name": "user", "type": "address" }],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]