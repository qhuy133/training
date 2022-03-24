import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { getTokenAddress } from '../../../config';
import { Market } from '../../../models/Farm';

export const buyTokenLinks: { [key: string]: string } = {
  IS3USD: 'http://localhost:3000/pools/is3usd/deposit',
};

const useFarmExternalLink = () => {
  const { chainId } = useWeb3React();

  const createAddLiquidityLink = useCallback(
    (marketName: Market, token0: string, token1: string, lp: string) => {
      let poolId = '1s3p';
      switch (token0) {
        case 'BUSD':
          poolId = '1s3pbusd';
          break;
        case 'MIM':
          poolId = '1s3pmim';
          break;
        case 'FRAX':
          poolId = '1s3pfrax';
          break;
        case 'anyFRAX':
          poolId = '1s3panyfrax';
          break;
        case 'AVAXUSD':
          poolId = '1s3pavaxusd';
          break;
        case 'WANUSD':
          poolId = '1s3pwanusd';
          break;
        case 'MAI':
          poolId = '1s3pmai';
          break;
      }
      const token0Address = getTokenAddress(chainId, token0);
      const token1Address = getTokenAddress(chainId, token1);
      switch (marketName) {
        case 'SushiSwap':
          return `https://app.sushi.com/add/${token0Address}/${token1Address}`;
        case 'QuickSwap':
          return `https://quickswap.exchange/#/add/${token0Address}/${token1Address}`;
        case 'Firebird':
          return `https://app.firebird.finance/add/${lp}`;
        case 'Dfyn':
          return `https://exchange.dfyn.network/#/add/${token0Address}/${token1Address}`;
        case '1Swap':
          return `/pools/${poolId}/deposit`;
        case 'SolarBeam':
          return `https://app.solarbeam.io/exchange/add/${token0Address}/ETH`;
      }
    },
    [chainId],
  );

  const createRemoveLiquidityLink = useCallback(
    (marketName: Market, token0: string, token1: string, lp: string) => {
      let poolId = '1s3p';
      switch (token0) {
        case 'BUSD':
          poolId = '1s3pbusd';
          break;
        case 'MIM':
          poolId = '1s3pmim';
          break;
        case 'FRAX':
          poolId = '1s3pfrax';
          break;
        case 'anyFRAX':
          poolId = '1s3panyfrax';
          break;
        case 'AVAXUSD':
          poolId = '1s3pavaxusd';
          break;
        case 'WANUSD':
          poolId = '1s3pwanusd';
          break;
        case 'MAI':
          poolId = '1s3pmai';
          break;
      }
      const token0Address = getTokenAddress(chainId, token0);
      const token1Address = getTokenAddress(chainId, token1);
      switch (marketName) {
        case 'SushiSwap':
          return `https://app.sushi.com/remove/${token0Address}/${token1Address}`;
        case 'QuickSwap':
          return `https://quickswap.exchange/#/remove/${token0Address}/${token1Address}`;
        case 'Firebird':
          return `https://app.firebird.finance/remove/${lp}`;
        case 'Dfyn':
          return `https://exchange.dfyn.network/#/remove/${token0Address}/${token1Address}`;
        case '1Swap':
          return `/pools/${poolId}/withdraw`;
        case 'SolarBeam':
          return `https://app.solarbeam.io/exchange/remove/${token0Address}/ETH`;
      }
    },
    [chainId],
  );

  const getBuyTokenUrl = useCallback((token: string) => {
    return buyTokenLinks[token];
  }, []);

  return {
    getBuyTokenUrl,
    createAddLiquidityLink,
    createRemoveLiquidityLink,
  };
};

export default useFarmExternalLink;
