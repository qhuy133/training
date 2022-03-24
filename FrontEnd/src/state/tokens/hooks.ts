import { BigNumber } from '@ethersproject/bignumber';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '..';
import { startObserveTokens } from './actions';

export const useStartObserveTokens = () => {
  const dispatch = useDispatch();

  return useCallback(
    (tokens: string[]) => {
      dispatch(startObserveTokens(tokens));
    },
    [dispatch],
  );
};

export const useTokenPrice = (token: string) => {
  const price = useSelector<AppState, string>((s) => s.tokens.priceInUsd[token?.toUpperCase()]);

  return useMemo(() => {
    return price ? BigNumber.from(price) : null;
  }, [price]);
};

export const useTokens = () => {
  return useSelector<AppState, any>((s) => s.tokens);
};
