import { BigNumberish } from '@ethersproject/bignumber';
import { createReducer } from '@reduxjs/toolkit';
import { FarmPoolConfig, PartnerFarmInfo } from '../../models/Farm';
import {
  initialLoadFarmingPoolsSuccess,
  initialLoadFarmingPoolsError,
  multipleUserFarmInfoFetched,
  multipleFarmInfoFetched,
  multiplePartnerFarmInfoFetched,
  loadPartnerPoolSuccess,
} from './actions';

export type FarmInfoState = {
  totalAllocPoint: BigNumberish;
  allocPoint: BigNumberish;
  rewardPerSecond: BigNumberish;
  accRewardPerShare: BigNumberish;
  lastRewardTime: BigNumberish;
  totalStaked: BigNumberish;
};

export type UserFarmInfoState = {
  amount?: BigNumberish;
  rewardDebt?: BigNumberish;
  pendingReward?: BigNumberish;
};

type State = {
  loading: boolean;
  loadError?: string;
  poolConfigs: FarmPoolConfig[];
  poolInfos: FarmInfoState[];
  userInfos: UserFarmInfoState[];
  partnerPoolConfigs: FarmPoolConfig[];
  partnerPoolInfos: PartnerFarmInfo[];
};

export const initialState = {
  poolConfigs: [],
  poolInfos: [],
  userInfos: [],
  partnerPoolConfigs: [],
  partnerPoolInfos: [],
} as State;

export default createReducer(initialState, (builder) => {
  builder.addCase(initialLoadFarmingPoolsSuccess, (state, { payload }) => {
    state.loading = false;
    state.loadError = undefined;
    state.poolConfigs = payload;
  });

  builder.addCase(initialLoadFarmingPoolsError, (state, action) => {
    return {
      ...state,
      loading: false,
      loadError: action.payload.error,
    } as State;
  });

  builder.addCase(multipleUserFarmInfoFetched, (state, { payload }) => {
    state.userInfos = payload;
  });

  builder.addCase(multipleFarmInfoFetched, (state, { payload }) => {
    state.poolInfos = payload;
  });

  builder.addCase(loadPartnerPoolSuccess, (state, { payload }) => {
    state.partnerPoolConfigs = payload;
  });

  builder.addCase(multiplePartnerFarmInfoFetched, (state, { payload }) => {
    state.partnerPoolInfos = payload;
  });
});
