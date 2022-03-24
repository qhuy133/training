import { nanoid } from '@reduxjs/toolkit';
import React, { useRef, ChangeEvent } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

export type ToggleProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange: (p: boolean) => void;
};

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  disabled,
  onChange: _onChange,
  children,
}) => {
  const id = useRef(nanoid());

  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      _onChange(ev.target?.checked);
    },
    [_onChange],
  );

  return (
    <StyledToggle>
      <input
        checked={checked}
        disabled={disabled}
        id={id.current}
        type="checkbox"
        onChange={onChange}
      />
      <StyledLabel htmlFor={id.current}>toggle</StyledLabel>
      <label htmlFor={id.current}>{children}</label>
    </StyledToggle>
  );
};

const StyledLabel = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 2em;
  height: 1em;
  display: inline-block;
  position: relative;
  font-size: 1.3em;

  &:before {
    content: '';
    width: 2em;
    height: 1em;
    top: 0;
    border-radius: 100px;
    background: #cecece;
    left: 0;
    position: absolute;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0.05em;
    left: 0.05em;
    width: 0.9em;
    height: 0.9em;
    border-radius: 0.5em;
    transition: 0.1s;
    background: #3085b1;
  }
`;

const StyledToggle = styled.span`
  display: flex;
  align-items: center;
  input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
    position: absolute;
  }

  input:checked + ${StyledLabel}:before {
    background: #03a062;
    opacity: 0.65;
  }

  input:checked + ${StyledLabel}:after {
    left: 100%;
    background: #fff;
    transform: translateX(-1em);
  }
`;
