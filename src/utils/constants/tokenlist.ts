export interface Token {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logoUrl: string;
  balance?: string;
}

export const tokenList = () => {
  return [
    {
      name: "Viction Coin",
      symbol: "VIC",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      logoUrl: "/viction.svg"
    },
    {
      name: "Dai Stablecoin",
      symbol: "DAI",
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // TODO: Fix address
      decimals: 18,
      logoUrl: "/dai.svg"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // TODO: Fix address
      decimals: 18,
      logoUrl: "/ethereum.svg"
    },
    {
      name: "Doldrums USD",
      symbol: "DUSD",
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // TODO: Fix address
      decimals: 18,
      logoUrl: "/dai.svg" // TODO: make logo
    }
  ]
} 
