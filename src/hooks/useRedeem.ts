import { useState, useCallback } from 'react';
import { ethers, Signer, BigNumber } from 'ethers';
import { CONTROLLER_ABI, CONTROLLER_ADDR, DUSD_ADDR, ERC20_ABI } from '@/utils/constants/constants';

interface UseRedeemHook {
  redeem: () => Promise<void>;
  error: Error | null;
}

export const useRedeem = (
  getSigner: () => Signer | undefined,
  getSelectedToken: () => string | undefined,
  getCollateralAmount: () => string | undefined,
  getMinDUSDCAmount: () => number | undefined,
): UseRedeemHook => {
  const [error, setError] = useState<Error | null>(null);

  const redeem = useCallback(async () => {
    setError(null);

    const signer = getSigner();
    const selectedToken = getSelectedToken();
    const collateralAmount = getCollateralAmount();
    const dUSDCAmount = getMinDUSDCAmount();
    const user = await signer?.getAddress();

    if (!signer) {
      setError(new Error('Signer or contract details not set'));
      return;
    }

    try {
      const controllerContract = new ethers.Contract(CONTROLLER_ADDR, CONTROLLER_ABI, signer);
      let tx;

      const collateralAmountInWei = ethers.utils.parseEther(collateralAmount?.toString() || '0').mul(1e18);
      const dUSDCAmountInWei = BigNumber.from(dUSDCAmount?.toString() || '0').mul(1e18);

      const dUsdTokenContract = new ethers.Contract(DUSD_ADDR, ERC20_ABI, signer);
      const allowance = await dUsdTokenContract.allowance(user, CONTROLLER_ADDR);
      if (allowance.lt(collateralAmountInWei)) {
        const tx = await dUsdTokenContract.approve(CONTROLLER_ADDR, collateralAmountInWei);
        await tx.wait();
      }
      
      // TODO: Fix this to use the correct collateral address
      const collateralAddr = selectedToken === 'VIC' ? ethers.constants.AddressZero : selectedToken;

      tx = await controllerContract.redeem(
        collateralAddr,
        user,
        dUSDCAmountInWei,
        collateralAmountInWei /* TODO: Include slippage */,
        0 /* TODO: specify deadline */
      );
      await tx.wait();
      console.log('Minting successful');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Minting failed', err.message);
        setError(err);
      }
    }
  }, [getSigner, getSelectedToken, getCollateralAmount, getMinDUSDCAmount]);

  return { redeem, error };
};
