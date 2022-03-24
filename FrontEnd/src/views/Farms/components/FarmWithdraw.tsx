import { BigNumber } from '@ethersproject/bignumber';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Spacer from '../../../components/Spacer';
import { useToken } from '../../../hooks/useToken';
import { BigNumberValue } from '../../../components/BigNumberValue';
import FarmButtonWithdraw from './FarmButtonWithdraw';
import FarmButtonWithdrawAll from './FarmButtonWithdrawAll';
import { TokenInputWithMaxButton } from '../../../components/TokenInput/TokenInputWithMaxButton';
import { screenUp } from '../../../utils/styles';
import { useFarmingPool, useFarmingPoolConfig } from '../../../state/farms/hooks';
import { Zero } from '@ethersproject/constants';

interface FarmWithdrawProps {
  poolId: number;
  minichef: string;
}

const FarmWithdraw: React.FC<FarmWithdrawProps> = ({ poolId, minichef }) => {
  const poolConfig = useFarmingPoolConfig(minichef, poolId);
  const wantToken = useToken(poolConfig?.wantSymbol);
  const poolInfo = useFarmingPool(minichef, poolId);
  const userPoolInfo = poolInfo?.userInfo;
  const [inputAmount, setInputAmount] = useState<BigNumber | undefined>(undefined);

  const onResetForm = useCallback(() => {
    setInputAmount(undefined);
  }, []);

  const onClickBalance = useCallback(() => {
    setInputAmount(userPoolInfo?.amount);
  }, [userPoolInfo?.amount]);

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Withdraw</StyledTitle>
        <StyledBalance>
          Deposited:&nbsp;
          <button
            onClick={onClickBalance}
            disabled={!userPoolInfo?.amount || userPoolInfo?.amount?.eq(Zero)}
          >
            <BigNumberValue
              value={userPoolInfo?.amount}
              decimals={wantToken?.decimals}
              fractionDigits={4}
              keepCommas
            />
          </button>
        </StyledBalance>
      </StyledHeader>
      <StyledControl>
        <TokenInputWithMaxButton
          decimals={wantToken?.decimals}
          symbol={wantToken?.symbol}
          value={inputAmount}
          maxValue={userPoolInfo?.amount}
          onChange={setInputAmount}
          background="#fff"
        />
        <StyledActions>
          {/* <FarmButtonWithdrawAll poolId={poolId} minichef={minichef} />
          <Spacer size="sm" /> */}
          <FarmButtonWithdraw
            poolId={poolId}
            minichef={minichef}
            amount={inputAmount}
            onWithdraw={onResetForm}
          />
        </StyledActions>
      </StyledControl>
    </StyledContainer>
  );
};

const StyledContainer = styled.div``;

const StyledHeader = styled.div`
  margin-bottom: -1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  width: 100px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: #070a10;
  background-color: #e5e7ef;
`;

const StyledControl = styled.div`
  background-color: #e5e7ef;
  padding: 20px 12px;
  ${screenUp('lg')`
     padding: 20px 17px;
  `}
`;

const StyledActions = styled.div`
  padding: 16px 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${screenUp('lg')`
     padding: 16px 0 0;
  `}
`;

const StyledBalance = styled.div`
  font-size: 14px;
  color: #555a71;
  font-weight: normal;
  button {
    color: #3085b1;
    padding: 0;
    :hover {
      color: #070a10;
    }
  }
`;

export default FarmWithdraw;
