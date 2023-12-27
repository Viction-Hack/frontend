import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionState } from './types';


const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    updateTransactionStatus: (state, action: PayloadAction<{ id: string; status: Transaction['status'] }>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index].status = action.payload.status;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        transaction => transaction.id !== action.payload
      );
    },
  },
});

export const { addTransaction, updateTransactionStatus } = transactionSlice.actions;

export default transactionSlice;