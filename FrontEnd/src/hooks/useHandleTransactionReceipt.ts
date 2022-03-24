import { TransactionResponse } from '@ethersproject/providers';
import { nanoid } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useAddPopup } from '../state/application/hooks';
import { TransactionCustomData, useTransactionAdder } from '../state/transactions/hooks';
import { getErrorMessage } from '../utils/transactionError';

type TransactionCreator = () => Promise<TransactionResponse>;

export const useHandleTransactionReceipt = () => {
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  return useCallback(
    async (
      summary: string,
      func: TransactionCreator,
      customData?: Omit<TransactionCustomData, 'summary' | 'popupId'>,
    ) => {
      const popupId = nanoid();

      addPopup(
        {
          type: 'waiting',
          title: 'Waiting for confirmation',
          message: summary,
        },
        popupId,
      );

      try {
        const tx = await func();
        addTransaction(tx, {
          summary,
          popupId,
          ...(customData || {}),
        });
        addPopup(
          {
            type: 'transaction',
            hash: tx.hash,
          },
          popupId,
          true,
        );
        return tx;
      } catch (e) {
        addPopup(
          {
            type: 'error',
            title: 'Transaction not submited',
            message: getErrorMessage(e),
          },
          popupId,
        );

        throw e;
      }
    },
    [addPopup, addTransaction],
  );
};
