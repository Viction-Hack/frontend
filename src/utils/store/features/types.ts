export interface UserBalance {
  DUSD: number;
  ETH: number;
  DAI: number;
  VIC: number;
}

export interface Position {
  token: string;
  amount: number;
}

export interface PositionsState {
  positions: Position[];
}

export interface TokenPrice {
  [key: string]: number; // { ETH: 3000, DAI: 1, VIC: 2 }
}

export interface SupplyInfo {
  totalSupply: number;
  victionSupply: number;
}

export interface AppState {
  userBalances: UserBalance;
  positions: PositionsState;
  tokenPrices: TokenPrice;
  dusdSupplyInfo: SupplyInfo;
}

export interface Transaction {
  id: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface TransactionState {
  transactions: Transaction[];
}

export enum TransactionActionTypes {
  ADD_TRANSACTION = 'ADD_TRANSACTION',
  UPDATE_TRANSACTION_STATUS = 'UPDATE_TRANSACTION_STATUS',
  DELETE_TRANSACTION = 'DELETE_TRANSACTION',
}

export interface AddTransactionAction {
  type: TransactionActionTypes.ADD_TRANSACTION;
  payload: Transaction;
}

export interface UpdateTransactionStatusAction {
  type: TransactionActionTypes.UPDATE_TRANSACTION_STATUS;
  payload: { id: string; status: Transaction['status'] };
}

export type TransactionActions = AddTransactionAction | UpdateTransactionStatusAction;