"use client";
import { useState, useEffect } from 'react';
import Spinner from '@/ui/Spinner';
import { ethers } from 'ethers';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { useFaucet } from '@/hooks/useFaucet';

export default function Faucet() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState<ethers.Signer>();

  const { getTokens, error } = useFaucet(
    () => signer,
  );

  const { walletProvider } = useWeb3ModalProvider();
  let ethersProvider: ethers.providers.Web3Provider;

  if (walletProvider) {
    ethersProvider = new ethers.providers.Web3Provider(walletProvider);
  }

  useEffect(() => {
    if (walletProvider) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [walletProvider]);

  const handleTakeFaucet = async () => {
    setIsLoading(true);
    setSigner(ethersProvider.getSigner());
    await getTokens();
    setIsLoading(false);
  };

  return (
    // <div className="flex flex-col justify-center items-center mx-auto mb-3 w-2/5 h-auto">
    <div className="w-full bg-white sm:rounded-lg p-3">
      <div className="px-4 py-3 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Faucet</h3>
      </div>
      <div className='px-4'>
        {isConnected && (
          <button
            className="w-full h-[40px] rounded-lg shadow-lg text-white text-lg bg-darkgold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-lightgold"
            disabled={isLoading}
            onClick={handleTakeFaucet}
          >
            {isLoading ? <Spinner /> : 'Get Test Tokens'}
          </button>
        )
        }
      </div>
    </div>
    // </div>
  )
}