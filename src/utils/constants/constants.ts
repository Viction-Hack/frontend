import { tokenList } from "./tokenlist";

const tokensList = tokenList();
export const CONTROLLER_ADDR = '0x31C6d1884E408B63A910eF547afdA1180d919e13';
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
export const ARB_VIC_ADDR = "0x24c470BF5Fd6894BC935d7A4c0Aa65f6Ad8E3D5a";

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

export const ARB_FUTURES_ADDR = '0xf8efeBAec7C3a37106e14a8d4994Db730dDbC08F';
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

export const VIC_VAULT_ADDR = '0xD0d5E2931C9134b6E8DDe9Be67E814f4bFF50bC5';
export const DAI_VAULT_ADDR = '0x109Eca9F83C18Da5563b5c978E421444c8A37E55';
export const ETH_VAULT_ADDR = '0xAdbb76D0454De0365a9c1D6a93DdAD7CCa572BbA';

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

export const FAUCET_ADDR = '0xD3e1b64B8C5D035A6dBda52FD420132D1bB90BB2';
export const FAUCET_ABI = [
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]