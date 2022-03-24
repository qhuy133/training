import { useContract } from './useContract';
import { abi as ERC20Abi } from '../abis/IERC20.json';
import { useGetContract } from '../providers/ContractProvider';
import { useCallback } from 'react';

export const useErc20 = (address: string) => {
  return useContract(ERC20Abi, address, 'ERC20');
};

export const useGetErc20 = () => {
  const getContract = useGetContract();
  return useCallback(
    (address: string) => getContract(ERC20Abi, address, 'ERC20'),
    [getContract],
  );
};
