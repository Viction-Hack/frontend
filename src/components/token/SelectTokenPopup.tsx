import React, { useState } from 'react';
import { Token } from '@/utils/constants/tokenlist';
import { UserBalance } from '@/utils/store/features/types';

interface SelectTokenPopupProps {
  tokens: Token[];
  isOpen: boolean;
  userBalances: UserBalance;
  onClose: () => void;
  onSelect: (tokenSymbol: string) => void;
}

const SelectTokenPopup: React.FC<SelectTokenPopupProps> = ({ tokens, isOpen, userBalances, onClose, onSelect }) => {
  const [selectedToken, setSelectedToken] = useState<string>('');

  const handleTokenClick = (tokenSymbol: string) => {
    setSelectedToken(tokenSymbol);
    onSelect(tokenSymbol);
    console.log(tokenSymbol);
  };

  const fetchBalance = (tokenSymbol: string) => {
    if (tokenSymbol === 'VIC') {
      return userBalances.VIC
    } else if (tokenSymbol === 'ETH') {
      return userBalances.ETH
    } else if (tokenSymbol === 'DAI') {
      return userBalances.DAI
    } else if (tokenSymbol === 'DUSD') {
      return userBalances.DUSD
    } else {
      return 0.00
    }
  }

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
              className={`flex items-center justify-between p-2 hover:bg-blue-100 rounded-md ${selectedToken === token.name ? 'bg-blue-200' : ''}`}
              onClick={() => handleTokenClick(token.symbol)}
            >
              <div className="flex items-center">
                <img src={token.logoUrl} alt={token.symbol} className="h-6 w-6 rounded-full mr-2" />
                <span>{token.name}</span>
              </div>
              <span>{fetchBalance(token.symbol)}</span>
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