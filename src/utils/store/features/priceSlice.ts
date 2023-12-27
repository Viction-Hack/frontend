import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenPrice } from './types';

const initialState: TokenPrice = {};

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setPrices: (state, action: PayloadAction<TokenPrice>) => {
      return action.payload;
    },
  },
});

export const { setPrices } = pricesSlice.actions;
export default pricesSlice.reducer;
