import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupplyInfo } from './types';

const initialState: SupplyInfo = {
  totalSupply: 100,
  victionSupply: 100,
};

export const dusdSupplySlice  = createSlice({
  name: 'dusdSupply',
  initialState,
  reducers: {
    setDusdSupply: (state, action: PayloadAction<SupplyInfo>) => {
      return action.payload;
    },
  },
});

export const { setDusdSupply } = dusdSupplySlice .actions;
export default dusdSupplySlice;
