import { BigNumberish } from '@ethersproject/bignumber';
import { createReducer } from '@reduxjs/toolkit';
import zipObject from 'lodash/zipObject';
import {
  allowanceChanged,
  balanceChanged,
  connectToAccount,
  disconnectAccount,
  multipleTokenBalanceFetched,
  multipleTokenAllowancesFetched,
  watchToken,
  unwatchToken,
} from './actions';

export type ConnectorName = 'network' | 'injected';

type State = {
  address: string;
  connector: ConnectorName;
  balances: Record<string, BigNumberish>;
  allowances: Record<string, Record<string, BigNumberish>>;
  observedTokens: Record<string, number>;
};

export const initialState = {
  address: undefined,
  observedTokens: {},
  balances: {},
  allowances: {},
} as State;

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(connectToAccount, (_, { payload }) => {
    return {
      ...initialState,
      address: payload.account,
      connector: payload.connector,
    };
  });

  builder.addCase(disconnectAccount, () => {
    return initialState;
  });

  builder.addCase(balanceChanged, (state, { payload }) => {
    state.balances[payload.token] = payload.amount;
  });

  builder.addCase(allowanceChanged, (state, { payload }) => {
    state.allowances[payload.token] = {
      ...(state.allowances[payload.token] || {}),
      [payload.spender]: payload.amount,
    };
  });

  builder.addCase(multipleTokenBalanceFetched, (state, { payload }) => {
    state.balances = Object.assign({}, state.balances, payload);
  });

  builder.addCase(multipleTokenAllowancesFetched, (state, { payload }) => {
    payload.symbols.forEach((t, idx) => {
      if (!state.allowances[t]) {
        state.allowances[t] = {};
      }
      state.allowances[t][payload.spender] = payload.allowances[idx];
    });
  });

  builder.addCase(watchToken, (state, { payload }) => {
    const updated = zipObject(
      payload,
      payload.map((t) =>
        !state.observedTokens[t] || state.observedTokens[t] < 0
          ? 1
          : state.observedTokens[t] + 1,
      ),
    );

    state.observedTokens = {
      ...state.observedTokens,
      ...updated,
    };
  });

  builder.addCase(unwatchToken, (state, { payload }) => {
    const updated = zipObject(
      payload,
      payload.map((t) => (state.observedTokens[t] ? state.observedTokens[t] - 1 : 0)),
    );

    state.observedTokens = {
      ...state.observedTokens,
      ...updated,
    };
  });
});

export default reducer;
