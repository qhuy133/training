import { TransactionResponse } from '@ethersproject/providers';
import React, { useCallback, useState } from 'react';
import { useContract } from '../../../hooks/useContract';
import { abi as MasterChefAbi } from '../../../abis/MiniChefv2.json';
import { useHandleTransactionReceipt } from '../../../hooks/useHandleTransactionReceipt';
import { useWeb3React } from '@web3-react/core';
import { ButtonOutline } from '../../../components/Buttons';
import { Zero } from '@ethersproject/constants';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useFarmingPool } from '../../../state/farms/hooks';
import { screenUp } from '../../../utils/styles';

interface FarmButtonWithdrawAllProps {
  poolId: number;
  minichef: string;
}

const FarmButtonWithdrawAll: React.FC<FarmButtonWithdrawAllProps> = ({ poolId, minichef }) => {
  const { account } = useWeb3React();
  const pool = useFarmingPool(minichef, poolId);
  const masterChef = useContract(MasterChefAbi, pool?.poolConfig?.minichef);
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const [loading, setLoading] = useState(false);

  const balance = useMemo(() => {
    return pool?.userInfo?.amount;
  }, [pool?.userInfo?.amount]);

  const disabled = useMemo(() => {
    return loading || !account || !balance || balance?.eq(Zero);
  }, [account, balance, loading]);

  const createWithdrawAllTrx = useCallback(async () => {
    return (await masterChef?.safeCall.withdrawAndHarvest(
      poolId,
      balance,
      account,
    )) as TransactionResponse;
  }, [account, masterChef, poolId, balance]);

  const withdrawAll = useCallback(async () => {
    if (!masterChef) return;
    setLoading(true);
    try {
      const tx = await handleTransactionReceipt(`Withdraw all`, createWithdrawAllTrx);
      if (tx) {
        await tx.wait();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [createWithdrawAllTrx, handleTransactionReceipt, masterChef]);

  return (
    <StyledButton
      className={loading ? 'btn-loading' : ''}
      size="sm"
      disabled={disabled}
      onClick={withdrawAll}
    >
      Withdraw all
    </StyledButton>
  );
};

const StyledButton = styled(ButtonOutline)`
  font-size: 12px;
  ${screenUp('lg')`
    font-size: 14px;
  `}
`;

export default FarmButtonWithdrawAll;
