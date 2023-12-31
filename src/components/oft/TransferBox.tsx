"use client";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3ModalProvider, useWeb3ModalState } from '@web3modal/ethers5/react';
import Spinner from '@/ui/Spinner';
import ArrowDown from '@/ui/ArrowDown';
import { useTransfer } from '@/hooks/useTransfer';
import { ArbitrumNetwork, VictionNetwork } from '@/ui/NetworkInfo';
import { UserBalance } from '@/utils/store/features/types';
import { DUSD_ADDR } from '@/utils/constants/constants';

type Token = {
  name: string;
  symbol: string;
  address: string;
}

interface TransferBoxProps {
  userBalances: UserBalance;
}

const TransferBox: React.FC<TransferBoxProps> = ({ userBalances }) => {
  const { walletProvider } = useWeb3ModalProvider();
  const [transferAmount, setTransferAmount] = useState('');
  const [destinationAmount, setDestinationAmount] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isViction, setIsViction] = useState(false);
  const [network, setNetwork] = useState<number>(89);
  const [signer, setSigner] = useState<ethers.Signer>();

  let { open, selectedNetworkId } = useWeb3ModalState();
  console.log("selectedNetworkId: ", selectedNetworkId);

  const { transfer, error } = useTransfer(
    () => signer,
    () => destinationAmount,
    network
  );

  let token: Token = {
    name: 'Doldrums USD',
    symbol: 'DUSD',
    address: DUSD_ADDR,
  };
  let ethersProvider: ethers.providers.Web3Provider;

  const handleNetworkChange = () => {
    setNetwork(Number(selectedNetworkId));
    setIsViction(Number(selectedNetworkId) == 89);
  };

  if (walletProvider) {
    ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    ethersProvider.on('network', handleNetworkChange);
  }

  useEffect(() => {
    if (walletProvider) {
      setIsConnected(true);
      handleNetworkChange();
    } else {
      setIsConnected(false);
    }
  }, [walletProvider, network, selectedNetworkId]);

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

  const fetchBalance = () => {
    if (Number(selectedNetworkId) == 89) {
      return userBalances.DUSD;
    } else {
      return userBalances.DUSD_AVAX;
    }
  }

  const handleFullBalance = () => {
    setTransferAmount(fetchBalance().toString());
    setDestinationAmount(fetchBalance());
  }

  const handleTransfer = async () => {
    console.log('Transfering');
    setIsLoading(true);
    setSigner(ethersProvider.getSigner());
    if (!token) {
      setIsLoading(false);
      return;
    }
    await transfer();
    setIsLoading(false);
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
      <ArrowDown />
      <div className="border-2 border-lightgold rounded-lg text-gray-500 text-sm font-medium leading-5 p-1 relative mx-4 my-3">
        <div className="flex flex-row justify-between h-[60px] p-3">
          <div className="block w-4/5 pl-2 pr-12 bg-transparent text-lg border-black rounded-md">
            {destinationAmount}
          </div>
          <div className="flex p-3 inset-y-0 right-0 flex items-center h-[40px] w-1/3">
            <label className="sr-only">Network</label>
            {!isViction ? <VictionNetwork /> : <ArbitrumNetwork />}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {isConnected && (
          <button
            className="w-full mx-4 h-[40px] rounded-lg shadow-lg text-white text-lg bg-darkgold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-lightgold"
            disabled={isLoading}
            onClick={handleTransfer}
          >
            {isLoading ? <Spinner /> : 'Transfer'}
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