"use client";
import { useState, useCallback, useEffect } from 'react';
import MintBox from './MintBox';
import RedeemBox from './RedeemBox';
import Settings from '@/ui/Settings';
import SettingsPopup from './SettingsPopup';

export default function ActionBox() {
  const [isMinting, setIsMinting] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSlippage, setSelectedSlippage] = useState(0.3);

  const handleMintOrRedeem = () => {
    setIsMinting(!isMinting);
  }

  const handleSelectSlippage = (slippage: number) => {
    setSelectedSlippage(slippage);
  }

  const handleSettingsClick = () => {
    setIsPopupOpen(true);
  }

  useEffect(() => {
    console.log(selectedSlippage);
  }, [selectedSlippage]);

  const selectedMintTextColor = isMinting ? "text-gray-900" : "text-gray-300";
  const selectedRedeemTextColor = isMinting ? "text-gray-300" : "text-gray-900";

  return (
    <div className="flex flex-col justify-center items-center mx-auto mb-3">
      <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg p-6 m-3 w-1/3">
        <div className="flex flex-row items-start grid grid-cols-6 px-1 py-1">
          <button className={`text-lg font-medium ${selectedMintTextColor}`} onClick={handleMintOrRedeem} disabled={isMinting}>Mint</button>
          <button className={`text-lg font-medium ${selectedRedeemTextColor}`} onClick={handleMintOrRedeem} disabled={!isMinting}>Redeem</button>
          <button className="col-start-6" onClick={handleSettingsClick}>
            <Settings />
            
          </button>
          <SettingsPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSelect={handleSelectSlippage}
          />
        </div>
        <div>
          {isMinting ? 
            <MintBox slippage={selectedSlippage} /> : <RedeemBox slippage={selectedSlippage} /> 
          }
        </div>
      </div>
    </div>
  )
}