import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/store/store';

interface TransactionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionPopup: React.FC<TransactionPopupProps> = ({ isOpen, onClose }) => {
  const [transactionStatuses, setTransactionStatuses] = useState<Record<string, string>>({});
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  useEffect(() => {
    const newStatuses = transactions.reduce((acc, transaction) => {
      acc[transaction.id] = transaction.status;
      return acc;
    }, {} as Record<string, string>);

    setTransactionStatuses(newStatuses);
  }, [transactions]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Transactions Status</h2>
        <div className='flex flex-col'>
          {Object.keys(transactionStatuses).length === 0 ? (
            <p>No transactions to display</p>
          ) : (
            Object.entries(transactionStatuses).map(([id, status]) => (
              <div key={id} className="flex flex-row justify-between mb-2">
                <p className='text-lg font-semibold'>- Tx: {id}</p>
                <div className={`py-2 px-4 ${status === 'completed' ? 'bg-blue-500' : status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'} text-white font-bold rounded-lg`}>
                  {status}
                </div>
              </div>
            ))
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionPopup;
