import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { getTokenConfig } from '../config';
import { useNativeToken } from './useNativeToken';

export const useToken = (symbol: string) => {
  const { chainId } = useWeb3React();
  const nativeToken = useNativeToken();
  return useMemo(() => {
    if (!chainId) {
      return;
    }
    if (symbol === nativeToken?.symbol) {
      return {
        symbol,
        decimals: 18,
        name: nativeToken.symbol,
      };
    } else {
      const tokenConfig = getTokenConfig(chainId, symbol);
      return {
        symbol,
        address: tokenConfig?.address,
        decimals: tokenConfig?.decimals,
        name: tokenConfig?.name || symbol,
      };
    }
  }, [chainId, nativeToken?.symbol, symbol]);
};
