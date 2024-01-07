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
      address: "0x24c470BF5Fd6894BC935d7A4c0Aa65f6Ad8E3D5a",
      decimals: 18,
      logoUrl: "/viction.svg"
    },
    {
      name: "Dai Stablecoin",
      symbol: "DAI",
      address: "0xEC3Ac809B27da7cdFC306792DA72aA896ed865eD",
      decimals: 18,
      logoUrl: "/dai.svg"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      address: "0xA5f8B90975C6f3b15c90CbC75b44F10300b42bbe",
      decimals: 18,
      logoUrl: "/ethereum.svg"
    },
    {
      name: "Doldrums USD",
      symbol: "DUSD",
      address: "0x46F96fB34Ac52DaE43E7FC441F429d2F5BcCDf52",
      decimals: 18,
      logoUrl: "/icon.svg"
    }
  ]
} 
