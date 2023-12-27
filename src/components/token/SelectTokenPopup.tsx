import React, { useState } from 'react';
import { Token } from '@/utils/constants/tokenlist';

interface SelectTokenPopupProps {
  tokens: Token[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tokenSymbol: string) => void;
}

const SelectTokenPopup: React.FC<SelectTokenPopupProps> = ({ tokens, isOpen, onClose, onSelect }) => {
  const [selectedToken, setSelectedToken] = useState<string>('');

  const handleTokenClick = (tokenSymbol: string) => {
    setSelectedToken(tokenSymbol);
    onSelect(tokenSymbol);
    console.log(tokenSymbol);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Select a Token</h2>
        <ul>
          {tokens.map((token) => (
            <li
              key={token.name}
              className={`flex items-center justify-between p-2 hover:bg-gray-100 rounded-md ${selectedToken === token.name ? 'bg-gray-200' : ''}`}
              onClick={() => handleTokenClick(token.symbol)}
            >
              <div className="flex items-center">
                <img src={token.logoUrl} alt={token.symbol} className="h-6 w-6 rounded-full mr-2" />
                <span>{token.name}</span>
              </div>
              <span>{token.balance}</span>
            </li>
          ))}
        </ul>
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

export default SelectTokenPopup;