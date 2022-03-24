import { createSelector } from '@reduxjs/toolkit';
import { mapValues } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '..';
import { FarmInfo, UserFarmInfo } from '../../models/Farm';
import { toBigNumber } from '../../utils/numbers';
import { FarmInfoState, UserFarmInfoState } from './reducer';

const deserializeFarmInfo = (state: FarmInfoState): FarmInfo => {
  return {
    totalAllocPoint: toBigNumber(state?.totalAllocPoint),
    allocPoint: toBigNumber(state?.allocPoint),
    rewardPerSecond: toBigNumber(state?.rewardPerSecond),
    accRewardPerShare: toBigNumber(state?.accRewardPerShare),
    lastRewardTime: toBigNumber(state?.lastRewardTime),
    totalStaked: toBigNumber(state?.totalStaked),
  };
};

const deserializerUserInfo = (state: UserFarmInfoState): UserFarmInfo => {
  if (state) {
    return mapValues(state, toBigNumber);
  }
};

export const useFarmingPoolConfigs = () => {
  return useSelector((s: AppState) => s.farms.poolConfigs);
};

export const useFarmingPoolInfos = () => {
  return useSelector((s: AppState) => s.farms.poolInfos);
};

export const useFarmingUserInfos = () => {
  return useSelector((s: AppState) => s.farms.userInfos);
};

const selectFarmingPools = createSelector(
  [
    (s: AppState) => s.farms.poolConfigs,
    (s: AppState) => s.farms.poolInfos,
    (s: AppState) => s.farms.userInfos,
    (s: AppState) => s.farms.partnerPoolConfigs,
    (s: AppState) => s.farms.partnerPoolInfos,
  ],
  (poolConfigs, poolInfos, useInfos, partnerPoolConfigs, partnerPoolInfos) => {
    return poolConfigs
      .map((p, index) => {
        return {
          poolConfig: p,
          poolInfo: deserializeFarmInfo(poolInfos[index]) || {},
          userInfo: deserializerUserInfo(useInfos[index]) || {},
          partnerPoolInfo: {},
        };
      })
      .concat(
        (partnerPoolConfigs || []).map((p, index) => {
          return {
            poolConfig: p,
            poolInfo: {},
            userInfo: {},
            partnerPoolInfo: partnerPoolInfos[index],
          };
        }),
      );
  },
);

export const useFarmingPools = () => {
  return useSelector(selectFarmingPools);
};

export const useFarmingPool = (minichef: string, id: number) => {
  const poolConfigs = useSelector((s: AppState) => s.farms.poolConfigs);
  const poolInfos = useSelector((s: AppState) => s.farms.poolInfos);
  const userInfos = useSelector((s: AppState) => s.farms.userInfos);

  return useMemo(() => {
    const index = poolConfigs.findIndex((p) => p?.minichef === minichef && p?.id === id);
    if (index !== -1) {
      return {
        poolInfo: deserializeFarmInfo(poolInfos[index]),
        poolConfig: poolConfigs[index],
        userInfo: deserializerUserInfo(userInfos[index]),
      };
    }
  }, [id, minichef, poolConfigs, poolInfos, userInfos]);
};

export const useFarmingPoolConfig = (minichef: string, id: number) => {
  const poolConfigs = useSelector((s: AppState) => s.farms.poolConfigs);
  return useMemo(
    () => poolConfigs.find((p) => p?.minichef === minichef && p?.id === id),
    [id, minichef, poolConfigs],
  );
};

const selectPendingRewardFarmCount = createSelector(
  [(s: AppState) => s.farms.userInfos],
  (info) => {
    return info?.filter((t) => toBigNumber(t.pendingReward).gt(0)).length;
  },
);

export const usePendingRewardFarmCount = () => useSelector(selectPendingRewardFarmCount);
