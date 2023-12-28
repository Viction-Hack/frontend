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
      address: "0xa21b20E49c92653bA143009B89d936818a3b7609",
      decimals: 18,
      logoUrl: "/dai.svg"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      address: "0x43f9440E54123f288d319C355671Dad9F27c2986",
      decimals: 18,
      logoUrl: "/ethereum.svg"
    },
    {
      name: "Doldrums USD",
      symbol: "DUSD",
      address: "0x8ec92FE248Fcf857d0F1cD1346AE3264bC0376A1",
      decimals: 18,
      logoUrl: "/dai.svg"
    }
  ]
} 
