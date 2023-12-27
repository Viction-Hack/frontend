"use client";
import { useState, useCallback, useEffect } from 'react';
import TransferBox from './TransferBox';
import Settings from '@/ui/Settings';
import SettingsPopup from '@/ui/SettingsPopup';
import TxStatus from '@/ui/TxStatus';
import XchainTransactionPopup from '@/ui/XchainTransactionPopup';
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";

export default function ActionBox() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSlippage, setSelectedSlippage] = useState(0.3);
  const [isTxPopupOpen, setIsTxPopupOpen] = useState(false);

  const userBalances = useSelector((state: RootState) => state.userBalances);

  const handleSelectSlippage = (slippage: number) => {
    setSelectedSlippage(slippage);
  }

  const handleSettingsClick = () => {
    setIsPopupOpen(true);
  }

  const handleTxClick = () => {
    setIsTxPopupOpen(true);
  }

  useEffect(() => {
    console.log(selectedSlippage);
  }, [selectedSlippage]);

  return (
    <div className="flex flex-col justify-center items-center mx-auto mb-3">
      <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg p-6 m-3 w-1/3">
        <div className="flex flex-row items-start grid grid-cols-6 px-1 py-1">
          <div className="text-lg font-medium text-gray-900 col-span-3">Transfer DUSD</div>
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
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSelect={handleSelectSlippage}
          />
        </div>
        <div>
          <TransferBox slippage={selectedSlippage} userBalances={userBalances} />
        </div>
      </div>
    </div>
  )
}