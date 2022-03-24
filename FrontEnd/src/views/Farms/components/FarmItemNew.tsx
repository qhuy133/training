import React, { useState } from 'react';
import styled from 'styled-components';
import { Zero } from '@ethersproject/constants';
import FarmDeposit from './FarmDeposit';
import FarmWithdraw from './FarmWithdraw';
import { screenUp } from '../../../utils/styles';
import { FarmingPoolInfo } from '../../../models/Farm';
import FarmItemReward from './FarmItemReward';
import { BigNumberValue } from '../../../components/BigNumberValue';
import { useMemo } from 'react';
import { useTokenPrice } from '../../../state/tokens/hooks';
import { PricePrecision } from '../../../utils/constants';
import { isPast } from '../../../utils/times';
import { FarmItemCountdown } from './FarmItemCountdown';
import iconTimer from '../../../assets/icons/timer.svg';
import {
  CollapseBody,
  CollapseButton,
  CollapseClose,
  CollapseItem,
  CollapseOpen,
} from '../../../components/Collapse';

export type FarmItemProps = {
  index: number;
  pool: FarmingPoolInfo;
};

const FarmItem: React.FC<FarmItemProps> = ({ index, pool }) => {
  const farmUrl = useMemo(() => pool?.poolConfig?.farmUrl, [pool]);
  const userPoolInfo = pool?.userInfo;
  const wantPrice = useTokenPrice(pool?.poolConfig?.wantSymbol);
  const rewardPrice = useTokenPrice(pool?.poolConfig?.rewardToken);
  const startRewardTime = pool?.poolConfig?.startRewardTime || 0;
  const [isStartSentReward, setIsStartSentReward] = useState(isPast(startRewardTime));

  const farmName = useMemo(() => {
    return pool?.poolConfig?.name
      ? pool?.poolConfig?.name
      : `${pool?.poolConfig?.wantTokens[0]}${
          pool?.poolConfig?.wantTokens[1] ? '/' + pool?.poolConfig?.wantTokens[1] : ''
        }`;
  }, [pool?.poolConfig?.name, pool?.poolConfig?.wantTokens]);

  const depositedValue = useMemo(() => {
    return userPoolInfo && wantPrice
      ? userPoolInfo?.amount?.mul(wantPrice)?.div(PricePrecision)
      : null;
  }, [userPoolInfo, wantPrice]);

  const totalValueLocked = useMemo(() => {
    return pool?.poolInfo?.totalStaked && wantPrice
      ? pool?.poolInfo?.totalStaked?.mul(wantPrice)?.div(PricePrecision)
      : null;
  }, [pool, wantPrice]);

  const poolShare = useMemo(() => {
    if (!depositedValue || !totalValueLocked || totalValueLocked.eq(Zero)) {
      return;
    }
    return depositedValue.mul(PricePrecision).div(totalValueLocked);
  }, [depositedValue, totalValueLocked]);

  const rewardPerDay = useMemo(() => {
    if (!pool?.poolInfo) {
      return;
    }

    const { allocPoint, totalAllocPoint, rewardPerSecond } = pool.poolInfo;
    if (totalAllocPoint?.eq(0)) {
      return Zero;
    }
    return allocPoint?.mul(rewardPerSecond)?.mul(86400)?.div(totalAllocPoint);
  }, [pool]);

  const apr = useMemo(() => {
    if (!rewardPrice || !rewardPerDay || !totalValueLocked) {
      return;
    }
    if (totalValueLocked?.eq(Zero)) {
      return Zero;
    }
    return rewardPrice?.mul(rewardPerDay)?.mul(365)?.div(totalValueLocked);
  }, [rewardPerDay, rewardPrice, totalValueLocked]);

  return (
    <StyledContainer>
      <CollapseItem id={index}>
        <StyledHeader coming={!isStartSentReward}>
          <StyledFarmToken>
            <div>
              <StyledSymbol>{farmName}</StyledSymbol>
              <StyledReward>
                {farmUrl ? (
                  pool?.partnerPoolInfo?.rewardPerDay ? (
                    pool?.partnerPoolInfo?.rewardPerDay
                  ) : (
                    '-'
                  )
                ) : (
                  <BigNumberValue value={rewardPerDay} decimals={18} fractionDigits={0} />
                )}
                &nbsp;
                {pool?.poolConfig?.rewardToken} per day
              </StyledReward>
            </div>
          </StyledFarmToken>
          {isStartSentReward ? (
            <StyledHeaderInfo>
              <StyledRow>
                <StyledTitle>Deposited</StyledTitle>
                <StyledValue>
                  {depositedValue?.gt(Zero) ? (
                    <>
                      <BigNumberValue
                        value={depositedValue}
                        decimals={18}
                        fractionDigits={2}
                        currency="USD"
                      />
                      <span className="sub-value">
                        (
                        <BigNumberValue
                          value={poolShare}
                          percentage
                          decimals={18}
                          fractionDigits={4}
                        />
                        )
                      </span>
                    </>
                  ) : (
                    '-'
                  )}
                </StyledValue>
              </StyledRow>
            </StyledHeaderInfo>
          ) : (
            <StyledComing>
              <img src={iconTimer} />
              <FarmItemCountdown
                to={startRewardTime}
                onArrived={() => setIsStartSentReward(true)}
              />
            </StyledComing>
          )}
          {isStartSentReward && (
            <CollapseButton id={index}>
              <StyledButton>
                <CollapseOpen id={index}>
                  <i className="fal fa-chevron-down" />
                </CollapseOpen>
                <CollapseClose id={index}>
                  <i className="fal fa-chevron-up" />
                </CollapseClose>
              </StyledButton>
            </CollapseButton>
          )}
        </StyledHeader>
      </CollapseItem>
      <CollapseBody id={index}>
        <StyledContent>
          {!pool?.poolConfig?.coming && (
            <>
              <FarmDeposit
                minichef={pool?.poolConfig?.minichef}
                poolId={pool?.poolConfig?.id}
              />
              <FarmWithdraw
                minichef={pool?.poolConfig?.minichef}
                poolId={pool?.poolConfig?.id}
              />
              <FarmItemReward
                poolConfig={pool?.poolConfig}
                pendingReward={userPoolInfo?.pendingReward}
              />
            </>
          )}
        </StyledContent>
      </CollapseBody>
    </StyledContainer>
  );
};

