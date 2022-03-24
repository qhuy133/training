import React from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { useIsMainNavOpen, useSetMainNavOpen } from '../../state/application/hooks';
import { screenUp } from '../../utils/styles';

export const MainWrapper: React.FC = ({ children }) => {
  const setMainNavOpen = useSetMainNavOpen();
  const isMainNavOpen = useIsMainNavOpen();

  const onClick = useCallback(() => {
    if (isMainNavOpen) {
      setMainNavOpen(false);
    }
  }, [isMainNavOpen, setMainNavOpen]);

  return (
    <StyledMain mainNavOpen={isMainNavOpen} onClick={onClick}>
      <StyledContainer>{children}</StyledContainer>
    </StyledMain>
  );
};

const StyledMain = styled.main<{ mainNavOpen: boolean }>`
  grid-area: main;
  position: relative;
  &::before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #0006;
    opacity: ${(p) => (p.mainNavOpen ? 1 : 0)};
    z-index: ${(p) => (p.mainNavOpen ? 998 : -1)};
    transition: all 0.2s linear;
  }

  ${screenUp('lg')`
    &::before {
      content: unset
    }
  `}
`;

const StyledContainer = styled.div`
  padding: 20px 15px;
  max-width: 1070px;
  margin: auto;
  ${screenUp('lg')`
    min-height: calc(100vh - 72px);
    padding: 80px 0 40px 0;
  `}
`;
