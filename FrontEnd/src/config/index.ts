import { ChainId } from '../utils/constants';
import { Configuration, PoolConfig, StakingVaultConfig } from './type';
import polygon from './polygon';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import { FarmPoolConfig } from '../models/Farm';
import flatten from 'lodash/flatten';
import { isPast } from '../utils/times';

export const config: Configuration = {
  chainConfig: {
    [ChainId.polygon]: polygon,
  },
  defaultChainId: ChainId.polygon,
};

export const supportedChainIds = Object.keys(config.chainConfig).map((t) => +t);

export const networkUrls = mapValues(config.chainConfig, (t) => t.providerUrl);

export const getTokenConfig = (chainId: ChainId, tokenSymbol: string) => {
  if (!tokenSymbol) {
    return undefined;
  }
  const tokenConfig = get(config.chainConfig, [chainId, 'tokens', tokenSymbol]) as {
    decimals: number;
    address: string;
    logo?: string;
    name?: string;
  };

  return { ...(tokenConfig || {}), symbol: tokenSymbol };
};

export const getTokenAddress = (chainId: ChainId, tokenSymbol: string) => {
  return get(config.chainConfig, [chainId, 'tokens', tokenSymbol, 'address']);
};

export const getPoolConfig = (chainId: ChainId, poolId: string) => {
  return get(config.chainConfig, [chainId, 'pools', poolId], null) as PoolConfig;
};

export const getAllPoolConfig = (chainId: ChainId) => {
  return get(config.chainConfig, [chainId, 'pools']) as Record<string, PoolConfig>;
};

export const getAllFarmsConfig = (chainId: ChainId) => {
  const farms = get(config.chainConfig, [chainId, 'farms'], null);
  return flatten(
    farms?.map((t) => {
      return t?.pools
        ?.filter((p) => !p.startDate || isPast(p.startDate))
        .map((p) => {
          return {
            ...p,
            minichef: t?.minichef,
          };
        });
    }),
  ) as FarmPoolConfig[];
};

export const getAllPartnerFarmsConfig = (chainId: ChainId) => {
  return get(config.chainConfig, [chainId, 'partnerFarms']) as FarmPoolConfig[];
};

export const getMulticallAddress = (chainId: ChainId) => {
  return get(config.chainConfig, [chainId, 'multicall']);
};

export const getSwapRouterAddress = (chainId: ChainId) => {
  return get(config.chainConfig, [chainId, 'swapRouter']);
};

export const getExplorerUrl = (chainId: ChainId) => {
  return get(config.chainConfig, [chainId, 'explorerUrl']);
};

export const getGovernanceConfig = (chainId: ChainId) => {
  return get(config.chainConfig, [chainId, 'governance']);
};

/**
 * get enriched pool config with all tokens config available in place
 */
export const getPoolInit = (chainId: ChainId, poolId: string) => {
  const poolConfig = getPoolConfig(chainId, poolId);
  const lpToken = getTokenConfig(chainId, poolConfig.lpToken);
  const poolInit = {
    poolAddress: poolConfig.address,
    assets: poolConfig.assets,
    lpDecimals: lpToken.decimals,
    lpToken: poolConfig.lpToken,
    basePool: null,
  };

  if (poolConfig.basePool) {
    const basePool = getPoolConfig(chainId, poolConfig.basePool);
    poolInit.basePool = {
      address: basePool.address,
      assets: basePool.assets,
      lpToken: basePool.lpToken,
    };
  }

  return poolInit;
};

export const getNativeTokenSymbol = (chainId: number) => {
  return get(config.chainConfig, [chainId, 'nativeToken']);
};

export const getPartnerStableCoinSymbols = (chainId: number) => {
  return get(config.chainConfig, [chainId, 'partnerStableCoinSymbols']) || ([] as string[]);
};

export const getChainStableCoinSymbols = (chainId: number) => {
  return get(config.chainConfig, [chainId, 'chainStableCoinSymbols']) || ([] as string[][]);
};

export const getStableCoinTokenSymbol = (chainId: ChainId) => {
  return get(config.chainConfig, [chainId, 'stableCoinTokenSymbol']);
};

export const getDefaultSwapTokenSymbol = (chainId: ChainId) => {
  return get(config.chainConfig, [chainId, 'defaultSwapToken']);
};

export const getInitObserveTokens = (chainId: ChainId) => {
  return get(config.chainConfig, [chainId, 'initObserveTokens'], []);
};

export const getAllStakingVaultConfig = (chainId: number) => {
  return get(config.chainConfig, [chainId, 'stakingVaults']) as StakingVaultConfig[];
};
