import { useState, useCallback } from 'react';
import { ethers, Signer, BigNumber } from 'ethers';
import { CONTROLLER_ABI, CONTROLLER_ADDR } from '@/utils/constants/constants';

interface UseMintHook {
  mint: () => Promise<void>;
  error: Error | null;
}

export const useMint = (
  getSigner: () => Signer | undefined,
  getContractDetails: () => { address: string; abi: any } | undefined,
  getSelectedToken: () => string | undefined,
  getCollateralAmount: () => string | undefined,
  getMinDUSDCAmount: () => number | undefined,
  slippage: number
): UseMintHook => {
  const [error, setError] = useState<Error | null>(null);

  const mint = useCallback(async () => {
    setError(null);

    const signer = getSigner();
    const contractDetails = getContractDetails();
    const selectedToken = getSelectedToken();
    const collateralAmount = getCollateralAmount();
    const dUSDCAmount = getMinDUSDCAmount();
    const user = await signer?.getAddress();

    if (!signer || !contractDetails) {
      setError(new Error('Signer or contract details not set'));
      return;
    }

    try {
      const controllerContract = new ethers.Contract(CONTROLLER_ADDR, CONTROLLER_ABI, signer);
      let tx;

      const collateralAmountInWei = ethers.utils.parseEther(collateralAmount?.toString() || '0').mul(1e18);
      const dUSDCAmountInWei = BigNumber.from(dUSDCAmount?.toString() || '0').mul(1e18);

      if (selectedToken === 'VIC') {
        tx = await controllerContract.mintWithVic(
          user,
          dUSDCAmountInWei.mul(1 - slippage / 100),
          0 /* TODO: specify deadline */, 
          {value: collateralAmountInWei}
        );
      } else {
        const collateralTokenContract = new ethers.Contract(contractDetails.address, contractDetails.abi, signer);
        const allowance = await collateralTokenContract.allowance(user, CONTROLLER_ADDR);
        if (allowance.lt(collateralAmountInWei)) {
          const tx = await collateralTokenContract.approve(CONTROLLER_ADDR, collateralAmountInWei);
          await tx.wait();
        }
        tx = await controllerContract.mint(
          collateralTokenContract.address,
          user,
          collateralAmountInWei,
          dUSDCAmountInWei.mul(1 - slippage / 100),
          0 /* TODO: specify deadline */
        );
      }
      await tx.wait();

      console.log('Minting successful');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Minting failed', err.message);
        setError(err);
      }
    }
  }, [getSigner, getContractDetails, getSelectedToken, getCollateralAmount, getMinDUSDCAmount]);

  return { mint, error };
};
