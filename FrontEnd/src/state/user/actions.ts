import { BigNumberish } from '@ethersproject/bignumber';
import { createAction } from '@reduxjs/toolkit';
import { zipObject } from 'lodash';
import { ConnectorName } from './reducer';

export const connectToAccount =
  createAction<{ account: string; connector: ConnectorName }>('user/connect');

export const disconnectAccount = createAction('user/disconnect');

export const watchToken = createAction('user/watchToken', (tokens: string[]) => ({
  payload: tokens.filter((t) => !!t),
}));

export const unwatchToken = createAction('user/unwatchToken', (tokens: string[]) => ({
  payload: tokens.filter((t) => !!t),
}));

export const balanceChanged =
  createAction<{ token: string; amount: BigNumberish }>('user/balanceChanged');

export const allowanceChanged =
  createAction<{ token: string; spender: string; amount: BigNumberish }>(
    'user/approve/success',
  );

export const multipleTokenBalanceFetched = createAction(
  'user/multipleTokenBalanceFetched',
  (symbols: string[], balances: BigNumberish[]) => {
    return {
      payload: zipObject(symbols, balances),
    };
  },
);

export const multipleTokenAllowancesFetched = createAction(
  'user/multipleTokenAllowancesFetched',
  (spender: string, symbols: string[], allowances: BigNumberish[]) => {
    return {
      payload: {
        symbols,
        allowances,
        spender,
      },
    };
  },
);
