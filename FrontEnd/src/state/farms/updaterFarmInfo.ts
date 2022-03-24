import { useWeb3React } from '@web3-react/core';
import { flatten } from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTokenAddress } from '../../config';
import { useMulticall } from '../../hooks/useMulticall';
import {
  multipleFarmInfoFetched,
  initialLoadFarmingPoolsError,
} from '../../state/farms/actions';
import { useStartObserveTokens } from '../../state/tokens/hooks';
import { useFarmConfig } from '../../views/Farms/hooks/useFarmConfig';

export const FarmInfoUpdater = () => {
  const { account, chainId } = useWeb3React();
  const multicall = useMulticall();
  const dispatch = useDispatch();
  const pools = useFarmConfig();

  useEffect(() => {
    return;
    if (!multicall || !pools || !pools.length) {
      return;
    }

    let mounted = true;
    const calls = pools.map((p) => [
      {
        target: p.minichef,
        signature: 'totalAllocPoint() view returns (uint256)',
        params: [],
      },
      {
        target: p.minichef,
        signature: 'rewardPerSecond() view returns (uint256)',
        params: [],
      },
      {
        target: getTokenAddress(chainId, p.wantSymbol),
        signature: 'balanceOf(address) view returns (uint256)',
        params: [p.minichef],
      },
      {
        target: p.minichef,
        signature: 'poolInfo(uint256) view returns (uint256, uint256, uint256)',
        params: [p.id],
      },
    ]);

    multicall(flatten(calls))
      .then((response) => {
        if (!mounted) {
          return;
        }

        const data = calls.map((_, i) => {
          const [
            [totalAllocPoint],
            [rewardPerSecond],
            [totalStaked],
            [accRewardPerShare, lastRewardTime, allocPoint],
          ] = response.slice(4 * i, 4 * (i + 1));

          return {
            totalAllocPoint: totalAllocPoint.toHexString(),
            rewardPerSecond: rewardPerSecond.toHexString(),
            accRewardPerShare: accRewardPerShare.toHexString(),
            lastRewardTime: lastRewardTime.toHexString(),
            allocPoint: allocPoint.toHexString(),
            totalStaked: totalStaked.toHexString(),
          };
        });

        dispatch(multipleFarmInfoFetched(data));
      })
      .catch((error) => {
        dispatch(
          initialLoadFarmingPoolsError({
            error,
          }),
        );
      });
    return () => {
      mounted = false;
    };
  }, [account, dispatch, multicall, pools, chainId]);

  const startObserveTokens = useStartObserveTokens();
  useEffect(() => {
    const tokens = flatten(
      pools.map((t) => {
        return [t.wantSymbol, t.rewardToken];
      }),
    );

    startObserveTokens(tokens);
  }, [pools, startObserveTokens]);

  return null;
};
