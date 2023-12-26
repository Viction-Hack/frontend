"use client";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import calculateExchangeRate from '@/utils/calculateExchangeRate';
import Spinner from '@/ui/Spinner';
import ArrowDown from '@/ui/ArrowDown';
import SelectTokenPopup from './SelectTokenPopup';
import { useRedeem } from '@/hooks/useRedeem';
import { ERC20_ABI } from '@/utils/constants/constants';

type Token = {
  name: string;
  address: string;
  balance: number;
  image: string;
}

interface RedeemBoxProps {
  slippage: number;
}

const RedeemBox: React.FC<RedeemBoxProps> = ({slippage}) => {
  const {walletProvider} = useWeb3ModalProvider();
  const [collateralAmount, setCollateralAmount] = useState('');
  const [redeemAmount, setRedeemAmount] = useState(0.0);
  const [selectedToken, setSelectedToken] = useState('VIC');
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isViction, setIsViction] = useState(false);
  const [network, setNetwork] = useState<number>(89);
  const [signer, setSigner] = useState<ethers.Signer>();

  const { redeem, error } = useRedeem(
    () => signer,
    () => selectedToken,
    () => collateralAmount,
    () => redeemAmount,
  );

  const tokens = [
    { name: 'Viction', address: "", balance: 1.0, image: '/viction.svg' },
    { name: 'ETH', address: "", balance: 0.012, image: '/ethereum.svg' },
    { name: 'DAI', address: "", balance: 0.0002, image: '/dai.svg' },
  ];

  let token: Token | undefined;
  let ethersProvider: ethers.providers.Web3Provider;

  const handleNetworkChange = (newNetwork: ethers.providers.Network) => {
    setNetwork(newNetwork.chainId);
    setIsViction(newNetwork.chainId === 89); // Assuming 89 is the chainId for Viction
  };

  if (walletProvider) {
    ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    ethersProvider.on('network', handleNetworkChange);
  }

  useEffect(() => {
    if (walletProvider) {
      setIsConnected(true);
      ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      ethersProvider.getNetwork().then(handleNetworkChange).catch(console.error);
    } else {
      setIsConnected(false);
    }
  }, [walletProvider, network]);

  const handleRedeemAmount = (amount: string) => {
    setIsLoading(true);
    if (amount === '') {
      setCollateralAmount('');
      setRedeemAmount(0.0);
      setIsLoading(false);
      return;
    }
    setCollateralAmount(amount);
    const exchangeRate = calculateExchangeRate(selectedToken, amount);
    setRedeemAmount(exchangeRate * parseInt(amount));
    setIsLoading(false);
  }

  const handleSelectToken = (tokenName: string) => {
    setSelectedToken(tokenName);
    token = tokens.find(token => token.name === selectedToken);
    setIsPopupOpen(false);
  };

  // for testing
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleRedeem = async () => {
    console.log('Redeeming');
    setIsLoading(true);
    setSigner(ethersProvider.getSigner());
    console.log('collateralAmount', collateralAmount);
    const token = tokens.find(token => token.name === selectedToken);
    if (!token) {
      await delay(5000);
      setIsLoading(false);
      return;
    }
    await redeem();
    setIsLoading(false);
  }

  return (
    <>
      <div className="bg-gray-100 rounded-lg text-gray-500 text-sm font-medium h-1/2 leading-5 p-4 relative mb-3">
        <h2 className="text-sm font-medium text-gray-500">Redeem Your Collateral with</h2>
        <div className="flex flex-row justify-between h-[60px]">
          <input
              type="number"
              value={collateralAmount}
              onChange={(e) => handleRedeemAmount(e.target.value)}
              className="w-full pl-7 pr-12 bg-transparent text-lg rounded-md"
              placeholder="0"
            />
          <p className='flex items-center p-3'>DUSD</p>
        </div>
        
        <div className="flex flex-col items-end mb-10 p-3">
          <p className="text-sm text-gray-500 mt-1">
             Balance: {token ? token.balance : '0.00'} 
            {/* <span className="cursor-pointer text-indigo-600 hover:text-indigo-800">Max</span> */}
          </p>
        </div>
      </div>
      <ArrowDown />
      <div className="bg-gray-100 rounded-lg text-gray-500 text-sm font-medium leading-5 p-4 relative mb-3 mt-3">
        <div className="flex flex-row justify-between h-[60px] p-3">
          <div className="block w-4/5 pl-7 pr-12 bg-transparent text-lg border-black rounded-md">
            {redeemAmount}
          </div>
          <div className="flex p-3 inset-y-0 right-0 flex items-center h-2/3 w-1/3">
            <label className="sr-only">Currency</label>
            <button 
              className='w-full bg-white rounded-2xl tx-black h-[30px]' 
              onClick={() => setIsPopupOpen(true)}
            >
              {selectedToken}
            </button>
            <SelectTokenPopup
              tokens={tokens}
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              onSelect={handleSelectToken}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {isConnected && isViction && (
            <button 
              className="w-full h-[40px] rounded-lg shadow-lg text-white text-lg bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
              disabled={isLoading}
              onClick={handleRedeem}
            >
              {isLoading ? <Spinner /> : 'Redeem'}
            </button>
          )
        }
        {!isLoading && isConnected && !isViction &&  (
            <button className="w-full h-[40px] rounded-lg shadow-lg text-gray-500 text-lg bg-gray-200 disabled disabled:opacity-50">
              Switch to Viction Testnet
            </button>
          )
        }
        {!isLoading && !isConnected && (
            <button className="w-full h-[40px] rounded-lg shadow-lg text-gray-500 text-lg bg-gray-200 disabled disabled:opacity-50">
              Connect Wallet
            </button>
          )
        }
      </div>
    </>
  )
}

export default RedeemBox;