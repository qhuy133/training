/* eslint-disable @typescript-eslint/no-explicit-any */
/** Contract cache */

import { JsonRpcProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { SafeCallContract } from './SafeCallContract';

type GetContract = (abi: any, address: string, type?: string) => SafeCallContract;

const Context = createContext<GetContract>(null);

export const ContractProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { chainId, library, account } = useWeb3React<JsonRpcProvider>();
  const map = useRef(new Map<string, SafeCallContract>());

  useEffect(() => {
    map.current.clear();
  }, [chainId]);

  const getContract = useCallback(
    (abi: any, address: string, type?: string) => {
      if (!address || !abi) {
        return;
      }

      const key = [type, address].join(':');
      const provider = account ? library.getSigner(account) : library;
      if (!map.current.has(key)) {
        const instance = new SafeCallContract(address, abi, library);
        map.current.set(key, instance);
      }

      return map.current.get(key).connect(provider) as SafeCallContract;
    },
    [account, library],
  );

  return <Context.Provider value={getContract}>{children}</Context.Provider>;
};

export const useGetContract = (): GetContract => {
  return useContext(Context);
};
