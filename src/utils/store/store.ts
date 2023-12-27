import { configureStore, combineReducers, Store } from '@reduxjs/toolkit';
import userBalanceSlice from './features/userBalanceSlice';
import positionSlice from './features/positionSlice';
import priceSlice from './features/priceSlice';
import dusdSupplySlice from './features/dusdSupplySlice';
import transactionSlice from './features/transactionSlice';
import { initializeStore } from './initialize';

const rootReducer = combineReducers({
  userBalances: userBalanceSlice.reducer,
  positions: positionSlice.reducer,
  tokenPrices: priceSlice.reducer,
  dusdSupplyInfo: dusdSupplySlice.reducer,
  transactions: transactionSlice.reducer,
});

export type AppStore = Store<RootState>;

let store: AppStore | undefined;

export async function setupStore(address: string) {
  const initialState = await initializeStore(address);

  store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  return store;
}

export type RootState = ReturnType<typeof rootReducer>;

export function getDispatch() {
  if (!store) {
    throw new Error("The store has not been initialized yet.");
  }
  return store.dispatch;
}
