"use client";
import { useState } from 'react';

export default function MintBox() {
  const [mintAmount, setMintAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('Viction');

  const tokens = [
    { name: 'ETH', balance: 0.012 },
    { name: 'BTC', balance: 0.0002 },
    { name: 'Viction', balance: 1.0 },
  ]
  return (
    <>
      <div className="bg-gray-100 rounded-lg text-gray-500 text-sm font-medium h-3/5 leading-5 p-4 relative mb-3">
        <h2 className="text-sm font-medium text-gray-500">Mint DUSD with</h2>
        <div className="flex flex-row justify-between h-[60px]">
          <input
              type="number"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              className="focus:ring-indigo-500 focus:border-green-500 block w-full pl-7 pr-12 bg-transparent sm:text-sm border-black rounded-md"
              placeholder="0"
            />
          <div className="flex inset-y-0 right-0 flex items-center h-1/2">
            <label className="sr-only">Currency</label>
            <select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="focus:ring-indigo-500 focus:border-green-500 border border-black h-full py-0 pl-2 pr-7 bg-white text-gray-500 sm:text-sm rounded-md"
            >
              {tokens.map((token) => (
                <option key={token.name} value={token.name}>
                  {token.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col items-end mb-10">
          <p className="text-sm text-gray-500 mt-1">
            {/* Balance: {tokens.find(token => token.name === selectedToken).balance}  */}
            Balance: 0.00
            {/* <span className="cursor-pointer text-indigo-600 hover:text-indigo-800">Max</span> */}
          </p>
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg text-gray-500 text-sm font-medium leading-5 p-4 relative mb-3 mt-10">
        <div className="flex flex-row justify-between h-[60px]">
          <input
              type="number"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              className="focus:ring-indigo-500 focus:border-green-500 block w-full pl-7 pr-12 bg-transparent sm:text-sm border-black rounded-md"
              placeholder="0"
            />
        </div>
      </div>
      <div className="flex justify-center">
        <button className="w-full h-[40px] rounded-lg shadow-lg text-white text-lg bg-green-500">Mint</button>
      </div>
    </>
  )
}