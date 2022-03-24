import React from 'react';
import styled from 'styled-components';
import { useToken } from '../../../hooks/useToken';
import useFarmExternalLink from '../hooks/useFarmExternalLink';
import { screenUp } from '../../../utils/styles';
import FarmButtonClaimReward from './FarmButtonClaimReward';
import { FarmPoolConfig } from '../../../models/Farm';
import { BigNumber } from '@ethersproject/bignumber';
import { BigNumberValue } from '../../../components/BigNumberValue';

export type FarmItemRewardProps = {
  poolConfig: FarmPoolConfig;
  pendingReward: BigNumber;
};

const FarmItemReward: React.FC<FarmItemRewardProps> = ({ poolConfig, pendingReward }) => {
  const rewardTokenInfo = useToken(poolConfig?.rewardToken);
  const lpToken = useToken(poolConfig?.wantSymbol);
  const { createAddLiquidityLink, createRemoveLiquidityLink, getBuyTokenUrl } =
    useFarmExternalLink();

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Rewards</StyledTitle>
      </StyledHeader>
      <StyledControl>
        <StyledEarnInfo>
          <StyledInfo>
            {rewardTokenInfo?.symbol}
            <div className="value">
              <BigNumberValue
                value={pendingReward}
                decimals={rewardTokenInfo?.decimals}
                fractionDigits={2}
                keepCommas
              />
            </div>
          </StyledInfo>
          <FarmButtonClaimReward minichef={poolConfig?.minichef} poolId={poolConfig?.id} />
        </StyledEarnInfo>
        {poolConfig?.isLp ? (
          <StyledLiquidity>
            <a
              href={createAddLiquidityLink(
                poolConfig?.market,
                poolConfig?.wantTokens[0],
                poolConfig?.wantTokens[1],
                lpToken?.address,
              )}
              target="_blank"
            >
              Add liquidity
            </a>
            <a
              href={createRemoveLiquidityLink(
                poolConfig?.market,
                poolConfig?.wantTokens[0],
                poolConfig?.wantTokens[1],
                lpToken?.address,
              )}
              target="_blank"
            >
              Remove liquidity
            </a>
          </StyledLiquidity>
        ) : (
          <StyledLiquidity>
            <a
              className="single"
              href={getBuyTokenUrl(poolConfig?.wantTokens[0])}
              target="_blank"
            >
              Buy {poolConfig?.wantTokens[0]}
            </a>
          </StyledLiquidity>
        )}
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

const StyledEarnInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const StyledInfo = styled.div`
  margin-left: 13px;
  margin-right: auto;
  font-size: 14px;
  font-weight: normal;
  color: #555a71;
  .value {
    font-size: 18px;
    font-weight: bold;
    color: #070a10;
  }
`;

const StyledLiquidity = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  a {
    display: block;
    padding: 0px;
    margin-top: 9px;
    font-size: 13px;
    font-weight: bold;
    color: #3085b1;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  ${screenUp('lg')`
    display: flex;
    a {
      font-size: 14px;
    }
  `}
`;

export default FarmItemReward;
