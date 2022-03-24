import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { getAllPartnerFarmsConfig } from '../../../config';

export const usePartnerFarmConfig = () => {
  const { chainId } = useWeb3React();

  return useMemo(() => {
    return getAllPartnerFarmsConfig(chainId) || [];
  }, [chainId]);
};
