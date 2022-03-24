import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSetSlippageTolerance, useTrasactionSettings } from '../../state/application/hooks';
import { screenUp } from '../../utils/styles';

export const SlippageSetting: React.FC = () => {
  const settings = useTrasactionSettings();
  const setSlippage = useSetSlippageTolerance();

  const setPresetSlippage = useCallback(
    (ev: React.MouseEvent<HTMLInputElement>) => {
      const value = ev.currentTarget.dataset.value;
      setSlippage(+value);
    },
    [setSlippage],
  );

  return (
    <StyledContainer>
      <Button
        selected={settings.slippageTolerance === 0.005}
        onClick={setPresetSlippage}
        data-value="0.005"
      >
        0.5%
      </Button>
      <Button
        onClick={setPresetSlippage}
        data-value="0.01"
        selected={settings.slippageTolerance === 0.01}
      >
        1%
      </Button>
      <Button
        onClick={setPresetSlippage}
        data-value="0.02"
        selected={settings.slippageTolerance === 0.02}
      >
        2%
      </Button>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  /* border: solid 1px #2f384c; */
`;

const Button = styled.button<{ selected?: boolean }>`
  padding: 0;
  margin: 0;
  height: 30px;
  width: 54px;
  font-size: 14px;
  font-weight: normal;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.foreground : theme.colors.primary};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : 'transparent'};
  border-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.primary};
  border-style: solid;
  border-width: 1px;
  :nth-child(2) {
    border-width: 1px 0px;
  }
  ${screenUp('lg')`
    height: 32px;
    width: 60px;
    font-size: 16px;
  `}
`;
