"use client";
export default function ChainlistHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex justify-center text-white font-bold bg-gray-500 items-center">
      Add Viction Testnet Network in your wallet before the interaction!
      <AddChainButton />
    </header>
  );
}

const AddChainButton = () => {
  const addVictionTestnet = async () => {
    try {
      if (window.ethereum) {
        const chainId: number = 89;

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Tomochain Testnet',
              chainId: `0x${chainId.toString(16)}`, // Convert the chainId to hexadecimal
              nativeCurrency: {
                name: 'Viction',
                decimals: 18,
                symbol: 'TOMO',
              },
              rpcUrls: ['https://rpc.testnet.tomochain.com/'],
            },
          ],
        });
      } else {
        console.error('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error adding Viction Testnet:', error);
    }
  };

  return (
    <button className="flex p-2 ml-5 bg-white text-black rounded-xl hover:bg-blue-300" onClick={addVictionTestnet}>Add Viction Testnet</button>
  );
};