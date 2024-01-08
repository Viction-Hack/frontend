"use client";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3ModalProvider, useWeb3ModalState } from '@web3modal/ethers5/react';
import Spinner from '@/ui/Spinner';
import ArrowDown from '@/ui/ArrowDown';
import SelectTokenPopup from './SelectTokenPopup';
import { useMint } from '@/hooks/useMint';
import { ERC20_ABI } from '@/utils/constants/constants';
import { Token, tokenList } from '@/utils/constants/tokenlist';
import { UserBalance, TokenPrice } from '@/utils/store/features/types';
import { displayTwoDecimalPlaces } from '@/utils/displayTwoDecimalPlaces';

interface MintBoxProps {
  slippage: number;
  userBalances: UserBalance;
  tokenPrices: TokenPrice;
}

const MintBox: React.FC<MintBoxProps> = ({ slippage, userBalances, tokenPrices }) => {
  const { walletProvider } = useWeb3ModalProvider();
  const [collateralAmount, setCollateralAmount] = useState('');
  const [mintAmount, setMintAmount] = useState(0.0);
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState('VIC');
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isViction, setIsViction] = useState(false);
  const [network, setNetwork] = useState<number>(89);
  const [signer, setSigner] = useState<ethers.Signer>();
  const [contractDetails, setContractDetails] = useState<{ address: string; abi: any }>();

  const { open, selectedNetworkId } = useWeb3ModalState();

  const { mint, error } = useMint(
    () => signer,
    () => contractDetails,
    () => selectedTokenSymbol,
    () => collateralAmount,
    () => mintAmount,
    slippage,
  );

  let tokens = tokenList().slice(0, 3);

  let token: Token | undefined;
  let ethersProvider: ethers.providers.Web3Provider;

  const handleNetworkChange = () => {
    setNetwork(Number(selectedNetworkId));
    setIsViction(Number(selectedNetworkId) === 89);
  };

  console.log('userBalances', userBalances);

  const fetchBalance = (tokenSymbol: string) => {
    if (tokenSymbol === 'VIC') {
      return displayTwoDecimalPlaces(userBalances.VIC)
    } else if (tokenSymbol === 'ETH') {
      return displayTwoDecimalPlaces(userBalances.ETH)
    } else if (tokenSymbol === 'DAI') {
      return displayTwoDecimalPlaces(userBalances.DAI)
    } else {
      return 0.0
    }
  }

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

  const handleMintAmount = (amount: string) => {
    setIsLoading(true);
    if (amount === '') {
      setCollateralAmount('');
      setMintAmount(0.0);
      setIsLoading(false);
      return;
    }
    setCollateralAmount(amount);
    setMintAmount(tokenPrices[selectedTokenSymbol] * Number(amount));
    setIsLoading(false);
  }

  const handleSelectToken = (tokenSymbol: string) => {
    setSelectedTokenSymbol(tokenSymbol);
    token = tokens.find(token => token.symbol === tokenSymbol);
    console.log('token', token);
    setIsPopupOpen(false);
  };

  const handleFullBalance = () => {
    setCollateralAmount(fetchBalance(selectedTokenSymbol).toString());
    setMintAmount(tokenPrices[selectedTokenSymbol] * fetchBalance(selectedTokenSymbol));
  }

  const handleMint = async () => {
    console.log('Minting');
    setIsLoading(true);
    setSigner(ethersProvider.getSigner());
    console.log('collateralAmount', collateralAmount);
    const token = tokens.find(token => token.symbol === selectedTokenSymbol);
    if (!token) {
      setIsLoading(false);
      return;
    }
    setContractDetails({ address: token.address, abi: ERC20_ABI });
    await mint();
    setIsLoading(false);
  }

  return (
    <>
      <div className="bg-white rounded-lg text-gray-500 text-sm font-medium h-1/2 leading-5 p-4 pb-0 relative mb-3">
        <h2 className="text-sm font-medium">Mint DUSD with</h2>
        <div className="flex flex-row justify-between h-[60px]">
          <input
            type="number"
            value={collateralAmount}
            onChange={(e) => handleMintAmount(e.target.value)}
            className="w-full border-2 border-lightgold pl-7 pr-12 bg-transparent text-lg rounded-md"
            placeholder="0"
          />
          <div className="flex flex-row p-3 inset-y-0 right-0 items-center justify-center h-[40px] w-1/3">
            <label className="sr-only">Currency</label>
            <SelectTokenPopup
              tokens={tokens}
              userBalances={userBalances}
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              onSelect={handleSelectToken}
            />
            <button
              className='flex w-full bg-white rounded-2xl justify-between p-4 items-center tx-black h-[30px]'
              onClick={() => setIsPopupOpen(true)}
            >
              <img className="h-5 w-5" src={(tokens.find(token => token.symbol === selectedTokenSymbol))?.logoUrl} alt="Selected token" />
              <p className='text-sm'>{selectedTokenSymbol}</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end p-3 pb-0">
          <button className="text-sm text-gray-500 mt-1" onClick={handleFullBalance}>
            Balance: {fetchBalance(selectedTokenSymbol)}
          </button>
        </div>
      </div>
      <ArrowDown />
      <div className="border-2 border-lightgold rounded-lg text-gray-500 text-sm font-medium leading-5 p-1 relative mx-4 my-3">
        <div className="flex flex-row justify-between h-[60px] p-3">
          <div className="block w-4/5 pl-2 pr-12 bg-transparent text-lg border-black rounded-md">
            {mintAmount}
          </div>
          <p>DUSD</p>
        </div>
      </div>
      <div className="flex justify-center">
        {isConnected && isViction && (
          <button
            className="w-full mx-4 h-[40px] rounded-lg shadow-lg text-white text-lg bg-darkgold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-lightgold"
            disabled={isLoading}
            onClick={handleMint}
          >
            {isLoading ? <Spinner /> : 'Mint'}
          </button>
        )
        }
        {!isLoading && isConnected && !isViction && (
          <button className="w-full mx-4 h-[40px] rounded-lg shadow-lg text-white text-lg bg-darkgold disabled disabled:opacity-50">
            Switch to Viction Testnet
          </button>
        )
        }
        {!isLoading && !isConnected && (
          <button className="w-full mx-4 h-[40px] rounded-lg shadow-lg text-white text-lg bg-darkgold disabled disabled:opacity-50">
            Connect Wallet
          </button>
        )
        }
      </div >
    </>
  )
}

export default MintBox;