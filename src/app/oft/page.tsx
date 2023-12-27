"use client"; 
import Header from "../../ui/Header"
import Footer from "../../ui/Footer"
import OFT from "../../components/oft"
import BasicPage from "@/components/basicPage";
import { Provider } from 'react-redux';
import { setupStore, RootState } from '@/utils/store/store';
import { useState, useEffect } from "react";
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import { Store } from '@reduxjs/toolkit';

export default function Oft() {
  const [store, setStore] = useState<Store<RootState> | null>(null);

  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    let cancel = false;

    if (walletProvider) {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();
      signer.getAddress().then(address => {
        if (!cancel) {
          setupStore(address).then(loadedStore => {
            setStore(loadedStore);
          });
        }
      });
    }

    return () => {
      cancel = true;
    };
  }, [walletProvider]);

  return (
    <>
      <Header />
      {store && (
        <Provider store={store}>
          <OFT />
        </Provider>
      )}
      {!store && (
        <BasicPage />
      )}
      <Footer />
    </>
  )
}
