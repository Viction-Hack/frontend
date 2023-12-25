"use client";
import { useState, useCallback } from 'react';
import MintBox from './MintBox';
import RedeemBox from './RedeemBox';

export default function ActionBox() {
  const [isMinting, setIsMinting] = useState(true);

  const handleMintOrRedeem = () => {
    setIsMinting(!isMinting);
  }

  const selectedMintTextColor = isMinting ? "text-gray-900" : "text-gray-300";
  const selectedRedeemTextColor = isMinting ? "text-gray-300" : "text-gray-900";

  return (
    <div className="flex flex-col justify-center items-center mx-auto mb-3">
      <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg p-6 m-3 w-1/2">
        <div className="flex flex-row items-start grid grid-cols-10 px-1 py-1">
          <button className={`text-lg font-medium ${selectedMintTextColor}`} onClick={handleMintOrRedeem} disabled={isMinting}>Mint</button>
          <button className={`text-lg font-medium ${selectedRedeemTextColor}`} onClick={handleMintOrRedeem} disabled={!isMinting}>Redeem</button>
          <button className="text-gray-400 col-start-10">
            <span>settings</span>
          </button>
        </div>
        <div>
          {isMinting ? 
            <MintBox /> : <RedeemBox /> 
          }
        </div>
      </div>
    </div>
  )
}