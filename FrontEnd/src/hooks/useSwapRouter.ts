import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { getSwapRouterAddress } from '../config';
import { useGetContract } from '../providers/ContractProvider';
import { abi as SwapRouter } from '../abis/SwapRouter.json';

export const useSwapRouter = () => {
  const { chainId } = useWeb3React();
  const getContract = useGetContract();

  return useMemo(() => {
    if (!chainId) {
      return null;
    }
    const address = getSwapRouterAddress(chainId);
    return getContract(SwapRouter, address);
  }, [chainId, getContract]);
};
