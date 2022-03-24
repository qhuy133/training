import { useWeb3React } from '@web3-react/core';
import { flatten } from 'lodash';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMulticall } from '../../hooks/useMulticall';
import { useLastUpdated } from '../../state/application/hooks';
import { multipleUserFarmInfoFetched, loadPartnerPoolSuccess } from '../../state/farms/actions';
import { useFarmingPoolConfigs } from '../../state/farms/hooks';
import { usePartnerFarmConfig } from '../../views/Farms/hooks/usePartnerFarmConfig';

const FarmUserUpdater: React.FC = () => {
  const { account } = useWeb3React();
  const multicall = useMulticall();
  const dispatch = useDispatch();
  const poolConfigs = useFarmingPoolConfigs();
  const lastUpdated = useLastUpdated();

  const fetchMinichefUserInfo = useCallback(async () => {
    if (!account || !multicall || !poolConfigs?.length) {
      return [];
    }

    const calls = poolConfigs.map((pool) => [
      {
        target: pool?.minichef,
        signature: 'userInfo(uint256, address) returns (uint256 amount, uint256 rewardDebt)',
        params: [pool?.id, account],
      },
      {
        target: pool?.minichef,
        signature: 'pendingSushi(uint256, address) view returns (uint256 pendingReward)',
        params: [pool?.id, account],
      },
    ]);
    const response = await multicall(flatten(calls));
    return calls.map((_, index) => {
      const [[amount, rewardDebt], [pendingReward]] = response.slice(
        2 * index,
        2 * (index + 1),
      );
      return {
        amount: amount.toHexString(),
        rewardDebt: rewardDebt.toHexString(),
        pendingReward: pendingReward.toHexString(),
      };
    });
  }, [account, multicall, poolConfigs]);

  useEffect(() => {
    fetchMinichefUserInfo().then((res) => {
      dispatch(multipleUserFarmInfoFetched(res));
    });
  }, [dispatch, fetchMinichefUserInfo, lastUpdated]);

  const partnerPools = usePartnerFarmConfig();

  useEffect(() => {
    dispatch(loadPartnerPoolSuccess(partnerPools));
  }, [dispatch, partnerPools]);

  return null;
};

export default FarmUserUpdater;
