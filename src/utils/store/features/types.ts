export interface UserBalance {
  DUSD: number;
  ETH: number;
  DAI: number;
  VIC: number;
}

export interface Position {
  asset: string; // 'ETH', 'DAI', 'VIC', etc.
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
