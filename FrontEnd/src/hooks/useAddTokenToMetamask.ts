import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { getTokenConfig } from '../config';

export const useAddTokenMetamask = () => {
  const { chainId } = useWeb3React();

  const addToken = async (
    address: string,
    symbol: string,
    decimals: number,
    image?: string,
  ) => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: address,
          symbol: symbol,
          decimals: decimals,
          image: image,
        },
      },
    });
  };

  return useCallback(
    async (symbol: string) => {
      const token = getTokenConfig(chainId, symbol);
      await addToken(token.address, token?.name || symbol, token.decimals, token.logo);
    },
    [chainId],
  );
};
