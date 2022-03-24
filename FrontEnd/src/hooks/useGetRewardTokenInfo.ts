import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMulticall } from './useMulticall';
import { useToken } from './useToken';

export const useGetRewardTokenInfo = () => {
  const [info, setInfo] = useState<{ circulatingSupply: BigNumber }>();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const multicall = useMulticall();
  const rewardToken = useToken('1SWAP');

  useEffect(() => {
    return;
    let mounted = true;
    if (!rewardToken) return;
    const calls = [
      {
        target: rewardToken.address,
        signature: 'totalSupply() view returns (uint256)',
        params: [],
      },
      {
        target: rewardToken.address,
        signature: 'balanceOf(address) view returns (uint256)',
        params: ['0xCE0E4aD52cfB1bb3Bfc0B5E8DF6Fa3c3549dFba9'], // LiquidityMiningFund
      },
      {
        target: rewardToken.address,
        signature: 'balanceOf(address) view returns (uint256)',
        params: ['0xF7Ca99ad11feE5F444090ab601191B8C894e88eE'], // DevFund
      },
      {
        target: rewardToken.address,
        signature: 'balanceOf(address) view returns (uint256)',
        params: ['0x08D79589Caf19dC762Cf1A7a43e90A2E3023d730'], // TreasuryFund
      },
      {
        target: rewardToken.address,
        signature: 'balanceOf(address) view returns (uint256)',
        params: ['0xcAd4c09C0288acA5B0f4502a8cD247B4B4A6b1B1'], // EcoSystemFund
      },
      {
        target: rewardToken.address,
        signature: 'balanceOf(address) view returns (uint256)',
        params: ['0x2e8EbB30cD1a3792900B78f17de2f295f7FC67D6'], // OneSwapChef
      },
    ];
    if (!multicall) return;
    multicall(calls).then((results) => {
      if (!results) return;
      const [
        [totalSupply],
        [liquidityMiningFund],
        [devFund],
        [treasuryFund],
        [ecoSystemFund],
        [oneSwapChefFund],
      ] = results;
      if (mounted) {
        setInfo({
          circulatingSupply:
            totalSupply
              ?.sub(liquidityMiningFund)
              ?.sub(devFund)
              ?.sub(treasuryFund)
              ?.sub(ecoSystemFund)
              ?.sub(oneSwapChefFund) || Zero,
        });
      }
    });
    return () => {
      mounted = false;
    };
  }, [account, dispatch, rewardToken, multicall]);

  return info;
};
