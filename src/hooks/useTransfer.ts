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

    const dstChainId = chainId === 89 ? 10231 : 10196;

    try {
      let tx;
      const dUSDCAmountInWei = ethers.utils.parseEther(dUSDAmount?.toString() || '0');
      const dUsdTokenContract = new ethers.Contract(DUSD_ADDR, ERC20_ABI, signer);

      dispatch(addTransaction({ id: 'Approve Router', status: 'pending' }));
      dispatch(addTransaction({ id: 'Transfer DUSD', status: 'pending' }));

      const allowance = await dUsdTokenContract.allowance(user, DUSD_ADDR);
      if (allowance.lt(dUSDCAmountInWei)) {
        const tx = await dUsdTokenContract.approve(DUSD_ADDR, dUSDCAmountInWei);
        await tx.wait();
      }

      dispatch(updateTransactionStatus({ id: 'Approve Router', status: 'completed' }));
      const version = 1;
      const gasLimit = 350000;
      const adapterParams = ethers.utils.solidityPack(
        ['uint16', 'uint256'],
        [version, gasLimit]
      )
      const params = {
        refundAddress: user,
        zroPaymentAddress: ethers.constants.AddressZero,
        adapterParams: adapterParams,
      };

      tx = await dUsdTokenContract.sendFrom(
        user,
        dstChainId,
        addressToBytes32WithSuffixPadding(user ?? ''),
        dUSDCAmountInWei,
        params
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

function addressToBytes32WithSuffixPadding(address: string) {
  if (address.startsWith('0x')) {
      address = address.substring(2);
  }

  if (address.length !== 40) {
      throw new Error('Invalid address length');
  }

  return '0x' + address.padEnd(64, '0');
}

function addressToBytes32(address: string) {
  if (address.startsWith('0x')) {
      address = address.substring(2);
  }

  if (address.length !== 40) {
      throw new Error('Invalid address length');
  }

  return '0x' + address.padStart(64, '0');
}