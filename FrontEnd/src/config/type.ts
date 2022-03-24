import { FarmConfig, FarmPoolConfig } from '../models/Farm';
import { ChainId } from '../utils/constants';

export type PoolConfig = {
  name?: string;
  address: string;
  assets: Array<string>;
  lpToken: string;
  basePool?: string;
  isPartner?: boolean;
  basePoolIndex?: number;
};

export type StakingVaultConfig = {
  address: string;
  wantSymbol: string;
  rewardSymbol: string;
  inActive?: boolean;
};

export type ChainConfig = {
  providerUrl: string;
  explorerUrl: string;
  defaultSwapToken?: {
    fromTokenSymbol?: string;
    toTokenSymbol?: string;
  };
  backendUrl?: string;
  multicall?: string;
  nativeToken: string;
  swapRouter?: string;
  pools: Record<string, PoolConfig>;
  farms?: FarmConfig[];
  partnerFarms?: FarmPoolConfig[];
  partnerStableCoinSymbols?: string[];
  chainStableCoinSymbols?: string[][];
  stakingVaults?: StakingVaultConfig[];
  tokens: {
    [symbol: string]: {
      address: string;
      name?: string;
      decimals: number;
      logo?: string;
    };
  };
  initObserveTokens?: string[];
};

export type Configuration = {
  chainConfig: Partial<Record<ChainId, ChainConfig>>;
  defaultChainId: ChainId;
};
