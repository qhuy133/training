import { BigNumber } from '@ethersproject/bignumber';
import React from 'react';
import styled from 'styled-components';
import { screenUp } from '../../utils/styles';
import { BigNumberValue } from '../BigNumberValue';
import { TokenSymbol } from '../TokenSymbol';
import { TokenInputWithMaxButton } from './TokenInputWithMaxButton';

export type TokenInputWithBalanceProps = {
  maxValue?: BigNumber;
  maxValidateValue?: BigNumber;
  decimals: number;
  symbol: string;
  value: BigNumber;
  onChange?: (v: BigNumber) => void;
  disabled?: boolean;
};

export const TokenInputWithBalance: React.FC<TokenInputWithBalanceProps> = ({
  symbol,
  maxValue,
  maxValidateValue,
  decimals,
  value,
  onChange,
  disabled,
}) => {
  return (
    <StyledContainer key={symbol}>
      <StyledToken>
        <TokenSymbol symbol={symbol} size={36} />
        <div className="info">
          {symbol}
          <div className="maxValue">
            Bal: <BigNumberValue fractionDigits={1} decimals={decimals} value={maxValue} />
          </div>
        </div>
      </StyledToken>
      <TokenInputWithBalanceContainer>
        <TokenInputWithMaxButton
          value={value}
          onChange={onChange}
          decimals={decimals}
          symbol={symbol}
          maxValue={maxValue}
          maxValidateValue={maxValidateValue}
          disabled={disabled}
        />
      </TokenInputWithBalanceContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 16px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background-color: #1d2041;
  :not(:last-child) {
    margin-bottom: 10px;
  }
  ${screenUp('lg')`
    padding: 13px 12px;
    flex-direction: row;
  `}
`;

const StyledToken = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  .info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    .maxValue {
      font-size: 12px;
      font-weight: normal;
      color: #7e75a6;
    }
  }
  ${screenUp('lg')`
    width: 35%;
    margin-bottom: 0px;
    .info {
      width: fit-content;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  `}
`;

const TokenInputWithBalanceContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  ${screenUp('lg')`
    width: 65%;
    margin-left: 20px;
  `}
`;
