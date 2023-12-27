import { configureStore } from '@reduxjs/toolkit';
import userBalanceSlice from './features/userBalanceSlice';
import positionSlice from './features/positionSlice';
import priceSlice from './features/priceSlice';
import dusdSupplySlice from './features/dusdSupplySlice';
import { initializeStore } from './initialize';
import { ethers } from 'ethers';

let store: ReturnType<typeof configureStore>;

export async function setupStore(signer: ethers.Signer) {
  const initialState = await initializeStore(signer);

  store = configureStore({
    reducer: {
      userBalances: userBalanceSlice,
      positions: positionSlice,
      tokenPrices: priceSlice,
      dusdSupplyInfo: dusdSupplySlice,
    },
    preloadedState: initialState,
  });

  return store;
}

export function getDispatch() {
  if (!store) {
    throw new Error("The store has not been initialized yet.");
  }
  return store.dispatch;
}
