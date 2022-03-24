import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import React, { useMemo } from 'react';
import { useCallback } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { useApprove } from '../../hooks/useApprove';
import useModal from '../../hooks/useModal';
import { screenUp } from '../../utils/styles';
import { ModalSelectWallet } from '../AccountModal/ModalSelectWallet';
import { ButtonOutline } from '../Buttons';
import { TokenSymbol } from '../TokenSymbol';
import { TokenInputWithMaxButton } from './TokenInputWithMaxButton';
export type TokenInputWithApproveProps = {
  maxValue?: BigNumber;
  decimals: number;
  symbol: string;
  value: BigNumber;
  onChange?: (v: BigNumber) => void;
  spender: string;
  useTooltip?: boolean;
};

export const TokenInputWithApprove: React.FC<TokenInputWithApproveProps> = ({
  symbol,
  maxValue,
  decimals,
  value,
  onChange,
  spender,
  useTooltip,
}) => {
  const { account } = useWeb3React();
  const { loadingSubmit, approve, isApproved } = useApprove(symbol, spender);
  const [connect] = useModal(<ModalSelectWallet />);

  const buttonText = useMemo(() => {
    if (!account) return 'Connect';
    return 'Approve';
  }, [account]);

  const onButtonClick = useCallback(() => {
    if (!account) {
      connect();
      return;
    }
    approve();
  }, [account, approve, connect]);

  return (
    <StyledContainer key={symbol}>
      <StyledTokenContainer>
        <StyledToken>
          <TokenSymbol symbol={symbol} size={36} />
          <div className="info">
            <div className="symbol">
              {!useTooltip ? (
                symbol
              ) : (
                <>
                  <Placeholder data-tip={symbol} data-class="custom-tooltip">
                    {symbol}
                  </Placeholder>
                  <ReactTooltip
                    effect="float"
                    type="info"
                    multiline={true}
                    backgroundColor="#fff"
                    textColor="#070a10"
                  />
                </>
              )}
            </div>
          </div>
        </StyledToken>
      </StyledTokenContainer>
      <TokenInputWithApproveContainer>
        {isApproved ? (
          <TokenInputWithMaxButton
            value={value}
            onChange={onChange}
            decimals={decimals}
            symbol={symbol}
            maxValue={maxValue}
          />
        ) : (
          <StyledButton
            className={loadingSubmit ? 'btn-loading' : ''}
            onClick={onButtonClick}
            disabled={loadingSubmit}
            size="sm"
          >
            {buttonText}
          </StyledButton>
        )}
      </TokenInputWithApproveContainer>
    </StyledContainer>
  );
};

const Placeholder = styled.p``;

const StyledButton = styled(ButtonOutline)`
  margin-right: 20px;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e5e7ef;
  ${screenUp('lg')`
    background-color: #e5e7ef;
    flex-direction: row;
  `}
`;

const StyledTokenContainer = styled.div`
  display: flex;
  align-items: center;
  width: 35%;
  margin-bottom: 0;
  border-right: 1px solid #fff;
  background-color: #dde0ea;
  padding: 0 20px 0 10px;
  height: 62px;
  overflow: hidden;
  img {
    object-fit: contain;
  }
  ${screenUp('lg')`
    padding: 0 0 0 15px;
    width: 30%;
  `}
`;

const StyledToken = styled.button`
  display: flex;
  align-items: center;
  padding: 0px;
  width: 100%;
  img {
    width: 28px;
    height: 28px;
  }
  .info {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 3px 0px;
    font-size: 16px;
    font-weight: normal;
    color: #070a10;
    margin-left: 8px;
    flex-direction: column;
    align-items: flex-start;
    .symbol {
      width: 50px;
      padding-right: 4px;
      display: flex;
      align-items: center;
      font-weight: normal;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      i {
        color: #a5aaba;
        margin-left: 5px;
      }
    }
  }
  ${screenUp('lg')`
    img {
      width: 36px;
      height: 36px;
    }
    .info {
      .symbol {
        width: 110px;
        font-size: 14px;
      }
    }
  `}
`;

const TokenInputWithApproveContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 65%;
  ${screenUp('lg')`
    width: 70%;
  `}
`;
