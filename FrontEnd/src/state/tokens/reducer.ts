import { createReducer } from '@reduxjs/toolkit';
import { fetchMultiplePrice, startObserveTokens } from './actions';
import union from 'lodash/union';

type State = {
  observedTokens: string[];
  priceInUsd: Record<string, string>;
};

export const initialState: State = {
  observedTokens: [],
  priceInUsd: {},
};

export default createReducer(initialState, (builder) => {
  builder.addCase(startObserveTokens, (state, { payload }) => {
    state.observedTokens = union(state.observedTokens, payload);
  });

  builder.addCase(fetchMultiplePrice, (state, { payload }) => {
    state.priceInUsd = {
      ...state.priceInUsd,
      ...payload,
    };
  });
});
