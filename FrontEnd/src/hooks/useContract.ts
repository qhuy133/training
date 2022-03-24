import { useMemo } from 'react';
import { useGetContract } from '../providers/ContractProvider';

export const useContract = (abi: string | any[], address: string, type?: string) => {
  const getContract = useGetContract();

  return useMemo(() => {
    if (getContract && address) {
      return getContract(abi, address, type);
    }
  }, [abi, address, getContract, type]);
};
