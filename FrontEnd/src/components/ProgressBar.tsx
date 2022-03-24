import React, { useMemo } from 'react';
import styled from 'styled-components';

export type ProgressBarProps = {
  value: number;
  color?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, color }) => {
  const percentage = useMemo(() => {
    return !value ? '60%' : value >= 100 ? '0%' : (100 - value).toFixed(2) + '%';
  }, [value]);

  const barStyle = useMemo(() => {
    return {
      width: value ? `calc(${percentage})` : '100%',
    };
  }, [percentage, value]);

  return (
    <StyledTrack color={color}>
      <StyledBar style={barStyle}></StyledBar>
    </StyledTrack>
  );
};

const StyledTrack = styled.div<{ color?: string }>`
  position: relative;
  overflow: hidden;
  border-radius: 1000px;
  height: 8px;
  background: ${({ color }) =>
    color || 'linear-gradient(to right, #0ec871 0%, #ef8327 80%, #c00505 90%)'};
  z-index: 0;
  overflow: hidden;
`;

const StyledBar = styled.div`
  background: #36395d;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  transition: all 0.15s linear;
  z-index: 1;
`;
