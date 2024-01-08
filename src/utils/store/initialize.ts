import { UserBalance, PositionsState, TokenPrice, SupplyInfo } from './features/types';
import {
  VICTION_MULTICALL_ADDR,
  ARB_MULTICALL_ADDR,
  ARB_FUTURES_ADDR,
  ARB_FUTURES_ABI,
  MULTICALL_ABI,
  ERC20_ABI,
  DAI_VAULT_ADDR,
  ETH_VAULT_ADDR,
  VIC_VAULT_ADDR,
} from '../constants/constants';
import { tokenList } from '../constants/tokenlist';
import { ethers } from 'ethers';
import { displayTwoDecimalPlaces } from '../displayTwoDecimalPlaces';

type ReturnDataType = {
  amount: ethers.BigNumber;
  entryPrice: ethers.BigNumber;
  supply: ethers.BigNumber;
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
    DUSD_AVAX: 0.00,
  };
  let positions: PositionsState = {
    positions: [
      {
        token: 'VIC',
        amount: 0,
      },
      {
        token: 'DAI',
        amount: 0,
      },
      {
        token: 'ETH',
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

  const ARB_DUSD_ADDR = '0x5Ef6A635513E6f2Af746a85f4a51Af774a5804BC';

  
  // 1. Get user balances through multicall
  // 2. Get user positions through multicall
  // 3. Get token prices through multicall
  // 4. Get dusd supply info through multicall
  try {
    const vicMulticall = new ethers.Contract(VICTION_MULTICALL_ADDR, MULTICALL_ABI, vicProvider);
    const arbMulticall = new ethers.Contract(ARB_MULTICALL_ADDR, MULTICALL_ABI, arbProvider);
    const arbFutures = new ethers.Contract(ARB_FUTURES_ADDR, ARB_FUTURES_ABI, arbProvider);
    const arbDusdContract = new ethers.Contract(ARB_DUSD_ADDR, ERC20_ABI, arbProvider);

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

    const vicPositionCalldata = arbFutures.interface.encodeFunctionData('getPosition', [VIC_VAULT_ADDR]);
    const daiPositionCalldata = arbFutures.interface.encodeFunctionData('getPosition', [DAI_VAULT_ADDR]);
    const ethPositionCalldata = arbFutures.interface.encodeFunctionData('getPosition', [ETH_VAULT_ADDR]);
    const arbSupplyCalldata = arbDusdContract.interface.encodeFunctionData('totalSupply', []);
    const arbDusdBalanceCalldata = arbDusdContract.interface.encodeFunctionData('balanceOf', [userAddress]);
    arbCalls.push([ARB_FUTURES_ADDR, vicPositionCalldata]);
    arbCalls.push([ARB_FUTURES_ADDR, daiPositionCalldata]);
    arbCalls.push([ARB_FUTURES_ADDR, ethPositionCalldata]);
    arbCalls.push([ARB_DUSD_ADDR, arbSupplyCalldata]);
    arbCalls.push([ARB_DUSD_ADDR, arbDusdBalanceCalldata]);

    const vicRes = await vicMulticall.callStatic.aggregate(vicCalls);
    const arbRes = await arbMulticall.callStatic.aggregate(arbCalls);

    console.log('arbRes', arbRes);

    const vicDecodedData = vicRes[1].map((data: any) => {
      const decoded = ethers.utils.defaultAbiCoder.decode(['uint256'], data);
      return decoded[0];
    });
    console.log("vicDecodedData", vicDecodedData);
    for (let i = 0; i < 3; i++) {
      const positionDecodedData = ethers.utils.defaultAbiCoder.decode(
        ['int256', 'uint256'], arbRes[1][i]
      );
      console.log('positionDecodedData', positionDecodedData);
      positions.positions[i].amount = displayTwoDecimalPlaces(Number(ethers.utils.formatEther(positionDecodedData[0])));
      // positions.positions[i].entryPrice = displayTwoDecimalPlaces(Number(ethers.utils.formatEther(positionDecodedData[1])));
    }

    const arbSupplyDecodedData = ethers.utils.defaultAbiCoder.decode(
      ['uint256'], arbRes[1][3]
    );
    const arbDusdBalanceDecodedData = ethers.utils.defaultAbiCoder.decode(
      ['uint256'], arbRes[1][4]
    );

    console.log('arbSupplyDecodedData', arbSupplyDecodedData);

    userBalances = {
      VIC: Number(ethers.utils.formatEther(vicDecodedData[0])),
      DAI: Number(ethers.utils.formatEther(vicDecodedData[1])),
      ETH: Number(ethers.utils.formatEther(vicDecodedData[2])),
      DUSD: Number(ethers.utils.formatEther(vicDecodedData[3])),
      DUSD_AVAX: Number(ethers.utils.formatEther(arbDusdBalanceDecodedData[0])),  
    };

    dusdSupplyInfo = {
      totalSupply: Number(ethers.utils.formatEther(arbSupplyDecodedData[0])),
      // victionSupply: Number(ethers.utils.formatEther(arbSupplyDecodedData[0].supply)),
      victionSupply: Number(ethers.utils.formatEther(vicDecodedData[4])),
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