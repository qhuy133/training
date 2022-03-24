import { BigNumber } from '@ethersproject/bignumber';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTokenBalance } from '../../../state/user/hooks';
import { useToken } from '../../../hooks/useToken';
import { BigNumberValue } from '../../../components/BigNumberValue';
import FarmButtonDeposit from './FarmButtonDeposit';
import { useCallback } from 'react';
import { TokenInputWithMaxButton } from '../../../components/TokenInput/TokenInputWithMaxButton';
import { screenUp } from '../../../utils/styles';
import { useFarmingPoolConfig } from '../../../state/farms/hooks';
import { Zero } from '@ethersproject/constants';

interface FarmDepositProps {
  poolId: number;
  minichef: string;
}

const FarmDeposit: React.FC<FarmDepositProps> = ({ poolId, minichef }) => {
  const poolConfig = useFarmingPoolConfig(minichef, poolId);
  const wantToken = useToken(poolConfig?.wantSymbol);
  const wantTokenBalance = useTokenBalance(wantToken?.symbol);
  const [inputAmount, setInputAmount] = useState<BigNumber | undefined>(undefined);

  const resetFrom = useCallback(() => {
    setInputAmount(undefined);
  }, []);

  const onClickBalance = useCallback(() => {
    setInputAmount(wantTokenBalance);
  }, [wantTokenBalance]);

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Deposit</StyledTitle>
        <StyledBalance>
          Balance:&nbsp;
          <button
            onClick={onClickBalance}
            disabled={!wantTokenBalance || wantTokenBalance?.eq(Zero)}
          >
            <BigNumberValue
              value={wantTokenBalance}
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
          maxValue={wantTokenBalance}
          onChange={setInputAmount}
          background="#fff"
        />
        <StyledActions>
          <FarmButtonDeposit
            minichef={minichef}
            poolId={poolId}
            amount={inputAmount}
            onDeposited={resetFrom}
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
  text-align: center;
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

export default FarmDeposit;
