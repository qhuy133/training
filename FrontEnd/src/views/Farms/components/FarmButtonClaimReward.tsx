import React, { useMemo, useState } from 'react';
import { useCallback } from 'react';
import { Zero } from '@ethersproject/constants';
import { abi as MasterChefAbi } from '../../../abis/MiniChefv2.json';
import { useContract } from '../../../hooks/useContract';
import { TransactionResponse } from '@ethersproject/providers';
import { useHandleTransactionReceipt } from '../../../hooks/useHandleTransactionReceipt';
import { useWeb3React } from '@web3-react/core';
import { useToken } from '../../../hooks/useToken';
import { ButtonOutline } from '../../../components/Buttons';
import styled from 'styled-components';
import { useFarmingPool } from '../../../state/farms/hooks';

export type FarmButtonClaimRewardProps = {
  minichef: string;
  poolId: number;
};

const FarmButtonClaimReward: React.FC<FarmButtonClaimRewardProps> = ({ poolId, minichef }) => {
  const { account } = useWeb3React();
  const pool = useFarmingPool(minichef, poolId);
  const rewardToken = useToken(pool?.poolConfig?.rewardToken);
  const masterChef = useContract(MasterChefAbi, pool?.poolConfig?.minichef);
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const [loading, setLoading] = useState(false);

  const harvest = useCallback(async () => {
    return (await masterChef?.safeCall.harvest(poolId, account)) as TransactionResponse;
  }, [account, masterChef, poolId]);

  const onHarvest = useCallback(async () => {
    if (!masterChef) return;
    setLoading(true);
    try {
      const tx = await handleTransactionReceipt(
        `Claim ${rewardToken?.symbol} rewards`,
        harvest,
      );
      if (tx) {
        await tx.wait();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [masterChef, handleTransactionReceipt, rewardToken?.symbol, harvest]);

  const disabled = useMemo(() => {
    return (
      loading ||
      !pool?.userInfo?.pendingReward ||
      pool?.userInfo?.pendingReward?.eq(Zero) ||
      !account
    );
  }, [loading, pool?.userInfo?.pendingReward, account]);

  return (
    <StyledButton
      className={loading ? 'btn-loading' : ''}
      size="sm"
      disabled={disabled}
      onClick={onHarvest}
    >
      Claim
    </StyledButton>
  );
};

const StyledButton = styled(ButtonOutline)`
  height: 30px;
  padding: 0px 6px;
  font-size: 12px;
`;

export default FarmButtonClaimReward;
