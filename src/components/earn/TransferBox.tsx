"use client";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { ArbitrumNetwork, VictionNetwork } from '@/ui/NetworkInfo';
import { UserBalance } from '@/utils/store/features/types';

interface TransferBoxProps {
  userBalances: UserBalance;
}

const TransferBox: React.FC<TransferBoxProps> = ({ userBalances }) => {
  const { walletProvider } = useWeb3ModalProvider();
  const [transferAmount, setTransferAmount] = useState('');
  const [destinationAmount, setDestinationAmount] = useState(0.0);
  const [isConnected, setIsConnected] = useState(false);
  const [isViction, setIsViction] = useState(false);
  const [network, setNetwork] = useState<number>(89);

  const isLoading = true;

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
    if (amount === '') {
      setTransferAmount('');
      setDestinationAmount(0.0);
      return;
    }
    setTransferAmount(amount);
    setDestinationAmount(parseInt(amount));
  }

  const fetchBalance = () => {
    return userBalances.DUSD
  }

  const handleFullBalance = () => {
    setTransferAmount(fetchBalance().toString());
    setDestinationAmount(fetchBalance());
  }


  return (
    <>
      <div className="bg-white rounded-lg text-gray-500 text-sm font-medium h-1/2 leading-5 p-4 pb-0 relative mb-3">
        <div className="flex flex-row justify-between h-[60px]">
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => handleTransferAmount(e.target.value)}
            className="w-full border-2 border-lightgold pl-7 pr-12 bg-transparent text-lg rounded-md"
            placeholder="0"
          />
          <div className="flex p-3 inset-y-0 right-0 flex items-center h-[40px] w-1/3">
            <label className="sr-only">Network</label>
            {isViction ? <VictionNetwork /> : <ArbitrumNetwork />}
          </div>
        </div>
        <div className="flex flex-col items-end p-3 pb-0">
          <button className="text-sm text-gray-500 mt-1" onClick={handleFullBalance}>
            Balance: {fetchBalance()}
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        {isConnected && (
          <button
            className="w-full mx-4 h-[40px] rounded-lg shadow-lg text-white text-lg bg-darkgold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-lightgold"
            disabled={isLoading}
          >
            {isLoading ? "Comming Soon..." : 'Deposit'}
          </button>
        )
        }
        {!isLoading && !isConnected && (
          <button className="w-full mx-4 h-[40px] rounded-lg shadow-lg text-white text-lg bg-darkgold disabled disabled:opacity-50">
            Connect Wallet
          </button>
        )
        }
      </div>
    </>
  )
}

export default TransferBox;