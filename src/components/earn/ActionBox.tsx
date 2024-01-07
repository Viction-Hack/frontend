"use client";
import { useState, useCallback, useEffect } from 'react';
import TransferBox from './TransferBox';
import TxStatus from '@/ui/TxStatus';
import XchainTransactionPopup from '@/ui/XchainTransactionPopup';
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";

export default function ActionBox() {
  const [isTxPopupOpen, setIsTxPopupOpen] = useState(false);

  const userBalances = useSelector((state: RootState) => state.userBalances);

  const handleTxClick = () => {
    setIsTxPopupOpen(true);
  }

  return (
    <div className="flex flex-col justify-center items-center mx-auto mb-3">
      <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg p-6 m-3 w-1/3">
        <div className="flex flex-row items-start grid grid-cols-6 px-1 py-1">
          <div className="text-lg font-medium text-gray-900 col-span-3">Deposit DUSD</div>
          <button className="col-start-6" onClick={handleTxClick}>
            <TxStatus />
          </button>
          <XchainTransactionPopup
            isOpen={isTxPopupOpen}
            onClose={() => setIsTxPopupOpen(false)}
          />
        </div>
        <div>
          <TransferBox userBalances={userBalances} />
        </div>
      </div>
    </div>
  )
}