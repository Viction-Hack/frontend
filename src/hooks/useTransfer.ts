import { useState, useCallback } from 'react';
import { ethers, Signer, BigNumber } from 'ethers';
import { CONTROLLER_ABI, CONTROLLER_ADDR, DUSD_ADDR, ERC20_ABI } from '@/utils/constants/constants';

interface UseTransferHook {
  transfer: () => Promise<void>;
  error: Error | null;
}

// TODO: Fix the method to use the correct OFT transfer method
export const useTransfer = (
  getSigner: () => Signer | undefined,
  getMinDUSDCAmount: () => number | undefined,
): UseTransferHook => {
  const [error, setError] = useState<Error | null>(null);

  const transfer = useCallback(async () => {
    setError(null);

    const signer = getSigner();
    const dUSDCAmount = getMinDUSDCAmount();
    const user = await signer?.getAddress();

    if (!signer) {
      setError(new Error('Signer or contract details not set'));
      return;
    }

    try {
      const controllerContract = new ethers.Contract(CONTROLLER_ADDR, CONTROLLER_ABI, signer);
      let tx;

      const dUSDCAmountInWei = BigNumber.from(dUSDCAmount?.toString() || '0').mul(1e18);

      const dUsdTokenContract = new ethers.Contract(DUSD_ADDR, ERC20_ABI, signer);
      const allowance = await dUsdTokenContract.allowance(user, CONTROLLER_ADDR);
      if (allowance.lt(dUSDCAmountInWei)) {
        const tx = await dUsdTokenContract.approve(CONTROLLER_ADDR, dUSDCAmountInWei);
        await tx.wait();
      }
      // TODO: Fix this to use correct OFT transfer method
      tx = await controllerContract.transfer(
        // collateralTokenContract.address,
        // user,
        // collateralAmountInWei,
        // dUSDCAmountInWei,
        // 0
      );

      await tx.wait();

      console.log('Transfering successful');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Transfering failed', err.message);
        setError(err);
      }
    }
  }, [getSigner, getMinDUSDCAmount]);

  return { transfer, error };
};
