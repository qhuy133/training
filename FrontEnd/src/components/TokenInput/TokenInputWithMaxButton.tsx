import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import React, { useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import { TokenSymbol } from '../TokenSymbol';
import { TokenInput } from './TokenInput';
import { Dropdown, DropdownMenu, DropdownToggle } from '../Dropdown';
import { screenUp } from '../../utils/styles';

type Size = 'md' | 'lg';

const FontSize = {
  md: '24px',
  lg: '32px',
};

const LogoSize = {
  md: '24px',
  lg: '32px',
};

const BorderRadius = {
  md: '3px',
  lg: '3px',
};

const Padding = {
  md: '10px 16px',
  lg: '12px 16px',
};

const ButtonMaxPadding = {
  md: '0px 10px;',
  lg: '0px 12px',
};

const ButtonMaxHeight = {
  md: '24px',
  lg: '32px',
};

export type TokenInputWithMaxButtonProps = {
  value: BigNumber | undefined;
  maxValue?: BigNumber;
  maxValidateValue?: BigNumber;
  decimals: number;
  symbol?: string;
  onChange?: (v: BigNumber) => void;
  size?: Size;
  width?: string;
  disabled?: boolean;
  showSymbol?: boolean;
  steps?: {
    ratio: number;
    label?: string;
  }[];
  buttonMaxTitle?: string;
  buttonMaxWidth?: string;
  skipCheckZero?: boolean;
  inValid?: boolean;
  hideMaxButton?: boolean;
  background?: string;
};

export const TokenInputWithMaxButton: React.FC<TokenInputWithMaxButtonProps> = ({
  value,
  maxValue,
  maxValidateValue,
  decimals,
  onChange,
  disabled,
  size = 'md',
  symbol,
  showSymbol,
  steps,
  buttonMaxTitle,
  buttonMaxWidth,
  skipCheckZero,
  inValid,
  hideMaxButton,
  background,
}) => {
  const { account } = useWeb3React();
  const [focus, setFocus] = useState(false);

  const isShowMaxButton = useMemo(() => {
    return (
      !hideMaxButton && !disabled && account && !value && (skipCheckZero || maxValue?.gt(Zero))
    );
  }, [account, disabled, hideMaxButton, maxValue, skipCheckZero, value]);

  const isInvalid = useMemo(() => {
    if (disabled) return false;
    if (inValid) {
      return true;
    }
    const max = maxValidateValue ? maxValidateValue : maxValue;
    return value && max && value.gt(max);
  }, [disabled, inValid, maxValidateValue, maxValue, value]);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const onSelectRatio = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const ratio = +ev.currentTarget.dataset.ratio;
      if (ratio && maxValue && onChange) {
        const value = maxValue.mul(ratio).div(100);
        onChange(value);
      }
    },
    [maxValue, onChange],
  );

  const setMax = useCallback(() => {
    if (!onChange) return;
    onChange(maxValue);
  }, [maxValue, onChange]);

  return (
    <TokenInputContainer
      focused={focus}
      invalid={isInvalid}
      disabled={disabled}
      size={size}
      buttonMaxWidth={buttonMaxWidth}
      background={background}
    >
      {showSymbol && (
        <div className="logo">
          <TokenSymbol symbol={symbol} size={LogoSize[size]} />
        </div>
      )}
      <TokenInput
        decimals={decimals}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      {isShowMaxButton ? (
        steps ? (
          <div className="dropdown">
            <Dropdown>
              <DropdownToggle>
                <button>MAX</button>
              </DropdownToggle>
              <DropdownMenu
                position="right"
                minWidth="fit-content"
                padding="10px 20px"
                borderColor="#452288"
              >
                {steps?.map((step, index) => (
                  <StyleDropdownItem
                    data-ratio={step.ratio}
                    key={index}
                    onClick={onSelectRatio}
                  >
                    <div>{step.label ? step.label : step.ratio}</div>
                  </StyleDropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : (
          <button onClick={setMax}>{buttonMaxTitle || 'Max'}</button>
        )
      ) : null}
    </TokenInputContainer>
  );
};

const TokenInputContainer = styled.div<{
  focused: boolean;
  invalid: boolean;
  disabled?: boolean;
  size?: Size;
  buttonMaxWidth?: string;
  background?: string;
}>`
  display: flex;
  width: 100%;
  padding: ${(p) => Padding[p.size || 'lg']};
  border-radius: ${(p) => BorderRadius[p.size || 'lg']};
  background-color: ${({ background }) => background || '#e5e7ef'};
  .logo {
    display: flex;
    align-self: center;
    justify-content: center;
    margin-right: 10px;
  }
  input {
    width: 100%;
    background: transparent;
    border: none;
    font-size: ${(p) => FontSize[p.size || 'lg']};
    font-weight: bold;
    color: ${({ invalid, disabled, theme }) =>
      !invalid ? (disabled ? theme.colors.primary : '#070a10') : '#ff6565'};
    line-height: 1;
    :disabled {
      color: #3085b1;
    }
  }
  .dropdown {
    display: flex;
    align-items: center;
  }
  button {
    align-self: center;
    margin-left: 4px;
    padding: ${(p) => ButtonMaxPadding[p.size || 'lg']};
    height: ${(p) => ButtonMaxHeight[p.size || 'lg']};
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid #6ca4c5;
    opacity: 0.7;
    transition: all 0.2s ease-in-out 0s;
    :hover {
      opacity: 1;
      border: 1px solid ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
    }
    width: ${({ buttonMaxWidth }) => buttonMaxWidth || 'fit-content'};
  }
  ${screenUp('lg')`
    button {
      font-size: 14px;
    }
  `}
`;

const StyleDropdownItem = styled.div`
  cursor: pointer;
  padding-top: 5px;
  :not(:last-child) {
    padding-bottom: 5px;
  }
  :hover {
    color: #ffffff;
  }
`;
