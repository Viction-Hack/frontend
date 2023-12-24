"use client"
import React from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? "";

// 2. Set chains
const victionTestnet = {
  chainId: 89,
  name: 'Viction Testnet',
  currency: 'VIC',
  explorerUrl: 'https://testnet.tomoscan.io/',
  rpcUrl: 'https://rpc.testnet.tomochain.com/'
}

// 3. Create modal
const metadata = {
  name: 'DeltaNeutral Stablecoin',
  description: 'USD-pegged stablecoin with delta-hedged positions, built on Viction.',
  url: 'http://localhost:3001',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [victionTestnet],
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#ffffff',
    '--w3m-color-mix-strength': 40,
    '--w3m-accent': '#14532d',
  }
})

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}