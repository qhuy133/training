import { createAction } from '@reduxjs/toolkit';
import { ErrorReporter } from './reducer';

export interface SerializableTransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  status?: number;
  errorCodes?: any[];
  failure: any[];
}

export const addTransaction = createAction<{
  chainId: number;
  from: string;
  hash: string;
  approval?: { token: string; spender: string };
  redemption?: { poolAddress?: string | undefined };
  summary?: string;
  errorReporter?: ErrorReporter;
  popupId?: string;
}>('transactions/addTransaction');

export const clearAllTransactions = createAction<{ chainId: number; account: string }>(
  'transactions/clearAllTransactions',
);

export const finalizeTransaction = createAction<{
  chainId: number;
  hash: string;
  receipt: SerializableTransactionReceipt;
}>('transactions/finalizeTransaction');

export const checkedTransaction = createAction<{
  chainId: number;
  hash: string;
  blockNumber: number;
}>('transactions/checkedTransaction');
