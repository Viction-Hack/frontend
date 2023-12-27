import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserBalance } from './types';

const initialState: UserBalance = {
  DUSD: 0,
  ETH: 0,
  DAI: 0,
  VIC: 0,
};

export const userBalancesSlice = createSlice({
  name: 'userBalances',
  initialState,
  reducers: {
    setUserBalance: (state, action: PayloadAction<UserBalance>) => {
      return action.payload;
    },
  },
});

export const { setUserBalance } = userBalancesSlice.actions;
export default userBalancesSlice;
