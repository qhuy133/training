import { createAction } from '@reduxjs/toolkit';

export const startObserveTokens = createAction('tokens/observe', (tokens: string[]) => ({
  payload: tokens.filter((t) => !!t).map((t) => t.toUpperCase()),
}));

export const fetchMultiplePrice = createAction<Record<string, string>>(
  'tokens/fetchMultiplePrice',
);
