"use client";
import { useState, useCallback, useEffect } from 'react';
import MintBox from './MintBox';
import RedeemBox from './RedeemBox';
import Settings from '@/ui/Settings';
import TxStatus from '@/ui/TxStatus';
import SettingsPopup from '@/ui/SettingsPopup';
import XchainTransactionPopup from '@/ui/XchainTransactionPopup';
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";

export default function ActionBox() {
  const [isMinting, setIsMinting] = useState(true);
  const [isSettingPopupOpen, setIsSettingPopupOpen] = useState(false);
  const [isTxPopupOpen, setIsTxPopupOpen] = useState(false);

  const [selectedSlippage, setSelectedSlippage] = useState(0.3);

  const userBalances = useSelector((state: RootState) => state.userBalances);
  const prices = useSelector((state: RootState) => state.tokenPrices);
  const transactions = useSelector((state: RootState) => state.transactions);

  const handleMintOrRedeem = () => {
    setIsMinting(!isMinting);
  }

  const handleSelectSlippage = (slippage: number) => {
    setSelectedSlippage(slippage);
  }

  const handleSettingsClick = () => {
    setIsSettingPopupOpen(true);
  }

  const handleTxClick = () => {
    setIsTxPopupOpen(true);
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
          <button className="col-start-5" onClick={handleTxClick}>
            <TxStatus />
          </button>
          <XchainTransactionPopup
            isOpen={isTxPopupOpen}
            onClose={() => setIsTxPopupOpen(false)}
          />
          <button className="col-start-6" onClick={handleSettingsClick}>
            <Settings />
          </button>
          <SettingsPopup
            isOpen={isSettingPopupOpen}
            onClose={() => setIsSettingPopupOpen(false)}
            onSelect={handleSelectSlippage}
          />
        </div>
        <div>
          {isMinting ? 
            <MintBox slippage={selectedSlippage} userBalances={userBalances} tokenPrices={prices} /> 
            : <RedeemBox slippage={selectedSlippage} userBalances={userBalances} tokenPrices={prices}/> 
          }
        </div>
      </div>
    </div>
  )
}