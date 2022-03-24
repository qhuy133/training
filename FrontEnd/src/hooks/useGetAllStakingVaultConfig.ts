import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { getAllStakingVaultConfig } from '../config';

export const useGetAllStakingVaultConfig = () => {
  const { chainId } = useWeb3React();

  return useMemo(() => {
    return getAllStakingVaultConfig(chainId) || [];
  }, [chainId]);
};
