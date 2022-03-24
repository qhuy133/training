import React from 'react';
import styled from 'styled-components';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Spacer: React.FC<SpacerProps> = ({ size = 'sm' }) => {
  let s: number;
  switch (size) {
    case 'lg':
      s = 46;
      break;
    case 'xs':
      s = 4;
      break;
    case 'sm':
      s = 8;
      break;
    case 'md':
      s = 16;
      break;
    default:
      s = 24;
  }

  return <StyledSpacer size={s} />;
};

interface StyledSpacerProps {
  size: number;
}

const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export default Spacer;
