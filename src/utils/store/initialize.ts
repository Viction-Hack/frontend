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

type ReturnDataType = {
  amount: ethers.BigNumber;
  entryPrice: ethers.BigNumber;
};

export async function initializeStore(userAddress: string) {

  const ARB_RPC_URL = process.env.NEXT_PUBLIC_ARBITRUM_URL || '';
  const VIC_RPC_URL = process.env.NEXT_PUBLIC_VICTION_URL || '';

  const arbProvider = new ethers.providers.JsonRpcProvider(ARB_RPC_URL);
  const vicProvider = new ethers.providers.JsonRpcProvider(VIC_RPC_URL);

  
  let userBalances: UserBalance = {
    DUSD: 0.00,
    ETH: 0.00,
    DAI: 0.00,
    VIC: 0.00,
  };
  let positions: PositionsState = {
    positions: [
      {
        amount: 0,
        entryPrice: 0,
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
      }
    }
    const positionCalldata = arbFutures.interface.encodeFunctionData('getPosition', [userAddress]);
    arbCalls.push([ARB_FUTURES_ADDR, positionCalldata]);

    const vicRes = await vicMulticall.callStatic.aggregate(vicCalls);
    const arbRes = await arbMulticall.callStatic.aggregate(arbCalls);

    console.log('arbRes', arbRes);

    const vicDecodedData = vicRes[1].map((data: any) => {
      const decoded = ethers.utils.defaultAbiCoder.decode(['uint256'], data);
      return decoded[0];
    });
    const arbDecodedData: ReturnDataType[] = arbRes[1].map((data: any) => {
      // Decode the data as a tuple containing an int256 and a uint256
      if (data == '0x') {
        return { amount: 0, entryPrice: 0 };
      }
      const [amount, entryPrice] = ethers.utils.defaultAbiCoder.decode(
        ['int256', 'uint256'],
        data
      );
      // Return the decoded values in the structured format
      return { amount, entryPrice };
    });

    userBalances = {
      VIC: Number(ethers.utils.formatEther(vicDecodedData[0])),
      ETH: Number(ethers.utils.formatEther(vicDecodedData[1])),
      DAI: Number(ethers.utils.formatEther(vicDecodedData[2])),
      DUSD: Number(ethers.utils.formatEther(vicDecodedData[3])),
    };

    positions = {
      positions: [
        {
          amount: 0,
          entryPrice: 0,
        },
      ],
    };

    dusdSupplyInfo = {
      totalSupply: Number(ethers.utils.formatEther(vicDecodedData[4])),
      victionSupply: Number(ethers.utils.formatEther(vicDecodedData[5])),
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