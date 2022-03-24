import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import useInterval from '../hooks/useInterval';
import { screenUp } from '../utils/styles';

export type CountDownProps = {
  to: number; // unix times
  height?: string;
  onArrived?: () => void;
};

interface RemainingTime {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export const Countdown: React.FC<CountDownProps> = ({ to, height, onArrived }) => {
  const [distance, setDistance] = useState(0);

  const remaining: RemainingTime = useMemo(() => {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }, [distance]);

  useInterval(
    () => {
      const _distance = to * 1000 - Date.now();
      setDistance(_distance);
      if (_distance <= 0 && onArrived) {
        onArrived();
      }
    },
    1000,
    to,
  );

  const zeroPadding = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <StyledBackground height={height}>
      <StyledTime>
        <StyledTimeValue>{zeroPadding(remaining.days)}</StyledTimeValue>
        <StyledLabel>{Number(remaining.days) != 1 ? 'days' : 'day'}</StyledLabel>
      </StyledTime>
      <Separator>:</Separator>
      <StyledTime>
        <StyledTimeValue>{zeroPadding(remaining.hours)}</StyledTimeValue>
        <StyledLabel>{Number(remaining.hours) != 1 ? 'hours' : 'hour'}</StyledLabel>
      </StyledTime>
      <Separator>:</Separator>
      <StyledTime>
        <StyledTimeValue>{zeroPadding(remaining.minutes)}</StyledTimeValue>
        <StyledLabel>{Number(remaining.minutes) != 1 ? 'minutes' : 'minute'}</StyledLabel>
      </StyledTime>
      <Separator>:</Separator>
      <StyledTime>
        <StyledTimeValue>{zeroPadding(remaining.seconds)}</StyledTimeValue>
        <StyledLabel>{Number(remaining.seconds) != 1 ? 'seconds' : 'second'}</StyledLabel>
      </StyledTime>
    </StyledBackground>
  );
};

const StyledLabel = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #555a71;
  ${screenUp('lg')`
    font-size: 16px;
  `}
`;
const StyledTimeValue = styled.div`
  width: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
  color: ${(props) => props.theme.colors.primary};
  ${screenUp('lg')`
    width: 70px;
    font-size: 42px;
  `}
`;

const StyledTime = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  ${screenUp('lg')`
    width: 120px;
    height: 120px;
  `}
`;

const Separator = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 26px;
  margin-bottom: 5px;
  ${screenUp('lg')`
    margin: 0px 10px;
  `}
`;

const StyledBackground = styled.div<{ height?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: ${({ height }) => height || '120px'};
  padding: 0 20px;
`;
