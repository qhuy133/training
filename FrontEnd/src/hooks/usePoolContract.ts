import { useContract } from './useContract';
import { abi as SwapAbi } from '../abis/Swap.json';
import { useCallback } from 'react';
import { useGetContract } from '../providers/ContractProvider';

export const usePoolContract = (poolAddress: string) => {
  return useContract(SwapAbi, poolAddress);
};

export const useGetPoolContract = () => {
  const getContract = useGetContract();
  return useCallback((poolAddress: string) => getContract(SwapAbi, poolAddress), [getContract]);
};
