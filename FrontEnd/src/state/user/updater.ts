import { createSelector } from '@reduxjs/toolkit';
import { useWeb3React } from '@web3-react/core';
import { sortBy } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '..';
import { getTokenConfig } from '../../config';
import useDebounce from '../../hooks/useDebounce';
import { useMulticall } from '../../hooks/useMulticall';
import { useNativeToken } from '../../hooks/useNativeToken';
import { useLastUpdated } from '../application/hooks';
import { balanceChanged, multipleTokenBalanceFetched } from './actions';

const selectObservedTokens = createSelector(
  [(s: AppState) => s.user.observedTokens],
  (tokens) => {
    return Object.entries(tokens)
      .filter(([, count]) => count > 0)
      .map((t) => t[0]);
  },
);

export default function Updater(): any {
  const { account, chainId, library } = useWeb3React();
  const multicall = useMulticall();
  const dispatch = useDispatch();
  const symbols = useSelector(selectObservedTokens);
  const lastUpdated = useLastUpdated();
  const nativeToken = useNativeToken();
  useEffect(() => {
    if (!nativeToken?.symbol || !chainId) {
      return;
    }
    if (!account) {
      dispatch(
        balanceChanged({
          token: nativeToken?.symbol,
          amount: undefined,
        }),
      );
      return;
    }
    let mounted = true;
    library
      .getSigner(account)
      .getBalance()
      .then((res) => {
        if (mounted) {
          dispatch(
            balanceChanged({
              token: nativeToken?.symbol,
              amount: res,
            }),
          );
        }
      });

    return () => {
      mounted = false;
    };
  }, [account, dispatch, library, lastUpdated, nativeToken, chainId]);
  // to check if the list is realy changed
  const watchedTokenHashed = useMemo(() => {
    return sortBy(symbols).join(':');
  }, [symbols]);

  const watchedTokenHashedDebouced = useDebounce(watchedTokenHashed, 500);

  useEffect(() => {
    const tokens = watchedTokenHashedDebouced
      ? watchedTokenHashedDebouced
          .split(':')
          .map((t) => {
            const tokenConfig = getTokenConfig(chainId, t);
            return {
              symbol: t,
              address: tokenConfig?.address,
            };
          })
          .filter((t) => !!t.address) // some external tokens
      : [];

    if (!account || !tokens || !tokens.length) {
      return;
    }

    const mounted = true;
    multicall(
      tokens.map((t) => {
        return {
          target: t.address,
          signature: 'balanceOf(address user) view returns (uint256)',
          params: [account],
        };
      }),
    ).then((response) => {
      if (mounted && response) {
        const balances = response.map((t) => t[0].toHexString());
        dispatch(
          multipleTokenBalanceFetched(
            tokens.map((t) => t.symbol),
            balances,
          ),
        );
      }
    });
  }, [account, dispatch, multicall, lastUpdated, watchedTokenHashedDebouced, chainId]);

  return null;
}
