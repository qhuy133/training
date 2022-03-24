import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { screenUp } from '../utils/styles';

export const StyledSwitch = styled.div<{ margin?: string }>`
  margin: ${({ margin }) => margin || '0px auto'};
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #1e274c;
  width: fit-content;
  padding: 4px;
`;

export const SwitchItem = styled(NavLink)`
  width: 90px;
  height: 34px;
  appearance: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ease-in-out 150ms;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: normal;
  color: #adafb4;
  &.active,
  &.matched {
    background-image: linear-gradient(92deg, #426dff 0%, #8e41ff 99%);
    color: #ffffff;
  }
  &:not(.active):hover {
    color: #ffffff;
  }
  ${screenUp('lg')`
    width: 120px;
    height: 42px;
    font-size: 16px;
  `}
`;
