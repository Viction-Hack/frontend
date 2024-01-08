import React, { useState } from 'react';

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (slippage: number) => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ isOpen, onClose, onSelect }) => {
  const [selectedSlippage, setSelectedSlippage] = useState<number>(0.3);

  const slippages = [0.3, 1, 5];

  const handleSlippageClick = (slippage: number) => {
    setSelectedSlippage(slippage);
    onSelect(slippage);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Transaction Settings</h2>
        <div>
          <p className="text-md mb-2">Slippage tolerance:</p>
          <div className="flex justify-between mb-4">
            {slippages.map((slippage) => (
              <button
                key={slippage}
                className={`py-2 px-4 ${selectedSlippage === slippage ? 'bg-darkgold' : 'bg-lightgold'} text-white w-1/4 font-bold rounded-lg`}
                onClick={() => handleSlippageClick(slippage)}
              >
                {slippage}%
              </button>
            ))}
          </div>
        </div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">Be careful</p>
          <p>Setting your slippage tolerance in a wrong way may result in a bad rate mint or failure of transaction.</p>
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

export default SettingsPopup;
