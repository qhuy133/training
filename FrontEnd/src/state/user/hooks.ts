import { MaxUint256 } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import { get, mapValues, pick } from 'lodash';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '..';
import { getTokenConfig } from '../../config';
import { useNativeToken } from '../../hooks/useNativeToken';
import { toBigNumber } from '../../utils/numbers';
import { disconnectAccount, watchToken } from './actions';

export const useSavedConnector = () => {
  return useSelector((s: AppState) => s.user.connector);
};

export const useTokenBalance = (token: string) => {
  const balance = useSelector((s: AppState) => s.user.balances && s.user.balances[token]);
  return useMemo(() => toBigNumber(balance), [balance]);
};

export const useTokenBalances = (tokens: string[]) => {
  const balances = useSelector((s: AppState) => s.user.balances);
  return mapValues(pick(balances, tokens), toBigNumber);
};

export const useAllowance = (token: string, spender: string) => {
  const allowance = useSelector((s: AppState) => get(s.user.allowances, [token, spender]));
  const nativeToken = useNativeToken();
  return useMemo(() => {
    if (token === nativeToken?.symbol) {
      return MaxUint256;
    } else {
      return toBigNumber(allowance) || undefined;
    }
  }, [allowance, nativeToken?.symbol, token]);
};

export const useDisconnectAccount = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(disconnectAccount());
  }, [dispatch]);
};

export const useWatchTokenBalance = () => {
  const dispatch = useDispatch();
  return useCallback(
    (tokens: string[]) => {
      dispatch(watchToken(tokens));
    },
    [dispatch],
  );
};

export const useUserToken = (symbol: string) => {
  const { chainId } = useWeb3React();
  const balance = useTokenBalance(symbol);

  return useMemo(() => {
    const config = getTokenConfig(chainId, symbol);

    return {
      symbol,
      ...config,
      balance,
    };
  }, [balance, chainId, symbol]);
};
