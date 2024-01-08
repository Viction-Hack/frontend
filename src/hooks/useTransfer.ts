import { useState, useCallback } from 'react';
import { ethers, Signer } from 'ethers';
import { DUSD_ADDR, ERC20_ABI } from '@/utils/constants/constants';
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

    console.log("Signer: ", signer);

    const dstChainId = chainId === 89 ? 10106 : 10196;
    let dusdAddr = DUSD_ADDR;
    if (chainId != 89) {
      dusdAddr = '0x5Ef6A635513E6f2Af746a85f4a51Af774a5804BC';
    }

    try {
      
      let tx;
      const dUSDCAmountInWei = ethers.utils.parseEther(dUSDAmount?.toString() || '0');
      const dUsdTokenContract = new ethers.Contract(dusdAddr, ERC20_ABI, signer);

      dispatch(addTransaction({ id: 'Approve Router', status: 'pending' }));
      dispatch(addTransaction({ id: 'Transfer DUSD', status: 'pending' }));

      const allowance = await dUsdTokenContract.allowance(user, dusdAddr);
      if (allowance.lt(dUSDCAmountInWei)) {
        const tx = await dUsdTokenContract.approve(dusdAddr, dUSDCAmountInWei);
        await tx.wait();
      }

      dispatch(updateTransactionStatus({ id: 'Approve Router', status: 'completed' }));

      tx = await dUsdTokenContract.sendFrom(
        user,
        dstChainId,
        addressToBytes32WithSuffixPadding(user ?? ''),
        dUSDCAmountInWei,
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