import { useState, useCallback } from 'react';
import { ethers, Signer, BigNumber } from 'ethers';
import { CONTROLLER_ABI, CONTROLLER_ADDR, DUSD_ADDR, ERC20_ABI, VIC_VAULT_ADDR } from '@/utils/constants/constants';
import { useDispatch } from 'react-redux';
import { 
  addTransaction,
  updateTransactionStatus,
  deleteTransaction
} from '@/utils/store/features/transactionSlice';

interface UseRedeemHook {
  redeem: () => Promise<void>;
  error: Error | null;
}

export const useRedeem = (
  getSigner: () => Signer | undefined,
  getSelectedToken: () => string | undefined,
  getCollateralAmount: () => string | undefined,
  getMinDUSDAmount: () => number | undefined,
  slippage: number
): UseRedeemHook => {
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const redeem = useCallback(async () => {
    setError(null);

    const signer = getSigner();
    const selectedToken = getSelectedToken();
    const collateralAmount = getCollateralAmount();
    const dUSDAmount = getMinDUSDAmount();
    const user = await signer?.getAddress();

    let collateralAddr = '';
    console.log('selectedToken', selectedToken);
    if (selectedToken === 'VIC') {
      collateralAddr = '0xe65c74456282E63Adc7f43d8a69A0D6BAD0005b6';
    } else if (selectedToken === 'ETH') {
      collateralAddr = '0xfE4BE182E67a7eb163ADE9f7c2EE636E81Ea2112';
    } else if (selectedToken === 'DAI') {
      collateralAddr = '0xa087E9D30010348a243354E13512f3e06CA7Ad49';
    }

    if (!signer) {
      setError(new Error('Signer or contract details not set'));
      return;
    }

    try {
      const controllerContract = new ethers.Contract(CONTROLLER_ADDR, CONTROLLER_ABI, signer);
      let tx;
      dispatch(addTransaction({ id: 'Approve Controller', status: 'pending' }));
      dispatch(addTransaction({ id: 'Redeem Collateral', status: 'pending' }));

      const collateralAmountInWei = ethers.utils.parseEther(collateralAmount?.toString() || '0');
      const dUSDCAmountInWei = ethers.utils.parseEther(dUSDAmount?.toString() || '0');

      const dUsdTokenContract = new ethers.Contract(DUSD_ADDR, ERC20_ABI, signer);
      const allowance = await dUsdTokenContract.allowance(user, CONTROLLER_ADDR);
      console.log('allowance', allowance.toString());
      console.log('collateralAmountInWei', collateralAmountInWei.toString());

      if (allowance.lt(collateralAmountInWei)) {
        const tx = await dUsdTokenContract.approve(CONTROLLER_ADDR, collateralAmountInWei);
        await tx.wait();
      }
      dispatch(updateTransactionStatus({ id: 'Approve Controller', status: 'completed' }));
      const slip = (1 - slippage)*1000;

      tx = await controllerContract.redeem(
        collateralAddr,
        user,
        collateralAmountInWei,
        dUSDCAmountInWei.mul(slip).div(1000),
        2000000000
      );
      await tx.wait();
      dispatch(deleteTransaction('Approve Controller'));
      dispatch(updateTransactionStatus({ id: 'Redeem Collateral', status: 'completed' }));
      await delay(2000);
      dispatch(deleteTransaction('Redeem Collateral'));

      console.log('Redeeming successful');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Redeeming failed', err.message);
        setError(err);
      }
    }
  }, [getSigner, getSelectedToken, getCollateralAmount, getMinDUSDAmount]);

  return { redeem, error };
};
