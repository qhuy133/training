import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { getAllFarmsConfig } from '../../../config';

export const useFarmConfig = () => {
  const { chainId } = useWeb3React();

  return useMemo(() => {
    return getAllFarmsConfig(chainId) || [];
  }, [chainId]);
};
