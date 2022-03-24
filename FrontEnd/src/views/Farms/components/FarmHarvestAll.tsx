import React, { useCallback, useState } from 'react';
import { Button } from '../../../components/Buttons';
import styled from 'styled-components';
import { useFarmingPools, usePendingRewardFarmCount } from '../../../state/farms/hooks';
import { useMemo } from 'react';
import { Zero } from '@ethersproject/constants';
import { useToken } from '../../../hooks/useToken';
import { BigNumberValue } from '../../../components/BigNumberValue';
import { useWatchTokenBalance } from '../../../state/user/hooks';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { abi as MasterChefAbi } from '../../../abis/MiniChefv2.json';
import { TransactionResponse } from '@ethersproject/providers';
import { useHandleTransactionReceipt } from '../../../hooks/useHandleTransactionReceipt';
import { useContract } from '../../../hooks/useContract';
import { screenUp } from '../../../utils/styles';

const FarmHarvestAll: React.FC = () => {
  const { account } = useWeb3React();
  const pools = useFarmingPools();
  const rewardToken = useToken(pools[0]?.poolConfig?.rewardToken);
  const watchTokens = useWatchTokenBalance();
  const masterChef = useContract(MasterChefAbi, pools[0]?.poolConfig?.minichef);
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    watchTokens(['1SWAP']);
  }, [watchTokens]);

  const numberFarmExistReward = usePendingRewardFarmCount();

  const totalReward = useMemo(() => {
    return pools.reduce((current, next) => {
      return next?.userInfo?.pendingReward
        ? current.add(next?.userInfo?.pendingReward) || Zero
        : current;
    }, Zero);
  }, [pools]);

  const disabled = useMemo(() => {
    return loading || !totalReward || totalReward?.eq(Zero) || !account;
  }, [loading, totalReward, account]);

  const harvestAllRewards = useCallback(async () => {
    return (await masterChef?.safeCall.harvestAllRewards(account)) as TransactionResponse;
  }, [account, masterChef]);

  const onHarvest = useCallback(async () => {
    if (!masterChef) return;
    setLoading(true);
    try {
      const tx = await handleTransactionReceipt(
        `Claim ${rewardToken?.symbol} in ${numberFarmExistReward} ${
          numberFarmExistReward === 1 ? 'pool' : 'pools'
        }`,
        harvestAllRewards,
      );
      if (tx) {
        await tx.wait();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [
    masterChef,
    handleTransactionReceipt,
    rewardToken?.symbol,
    numberFarmExistReward,
    harvestAllRewards,
  ]);

  return (
    <StyledContainer>
      Farms
      {/* <StyledReward>
        1SWAP to Claim:
        <span>
          <BigNumberValue
            value={totalReward}
            decimals={rewardToken?.decimals}
            fractionDigits={2}
          />
        </span>
        <Button
          className={loading ? 'btn-loading' : ''}
          size="sm"
          disabled={disabled}
          onClick={onHarvest}
        >
          {`Claim All`} {numberFarmExistReward ? `(${numberFarmExistReward})` : []}
        </Button>
      </StyledReward> */}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  padding-bottom: 24px;
  ${screenUp('lg')`
    flex-direction: row;
    align-items: center;
  `}
`;

const StyledReward = styled.div`
  margin-left: auto;
  font-size: 14px;
  font-weight: normal;
  color: #cecece;
  button {
    margin-top: 10px;
  }
  span {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    padding: 0px 10px 0px 4px;
  }
  ${screenUp('lg')`
    button {
      margin-top: 0px;
    }
  `}
`;

export default FarmHarvestAll;
