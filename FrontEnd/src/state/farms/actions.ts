import { createAction } from '@reduxjs/toolkit';
import { FarmPoolConfig, PartnerFarmInfo } from '../../models/Farm';
import { FarmInfoState, UserFarmInfoState } from './reducer';

export const initialLoadFarmingPoolsSuccess = createAction<FarmPoolConfig[]>(
  'farms/initialLoad/success',
);

export const initialLoadFarmingPoolsError = createAction<{ error: string }>(
  'farms/initialLoad/error',
);

export const multipleFarmInfoFetched = createAction<FarmInfoState[]>(
  'farms/multipleFarmInfoFetched',
);

export const multipleUserFarmInfoFetched = createAction<UserFarmInfoState[]>(
  'farms/multipleUserFarmInfoFetched',
);

export const loadPartnerPoolSuccess = createAction<FarmPoolConfig[]>(
  'farms/loadPartnerPoolSuccess',
);

export const multiplePartnerFarmInfoFetched = createAction<PartnerFarmInfo[]>(
  'farms/multiplePartnerFarmInfoFetched',
);
