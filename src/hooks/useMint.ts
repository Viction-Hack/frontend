import { useState, useCallback } from 'react';
import { ethers, Signer, BigNumber } from 'ethers';
import { CONTROLLER_ABI, CONTROLLER_ADDR } from '@/utils/constants/constants';
import { useDispatch } from 'react-redux';
import { 
  addTransaction,
  updateTransactionStatus,
  deleteTransaction
} from '@/utils/store/features/transactionSlice';

interface UseMintHook {
  mint: () => Promise<void>;
  error: Error | null;
}

export const useMint = (
  getSigner: () => Signer | undefined,
  getContractDetails: () => { address: string; abi: any } | undefined,
  getSelectedToken: () => string | undefined,
  getCollateralAmount: () => string | undefined,
  getMinDUSDAmount: () => number | undefined,
  slippage: number
): UseMintHook => {
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const mint = useCallback(async () => {
    setError(null);

    const signer = getSigner();
    const contractDetails = getContractDetails();
    const selectedToken = getSelectedToken();
    const collateralAmount = getCollateralAmount();
    const dUSDCAmount = getMinDUSDAmount();
    const user = await signer?.getAddress();

    if (!signer || !contractDetails) {
      setError(new Error('Signer or contract details not set'));
      return;
    }

    try {
      const controllerContract = new ethers.Contract(CONTROLLER_ADDR, CONTROLLER_ABI, signer);
      let tx;

      const collateralAmountInWei = ethers.utils.parseEther(collateralAmount?.toString() || '0');
      console.log('collateralAmountInWei', collateralAmountInWei.toString());
      const dUSDCAmountInWei = ethers.utils.parseEther(collateralAmount?.toString() || '0');
      console.log('dUSDCAmountInWei', dUSDCAmountInWei.toString());
      if (selectedToken === 'VIC') {
        dispatch(addTransaction({ id: 'Mint DUSD', status: 'pending' }));
        
        tx = await controllerContract.mintWithVic(
          user,
          dUSDCAmountInWei.mul(1 - slippage / 100),
          0 /* TODO: specify deadline */, 
          {value: collateralAmountInWei}
        );
        
      } else {
        dispatch(addTransaction({ id: 'Approve Controller', status: 'pending' }));
        dispatch(addTransaction({ id: 'Mint DUSD', status: 'pending' }));
        const collateralTokenContract = new ethers.Contract(contractDetails.address, contractDetails.abi, signer);
        const allowance = await collateralTokenContract.allowance(user, CONTROLLER_ADDR);

        if (allowance.lt(collateralAmountInWei)) {
          const tx = await collateralTokenContract.approve(CONTROLLER_ADDR, collateralAmountInWei);
          await tx.wait();
        }

        await delay(5000);

        dispatch(updateTransactionStatus({ id: 'Approve Controller', status: 'completed' }));

        tx = await controllerContract.mint(
          collateralTokenContract.address,
          user,
          collateralAmountInWei,
          dUSDCAmountInWei.mul(1 - slippage / 100),
          0 /* TODO: specify deadline */
        );

      }
      await tx.wait();
      await delay(2000);
      dispatch(updateTransactionStatus({ id: 'Mint DUSD', status: 'completed' }));
      dispatch(deleteTransaction('Approve Controller'));
      await delay(2000);
      dispatch(deleteTransaction('Mint DUSD'));
      
      console.log('Minting successful');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Minting failed', err.message);
        setError(err);
      }
    }
  }, [getSigner, getContractDetails, getSelectedToken, getCollateralAmount, getMinDUSDAmount]);

  return { mint, error };
};
