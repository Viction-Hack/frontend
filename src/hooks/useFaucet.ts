import { useState, useCallback } from 'react';
import { ethers, Signer } from 'ethers';
import { FAUCET_ABI, FAUCET_ADDR } from '@/utils/constants/constants';

interface UseFaucetHook {
  getTokens: () => Promise<void>;
  error: Error | null;
}

export const useFaucet = (
  getSigner: () => Signer | undefined,
): UseFaucetHook => {
  const [error, setError] = useState<Error | null>(null);

  const getTokens = useCallback(async () => {
    setError(null);

    const signer = getSigner();
    const user = await signer?.getAddress();

    if (!signer) {
      setError(new Error('Signer or contract details not set'));
      return;
    }

    try {
      const faucetContract = new ethers.Contract(FAUCET_ADDR, FAUCET_ABI, signer);
      let tx;
      tx = await faucetContract.mint(user);
      await tx.wait();

      console.log('Transfering successful');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Transfering failed', err.message);
        setError(err);
      }
    }
  }, [getSigner]);

  return { getTokens, error };
};
