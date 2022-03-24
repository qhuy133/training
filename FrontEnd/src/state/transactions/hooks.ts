import { TransactionResponse } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../index';
import { addTransaction, clearAllTransactions } from './actions';
import { ErrorReporter, TransactionDetails } from './reducer';

export type TransactionCustomData = {
  summary?: string;
  popupId?: string;
  errorReporter?: ErrorReporter;
  approval?: {
    token: string;
    spender: string;
  };
};

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: TransactionCustomData,
) => void {
  const { chainId, account } = useWeb3React();
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    (response: TransactionResponse, { summary, ...rest }: TransactionCustomData = {}) => {
      // if (!account) return;
      if (!chainId) return;

      const { hash } = response;
      if (!hash) {
        throw Error('No transaction hash found.');
      }
      dispatch(addTransaction({ hash, from: account, chainId, summary, ...rest }));
    },
    [dispatch, chainId, account],
  );
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useWeb3React();
  const state = useSelector<AppState, AppState['transactions']>((state) => state.transactions);

  return chainId ? state[chainId] ?? {} : {};
}

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllTransactions();
  if (!transactionHash || !transactions[transactionHash]) {
    return false;
  }
  return !transactions[transactionHash].receipt;
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return Date.now() - tx.addedTime < 86_400_000;
}

export function useClearAllTransactions() {
  const { chainId, account } = useWeb3React();
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    () => dispatch(clearAllTransactions({ chainId, account })),
    [account, chainId, dispatch],
  );
}

export const usePendingTransactionCount = () => {
  const allTransactions = useAllTransactions();
  return useMemo(() => {
    return Object.values(allTransactions).filter((tx) => !tx.receipt).length;
  }, [allTransactions]);
};

export const useGetTransaction = (hash: string) => {
  const { chainId } = useWeb3React();
  return useSelector((t: AppState) => (chainId ? t.transactions[chainId]?.[hash] : undefined));
};

export const useIsApprovalPending = (token: string, spender: string) => {
  const allTransactions = useAllTransactions();
  return useMemo(() => {
    return Object.values(allTransactions).some(
      (t) =>
        t.approval &&
        t.approval.token === token &&
        t.approval.spender === spender &&
        !t.receipt,
    );
  }, [allTransactions, spender, token]);
};
