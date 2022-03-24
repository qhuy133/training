import { MaxUint256, Zero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTokenAddress } from '../config';
import { useIsApprovalPending } from '../state/transactions/hooks';
import { allowanceChanged } from '../state/user/actions';
import { useAllowance } from '../state/user/hooks';
import { useErc20 } from './useErc20';
import { useHandleTransactionReceipt } from './useHandleTransactionReceipt';

export const useApprove = (symbol: string, spender: string) => {
  const { chainId, account } = useWeb3React();
  const dispatch = useDispatch();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const allowance = useAllowance(symbol, spender);
  const [approveSubmitted, setApproveSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const tokenAddress = useMemo(() => {
    return getTokenAddress(chainId, symbol);
  }, [chainId, symbol]);
  const isPending = useIsApprovalPending(tokenAddress, spender);

  const tokenContract = useErc20(tokenAddress);

  const isApproved = useMemo(() => {
    return allowance?.gt(Zero);
  }, [allowance]);

  const loading = useMemo(() => {
    return !allowance;
  }, [allowance]);

  const approve = useCallback(async () => {
    if (!tokenContract) {
      return;
    }
    const summary = `Approve ${symbol}`;
    setLoadingSubmit(true);
    setApproveSubmitted(true);
    try {
      const tx = await handleTransactionReceipt(
        summary,
        () => tokenContract.approve(spender, MaxUint256),
        {
          approval: {
            token: tokenContract.address,
            spender,
          },
        },
      );
      if (tx) {
        await tx.wait();
        dispatch(
          allowanceChanged({
            token: symbol,
            spender,
            amount: MaxUint256.toHexString(),
          }),
        );
        setLoadingSubmit(false);
      }
    } catch (error) {
      setApproveSubmitted(false);
      setLoadingSubmit(false);
    }
  }, [symbol, handleTransactionReceipt, tokenContract, spender, dispatch]);

  useEffect(() => {
    if (!tokenContract || !account || !spender) {
      return;
    }
    tokenContract?.allowance(account, spender).then((amount) => {
      dispatch(
        allowanceChanged({
          token: symbol,
          spender,
          amount: amount.toHexString(),
        }),
      );
    });
  }, [account, dispatch, spender, symbol, tokenContract]);

  return {
    approve,
    loading,
    loadingSubmit: isPending || loadingSubmit,
    isApproved,
    approveSubmitted,
  };
};
