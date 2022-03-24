import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useAddTokenMetamask } from '../../hooks/useAddTokenToMetamask';
import { useTokenPrice } from '../../state/tokens/hooks';
import { BigNumberValue } from '../BigNumberValue';
import Modal, { ModalCloseButton, ModalContent, ModalProps } from '../Modal/ModalStyles';
import { TokenSymbol } from '../TokenSymbol';
import metamask from '../../assets/images/metamask.png';
import { ButtonOutline } from '../Buttons';
import Spacer from '../Spacer';
import { ExternalLinks, PricePrecision } from '../../utils/constants';
import { useToken } from '../../hooks/useToken';
import { useMemo } from 'react';
import { useGetRewardTokenInfo } from '../../hooks/useGetRewardTokenInfo';
import { ExplorerLink } from '../ExplorerLink';

const Modal1Swap: React.FC<ModalProps> = ({ onDismiss }) => {
  const rewardToken = useToken('1SWAP');
  const rewardPrice = useTokenPrice(rewardToken?.symbol);
  const info = useGetRewardTokenInfo();
  const addToken = useAddTokenMetamask();

  const marketCap = useMemo(() => {
    if (!info?.circulatingSupply || !rewardPrice) {
      return;
    }
    return info?.circulatingSupply.mul(rewardPrice).div(PricePrecision);
  }, [info?.circulatingSupply, rewardPrice]);

  const onAddToken = useCallback(() => {
    addToken(rewardToken?.symbol);
  }, [addToken, rewardToken?.symbol]);

  return (
    <Modal size="xs">
      <StyledContent>
        <CloseButton onClick={onDismiss} />
        <StyledTokenHeader>
          <TokenSymbol symbol={rewardToken?.symbol} size={65} />
          <StyledToken>
            <div className="top">{rewardToken?.symbol}</div>
            <div className="price">
              <BigNumberValue
                value={rewardPrice}
                decimals={18}
                fractionDigits={6}
                currency="USD"
              />
            </div>
          </StyledToken>
        </StyledTokenHeader>
        <StyledTokenInfo>
          <div className="row">
            Circulating supply
            <span>
              {info ? (
                <BigNumberValue
                  value={info?.circulatingSupply}
                  decimals={18}
                  fractionDigits={0}
                  keepCommas={true}
                />
              ) : (
                '-'
              )}
            </span>
          </div>
          <div className="row">
            Market cap
            <span>
              {marketCap ? (
                <BigNumberValue
                  value={marketCap}
                  decimals={18}
                  fractionDigits={0}
                  keepCommas={true}
                  currency="USD"
                />
              ) : (
                '-'
              )}
            </span>
          </div>
          <div className="row">
            View Contract
            <span>
              <ExplorerLink type="token" address={rewardToken?.address}>
                <i className="far fa-external-link"></i>
              </ExplorerLink>
            </span>
          </div>
          <div className="row">
            Coingecko
            <span>
              <a target="_blank" href={'https://www.coingecko.com/en/coins/1swap'}>
                <i className="far fa-external-link"></i>
              </a>
            </span>
          </div>
        </StyledTokenInfo>
        <StyledGroupButton>
          <StyledButton size="md" onClick={onAddToken}>
            <img src={metamask} />
            Add 1SWAP
          </StyledButton>
          <Spacer />
          <ButtonBuy href={ExternalLinks.buy1SwapSolarbeam} target="_blank">
            <i className="far fa-shopping-cart"></i>
            Buy 1SWAP
          </ButtonBuy>
        </StyledGroupButton>
      </StyledContent>
    </Modal>
  );
};

const StyledContent = styled(ModalContent)`
  position: relative;
  background-color: transparent;
  padding: 20px 0 0;
`;

const StyledTokenHeader = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 15px;
  }
`;

const StyledTokenInfo = styled.div`
  padding: 0px 10px;
  background-color: #e5e7ef;
  margin-top: 20px;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 2px;
    font-size: 14px;
    font-weight: normal;
    color: #555a71;
    i {
      color: #418db5;
      font-size: 13px;
      :hover {
        color: #195f83;
      }
    }
    :not(:last-child) {
      border-bottom: 1px dashed #acb7d0;
    }
  }
  span {
    font-size: 14px;
    font-weight: normal;
    color: #070a10;
  }
`;

const StyledToken = styled.div`
  .top {
    font-size: 26px;
    font-weight: bold;
  }
  .price {
    display: flex;
    align-items: center;
    color: #3085b1;
    font-size: 18px;
    font-weight: bold;
    .line {
      width: 1px;
      height: 15px;
      background-color: #888c9d;
      margin: 0 8px;
    }
    a {
      font-size: 12px;
      color: #8c98b5;
      i {
        margin-left: 4px;
      }
      :hover {
        color: #3085b1;
      }
    }
  }
`;

const StyledGroupButton = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(ButtonOutline)`
  flex: 1;
`;

const ButtonBuy = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 42px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  color: #fff;
  background-color: #3085b1;
  i {
    font-size: 16px;
    margin-right: 8px;
    margin-bottom: 1px;
  }
`;

const CloseButton = styled(ModalCloseButton)`
  position: absolute;
  right: 0px;
  top: 20px;
`;

export default Modal1Swap;