const StyledComing = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  img {
    display: none;
    width: 30px;
    margin-right: 16px;
  }
  ${screenUp('lg')`
    img {
      display: block;
    }
  `}
`;

const StyledContainer = styled.div<{ isExpand?: boolean }>`
  width: 100%;
  cursor: ${({ isExpand }) => (isExpand ? 'auto' : 'pointer')};
  position: relative;
  background: transparent;
  margin-bottom: 12px;
  overflow: hidden;
  padding: 0px 12px;
  background-color: #fff;
  ${screenUp('lg')`
     padding: 0px 24px;
  `}
`;

const StyledHeader = styled.div<{ coming?: boolean }>`
  display: block;
  padding: 22px 0px;
  ${(p) => screenUp('lg')`
    display: ${p.coming ? 'flex' : 'grid'};
    align-items: center;
    grid-template-columns: 6fr 12fr 1fr;
    grid-gap: 10px;
  `}
`;

const StyledFarmToken = styled.div`
  display: flex;
  img {
    width: 100px;
    object-fit: contain;
    margin-right: 12px;
  }
  border-bottom: 1px solid #2c3648;
  padding-bottom: 20px;
  ${screenUp('lg')`
    border-bottom: none;
    padding-bottom: 0px;
  `}
`;

const StyledSymbol = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #070a10;
`;

const StyledReward = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #555a71;
  padding-top: 8px;
`;

const StyledHeaderInfo = styled.div`
  display: block;
  margin-top: 20px;
  ${screenUp('lg')`
    margin-top: 0px;
    display: grid;
    grid-template-columns: 4fr 3fr 3fr;
    grid-gap: 10px;
  `}
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  :not(:last-child) {
    padding-bottom: 10px;
  }
  ${screenUp('lg')`
    display: block;
    :not(:last-child) {
      padding-bottom: 0px;
    }
  `}
`;

const StyledTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: #555a71;
`;

const StyledValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #070a10;
  padding-top: 0px;
  .sub-value {
    margin-left: 5px;
    font-size: 12px;
    color: #999;
    font-weight: 600;
  }
  ${screenUp('lg')`
    padding-top: 10px;
  `}
`;

const StyledButton = styled.div`
  width: 26px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  i {
    font-size: 15px;
    color: #555a71;
  }
  ${screenUp('lg')`
    display: block;
  `}
`;

const StyledContent = styled.div`
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 20px;
  border-top: 1px dashed #acb7d0;
  padding: 22px 0px 34px 0px;
  transition: all 0.2s ease;
  transform-origin: top;
  display: grid;
  ${screenUp('lg')`
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
  `}
`;

export default FarmItem;
