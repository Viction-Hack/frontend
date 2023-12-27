import { useState, useCallback } from 'react';
import { ethers, Signer, BigNumber } from 'ethers';
import { CONTROLLER_ABI, CONTROLLER_ADDR, DUSD_ADDR, ERC20_ABI } from '@/utils/constants/constants';
import { useDispatch } from 'react-redux';
import { 
  addTransaction,
  updateTransactionStatus,
  deleteTransaction
} from '@/utils/store/features/transactionSlice';

interface UseTransferHook {
  transfer: () => Promise<void>;
  error: Error | null;
}

export const useTransfer = (
  getSigner: () => Signer | undefined,
  getMinDUSDAmount: () => number | undefined,
  slippage: number,
  chainId: number
): UseTransferHook => {
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const transfer = useCallback(async () => {
    setError(null);

    const signer = getSigner();
    const dUSDAmount = getMinDUSDAmount();
    const user = await signer?.getAddress();

    if (!signer) {
      setError(new Error('Signer or contract details not set'));
      return;
    }

    const dstChainId = chainId === 89 ? 421614 : 89;

    try {
      let tx;
      const dUSDCAmountInWei = ethers.utils.parseEther(dUSDAmount?.toString() || '0');
      const dUsdTokenContract = new ethers.Contract(DUSD_ADDR, ERC20_ABI, signer);

      dispatch(addTransaction({ id: 'Approve Router', status: 'pending' }));
      dispatch(addTransaction({ id: 'Transfer DUSD', status: 'pending' }));

      const allowance = await dUsdTokenContract.allowance(user, CONTROLLER_ADDR);
      if (allowance.lt(dUSDCAmountInWei)) {
        const tx = await dUsdTokenContract.approve(CONTROLLER_ADDR, dUSDCAmountInWei);
        await tx.wait();
      }

      dispatch(updateTransactionStatus({ id: 'Approve Router', status: 'completed' }));

      tx = await dUsdTokenContract.sendFrom(
        user,
        dstChainId,
        user,
        dUSDCAmountInWei,
        "0x"
      );
      await tx.wait();

      dispatch(deleteTransaction('Approve Router'));
      dispatch(updateTransactionStatus({ id: 'Transfer DUSD', status: 'completed' }));
      await delay(2000);
      dispatch(deleteTransaction('Transfer DUSD'));

      console.log('Transfering successful');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Transfering failed', err.message);
        setError(err);
      }
    }
  }, [getSigner, getMinDUSDAmount]);

  return { transfer, error };
};
