import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { getNativeTokenSymbol } from '../config';

export const useNativeToken = () => {
  const { chainId } = useWeb3React();
  return useMemo(() => {
    return {
      symbol: getNativeTokenSymbol(chainId),
      decimals: 18,
    };
  }, [chainId]);
};
