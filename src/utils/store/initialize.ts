import { UserBalance, PositionsState, TokenPrice, SupplyInfo } from './features/types';
import {
  VICTION_MULTICALL_ADDR,
  ARB_MULTICALL_ADDR,
  ARB_FUTURES_ADDR,
  ARB_FUTURES_ABI,
  MULTICALL_ABI,
  ERC20_ABI,
} from '../constants/constants';
import { tokenList } from '../constants/tokenlist';
import { ethers } from 'ethers';

export async function initializeStore(userAddress: string) {

  const ARB_RPC_URL = process.env.NEXT_PUBLIC_ARBITRUM_URL || '';
  const VIC_RPC_URL = process.env.NEXT_PUBLIC_VICTION_URL || '';

  const arbProvider = new ethers.providers.JsonRpcProvider(ARB_RPC_URL);
  const vicProvider = new ethers.providers.JsonRpcProvider(VIC_RPC_URL);

  
  let userBalances: UserBalance = {
    DUSD: 0,
    ETH: 0,
    DAI: 0,
    VIC: 0,
  };
  let positions: PositionsState = {
    positions: [
      {
        asset: 'VIC',
        amount: 0,
      },
      {
        asset: 'DAI',
        amount: 0,
      },
      {
        asset: 'ETH',
        amount: 0,
      },
    ],
  };

  // TODO: Get token prices from dexscreener
  let tokenPrices: TokenPrice = { 
    ETH: 2223,
    DAI: 1,
    VIC: 0.821,
    DUSD: 1,
    
  };
  let dusdSupplyInfo: SupplyInfo = {
    totalSupply: 100,
    victionSupply: 100,
  };

  if (!userAddress) {
    return {
      userBalances: userBalances,
      positions: positions,
      tokenPrices: tokenPrices,
      dusdSupplyInfo: dusdSupplyInfo,
    };
  }

  
  // 1. Get user balances through multicall
  // 2. Get user positions through multicall
  // 3. Get token prices through multicall
  // 4. Get dusd supply info through multicall
  try {
    const vicMulticall = new ethers.Contract(VICTION_MULTICALL_ADDR, MULTICALL_ABI, vicProvider);
    const arbMulticall = new ethers.Contract(ARB_MULTICALL_ADDR, MULTICALL_ABI, arbProvider);
    const arbFutures = new ethers.Contract(ARB_FUTURES_ADDR, ARB_FUTURES_ABI, arbProvider);

    const tokensList = tokenList();
    let vicCalls = [];
    let arbCalls = [];
    for (let i = 0; i < tokensList.length; i++) {
      let tokenAddr = tokensList[i].address;
      if (i == 0) {
        const calldata = vicMulticall.interface.encodeFunctionData('getEthBalance', [userAddress]);
        vicCalls.push([VICTION_MULTICALL_ADDR, calldata]);

        // TODO: Get ARB VIC address
        const positionCalldata = arbFutures.interface.encodeFunctionData('getPosition', [tokenAddr, userAddress]);
        arbCalls.push([ARB_FUTURES_ADDR, positionCalldata]);
      } else if (i == 3) {
        const tokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, vicProvider);
        const calldata = tokenContract.interface.encodeFunctionData('balanceOf', [userAddress]);
        vicCalls.push([tokenAddr, calldata]);
        const supplyCalldata = tokenContract.interface.encodeFunctionData('totalSupply', []);
        const vicSupplyCalldata = tokenContract.interface.encodeFunctionData('circulatingSupply', []);
        vicCalls.push([tokenAddr, supplyCalldata]);
        vicCalls.push([tokenAddr, vicSupplyCalldata]);
      } else {
        const tokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, vicProvider);
        const calldata = tokenContract.interface.encodeFunctionData('balanceOf', [userAddress]);
        vicCalls.push([tokenAddr, calldata]);
          
        const positionCalldata = arbFutures.interface.encodeFunctionData('getPosition', [tokenAddr, userAddress]);
        arbCalls.push([ARB_FUTURES_ADDR, positionCalldata]);
      }
    }

    const vicResults = await vicMulticall.aggregate(vicCalls);
    const arbResults = await arbMulticall.aggregate(arbCalls);

    const vicDecodedResults = ethers.utils.defaultAbiCoder.decode(
      ['uint256', 'uint256', 'uint256', 'uint256', 'uint256'], 
      vicResults
    );
    const arbDecodedResults = ethers.utils.defaultAbiCoder.decode(
      ['uint256', 'uint256', 'uint256', 'uint256'], 
      arbResults
    );

    userBalances = {
      DUSD: vicDecodedResults[0],
      ETH: vicDecodedResults[1],
      DAI: vicDecodedResults[2],
      VIC: vicDecodedResults[3],
    };

    positions = {
      positions: [
        {
          asset: 'VIC',
          amount: arbDecodedResults[0],
        },
        {
          asset: 'DAI',
          amount: arbDecodedResults[1],
        },
        {
          asset: 'ETH',
          amount: arbDecodedResults[2],
        },
      ],
    };

    dusdSupplyInfo = {
      totalSupply: vicDecodedResults[4],
      victionSupply: vicDecodedResults[5],
    };
  } catch (e) {
    console.error('Failed to fetch initial data:', e);
  }

  return {
    userBalances: userBalances,
    positions: positions,
    tokenPrices: tokenPrices,
    dusdSupplyInfo: dusdSupplyInfo,
  };
}