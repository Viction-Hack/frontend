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
      address: "0xe65c74456282E63Adc7f43d8a69A0D6BAD0005b6",
      decimals: 18,
      logoUrl: "/viction.svg"
    },
    {
      name: "Dai Stablecoin",
      symbol: "DAI",
      address: "0xa087E9D30010348a243354E13512f3e06CA7Ad49",
      decimals: 18,
      logoUrl: "/dai.svg"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      address: "0xfE4BE182E67a7eb163ADE9f7c2EE636E81Ea2112",
      decimals: 18,
      logoUrl: "/ethereum.svg"
    },
    {
      name: "Doldrums USD",
      symbol: "DUSD",
      address: "0x2dF5dc099e89EF6F1B92A5a9a744D562586C61d7",
      decimals: 18,
      logoUrl: "/icon.svg"
    }
  ]
} 
