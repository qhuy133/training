import { BigNumber } from '@ethersproject/bignumber';
import { StakingVaultConfig } from '../config/type';

export enum VaultStatus {
  notStated,
  locked,
  finished,
}

export type StakingInfo = {
  maxCap?: BigNumber;
  rewardFund?: BigNumber;
  totalStaked?: BigNumber;
  rewardPerSecond?: BigNumber;
  totalReward?: BigNumber;
  estTotalReward?: BigNumber;
  startLockTime?: number;
  endLockTime?: number;
};

export type StakingUserInfo = {
  amount?: BigNumber;
  pendingReward?: BigNumber;
};

export type StakingVaultInfo = {
  vaultConfig?: StakingVaultConfig;
  vaultInfo?: StakingInfo;
  userInfo?: StakingUserInfo;
};
