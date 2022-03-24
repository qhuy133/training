import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { getMulticallAddress } from '../config';
import { Call, multicall } from './multicall';

export const useMulticall = () => {
  const { library, chainId } = useWeb3React();

  return useCallback(
    (calls: Call[]) => {
      const contractAddresses = getMulticallAddress(chainId);
      if (contractAddresses && contractAddresses) {
        return multicall(library, contractAddresses, calls);
      }

      return Promise.resolve(null);
    },
    [chainId, library],
  );
};
