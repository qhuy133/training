/* eslint-disable @typescript-eslint/ban-types */
import { JsonRpcProvider, TransactionReceipt } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddPopup, useBlockNumber, useUpdateAppData } from '../application/hooks';
import { AppDispatch, AppState } from '../index';
import { checkedTransaction, finalizeTransaction } from './actions';
import { useMemo } from 'react';
import { ErrorReporter } from './reducer';
import { parseComptrollerError } from '../../libs/ComptrollerErrorReporter';
import { parseTokenError } from '../../libs/TokenErrorReporter';
import { Interface } from '@ethersproject/abi';

const reportErrorMessage = (errorReporter: ErrorReporter, failure: number[]) => {
  if (errorReporter == 'comptroller') {
    return parseComptrollerError(failure[0], failure[1]);
  }

  return parseTokenError(failure[0], failure[1]);
};

const errorIface = new Interface(['event Failure(uint256, uint256, uint256)']);
const errorTopic = errorIface.getEventTopic('Failure');

const getFailure = (t: TransactionReceipt) => {
  return t.logs
    .filter((x) => x.topics.some((t) => t === errorTopic))
    .map((t) => errorIface.parseLog(t).args.map((x) => x.toNumber()))[0];
};

export function shouldCheck(
  lastBlockNumber: number,
  tx: { addedTime: number; receipt?: {}; lastCheckedBlockNumber?: number },
): boolean {
  if (tx.receipt) {
    return false;
  }
  if (!tx.lastCheckedBlockNumber) {
    return true;
  }
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) {
    return false;
  }
  const minutesPending = (Date.now() - tx.addedTime) / 1000 / 60;
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9;
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2;
  } else {
    // otherwise every block
    return true;
  }
}

export default function Updater(): null {
  const lastBlockNumber = useBlockNumber();
  const updateAppData = useUpdateAppData();
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector<AppState>((state) => state.transactions);
  const { library: provider, chainId } = useWeb3React<JsonRpcProvider>();
  const transactions = useMemo(() => {
    return chainId ? state[chainId] ?? {} : {};
  }, [chainId, state]);

  const addPopup = useAddPopup();

  useEffect(() => {
    if (!chainId || !lastBlockNumber) {
      return;
    }

    Object.keys(transactions)
      .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
      .forEach((hash) => {
        provider
          ?.getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              const failure = getFailure(receipt);
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: !failure ? receipt.status : 0,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                    failure,
                  },
                }),
              );
              if (failure) {
                addPopup(
                  {
                    type: 'error',
                    title: transactions[hash]?.summary,
                    message: reportErrorMessage(transactions[hash]?.errorReporter, failure)
                      ?.info,
                  },
                  transactions[hash]?.popupId,
                );
              } else {
                updateAppData();
                addPopup(
                  {
                    type: 'transaction',
                    hash,
                  },
                  transactions[hash]?.popupId,
                );
              }
            } else {
              dispatch(
                checkedTransaction({
                  chainId,
                  hash,
                  blockNumber: lastBlockNumber,
                }),
              );
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error);
          });
      });
  }, [chainId, transactions, lastBlockNumber, dispatch, addPopup, provider, updateAppData]);

  return null;
}
