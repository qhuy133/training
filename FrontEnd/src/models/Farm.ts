import { BigNumber } from '@ethersproject/bignumber';

export type Market =
  | 'Firebird'
  | 'SushiSwap'
  | 'QuickSwap'
  | 'Dfyn'
  | 'PolyQuity'
  | 'xDollar'
  | '1Swap'
  | 'SolarBeam';

export type FarmConfig = {
  minichef: string;
  pools: FarmPoolConfig[];
};

export type FarmPoolConfig = {
  id?: number;
  address?: string;
  wantTokens: string[];
  wantSymbol: string;
  rewardToken: string;
  isLp: boolean;
  market: Market;
  minichef?: string;
  farmUrl?: string;
  coming?: boolean;
  inactive?: boolean;
  startRewardTime?: number;
  rewardPerDay?: number | string;
  name?: string;
};

export type FarmInfo = {
  totalAllocPoint?: BigNumber;
  allocPoint?: BigNumber;
  rewardPerSecond?: BigNumber;
  accRewardPerShare?: BigNumber;
  lastRewardTime?: BigNumber;
  totalStaked?: BigNumber;
  startTime?: number;
};

export type UserFarmInfo = {
  amount?: BigNumber;
  rewardDebt?: BigNumber;
  pendingReward?: BigNumber;
};

export type FarmingPoolInfo = {
  poolInfo?: FarmInfo;
  poolConfig?: FarmPoolConfig;
  userInfo?: UserFarmInfo;
  partnerPoolInfo?: PartnerFarmInfo;
};

export type PartnerFarmInfo = {
  tvl?: string;
  apr?: string;
  apy?: string;
  rewardPerDay?: string;
};
