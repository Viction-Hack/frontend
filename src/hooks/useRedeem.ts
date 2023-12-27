import { useState, useCallback } from 'react';
import { ethers, Signer, BigNumber } from 'ethers';
import { CONTROLLER_ABI, CONTROLLER_ADDR, DUSD_ADDR, ERC20_ABI } from '@/utils/constants/constants';
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

    if (!signer) {
      setError(new Error('Signer or contract details not set'));
      return;
    }

    try {
      const controllerContract = new ethers.Contract(CONTROLLER_ADDR, CONTROLLER_ABI, signer);
      let tx;
      dispatch(addTransaction({ id: 'Approve Controller', status: 'pending' }));
      dispatch(addTransaction({ id: 'Mint DUSD', status: 'pending' }));

      const collateralAmountInWei = ethers.utils.parseEther(collateralAmount?.toString() || '0').mul(1e18);
      const dUSDCAmountInWei = BigNumber.from(dUSDAmount?.toString() || '0').mul(1e18);

      const dUsdTokenContract = new ethers.Contract(DUSD_ADDR, ERC20_ABI, signer);
      const allowance = await dUsdTokenContract.allowance(user, CONTROLLER_ADDR);
      if (allowance.lt(collateralAmountInWei)) {
        const tx = await dUsdTokenContract.approve(CONTROLLER_ADDR, collateralAmountInWei);
        await tx.wait();
      }
      dispatch(updateTransactionStatus({ id: 'Approve Controller', status: 'completed' }));
      
      // TODO: Fix this to use the correct collateral address
      const collateralAddr = selectedToken === 'VIC' ? ethers.constants.AddressZero : selectedToken;

      tx = await controllerContract.redeem(
        collateralAddr,
        user,
        dUSDCAmountInWei,
        collateralAmountInWei.mul(1 - slippage / 100),
        0 /* TODO: specify deadline */
      );
      await tx.wait();
      dispatch(deleteTransaction('Approve Controller'));
      dispatch(updateTransactionStatus({ id: 'Mint DUSD', status: 'completed' }));
      await delay(2000);
      dispatch(deleteTransaction('Mint DUSD'));

      console.log('Minting successful');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Minting failed', err.message);
        setError(err);
      }
    }
  }, [getSigner, getSelectedToken, getCollateralAmount, getMinDUSDAmount]);

  return { redeem, error };
};
