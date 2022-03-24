import React, { useCallback } from 'react';
import styled from 'styled-components';

export type CheckboxProps = {
  active?: boolean;
  value?: string | number;
  text: string;
  onClick: (value?: string | number) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ text, value, active, onClick }) => {
  const onCheckboxClick = useCallback(() => {
    onClick(value);
  }, [onClick, value]);

  return (
    <StyledContainer onClick={onCheckboxClick}>
      <StyledCheckbox active={active} />
      {text}
    </StyledContainer>
  );
};

const StyledContainer = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0px;
  margin: 4px 0px;
  text-align: left;
  color: #ffffff;
`;

const StyledCheckbox = styled.div<{ active?: boolean }>`
  position: relative;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 100%;
  border: 1px solid ${({ active }) => (active ? '#ff8b00' : '#afb1b9')};
  ::after {
    content: '';
    width: 8px;
    height: 8px;
    position: absolute;
    background: ${({ active }) => (active ? '#ff8b00' : 'transparent')};
    border-radius: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
