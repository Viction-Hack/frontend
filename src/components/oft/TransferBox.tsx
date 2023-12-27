"use client";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import Spinner from '@/ui/Spinner';
import ArrowDown from '@/ui/ArrowDown';
import { useTransfer } from '@/hooks/useTransfer';
import { ArbitrumNetwork, VictionNetwork } from '@/ui/NetworkInfo';

type Token = {
  name: string;
  address: string;
  balance: number;
  image: string;
}

interface TransferBoxProps {
  slippage: number;
}

const TransferBox: React.FC<TransferBoxProps> = ({slippage}) => {
  const {walletProvider} = useWeb3ModalProvider();
  const [transferAmount, setTransferAmount] = useState('');
  const [destinationAmount, setDestinationAmount] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isViction, setIsViction] = useState(false);
  const [network, setNetwork] = useState<number>(89);
  const [signer, setSigner] = useState<ethers.Signer>();

  const { transfer, error } = useTransfer(
    () => signer,
    () => destinationAmount,
  );

  let token: Token | undefined;
  let ethersProvider: ethers.providers.Web3Provider;

  const handleNetworkChange = (newNetwork: ethers.providers.Network) => {
    setNetwork(newNetwork.chainId);
    setIsViction(newNetwork.chainId == 89); 
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

  const handleTransferAmount = (amount: string) => {
    setIsLoading(true);
    if (amount === '') {
      setTransferAmount('');
      setDestinationAmount(0.0);
      setIsLoading(false);
      return;
    }
    setTransferAmount(amount);
    setDestinationAmount(parseInt(amount));
    setIsLoading(false);
  }

  // for testing
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleTransfer = async () => {
    console.log('Transfering');
    setIsLoading(true);
    setSigner(ethersProvider.getSigner());
    if (!token) {
      await delay(5000);
      setIsLoading(false);
      return;
    }
    await transfer();
    setIsLoading(false);
  }

  return (
    <>
      <div className="bg-gray-100 rounded-lg text-gray-500 text-sm font-medium h-1/2 leading-5 p-4 relative mb-3">
        <h2 className="text-sm font-medium text-gray-500">Transfer DUSD</h2>
        <div className="flex flex-row justify-between h-[60px]">
          <input
              type="number"
              value={transferAmount}
              onChange={(e) => handleTransferAmount(e.target.value)}
              className="w-full pl-7 pr-12 bg-transparent text-lg rounded-md"
              placeholder="0"
            />
          <div className="flex p-3 inset-y-0 right-0 flex items-center h-2/3 w-1/2">
            <label className="sr-only">Network</label>
            {isViction ? <VictionNetwork /> : <ArbitrumNetwork />}
          </div>
        </div>
        <div className="flex flex-col items-end mb-10 p-3">
          <p className="text-sm text-gray-500 mt-1">
             Balance: {token ? token.balance : '0.00'} 
          </p>
        </div>
      </div>
      <ArrowDown />
      <div className="bg-gray-100 rounded-lg text-gray-500 text-sm font-medium leading-5 p-4 relative mb-3 mt-3">
        <div className="flex flex-row justify-between h-[60px] p-3">
          <div className="block w-full pl-7 pr-12 bg-transparent text-lg border-black rounded-md">
            {destinationAmount}
          </div>
          <div className="flex p-3 inset-y-0 right-0 flex items-center h-2/3 w-1/2">
            <label className="sr-only">Network</label>
            {!isViction ? <VictionNetwork /> : <ArbitrumNetwork />}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {isConnected && (
            <button 
              className="w-full h-[40px] rounded-lg shadow-lg text-white text-lg bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
              disabled={isLoading}
              onClick={handleTransfer}
            >
              {isLoading ? <Spinner /> : 'Transfer'}
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

export default TransferBox;