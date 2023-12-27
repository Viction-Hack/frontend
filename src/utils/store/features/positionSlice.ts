import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position, PositionsState } from './types';


const initialState: PositionsState = {
  positions: [],
};

export const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    setPositions: (state, action: PayloadAction<Position[]>) => {
      state.positions = action.payload;
    },
  },
});

export const { setPositions } = positionsSlice.actions;
export default positionsSlice.reducer;
