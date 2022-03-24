import React, { ReactNode, useContext } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { DropdownContext } from './Dropdown';

export type DropdownMenuProps = {
  position?: 'right' | 'left';
  direction?: 'up' | 'down';
  children: ReactNode;
  disableAutoClose?: boolean;
  minWidth?: string;
  padding?: string;
  borderColor?: string;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  disableAutoClose,
  minWidth,
  padding,
  borderColor,
  ...props
}) => {
  const { isOpen, toggle } = useContext(DropdownContext);

  const onClick = useCallback(() => {
    if (!disableAutoClose) {
      toggle();
    }
  }, [toggle, disableAutoClose]);

  return (
    <StyledDropdownMenu
      isOpen={isOpen}
      minWidth={minWidth}
      padding={padding}
      borderColor={borderColor}
      {...props}
      onClick={onClick}
    >
      {children}
    </StyledDropdownMenu>
  );
};

const StyledDropdownMenu = styled.div<
  Omit<DropdownMenuProps, 'children'> & { isOpen: boolean }
>`
  position: absolute;
  margin-top: 1px;
  ${(p) => (p.direction === 'up' ? 'bottom: 100%' : 'top: 100%')};
  ${(p) => (p.position === 'right' ? 'right: 0' : 'left: 0')};
  z-index: ${({ isOpen }) => (isOpen ? 100 : -1)};
  min-width: ${({ minWidth }) => minWidth || '240px'};
  opacity: ${(p) => (p.isOpen ? 1 : 0)};
  transform: scaleY(${(p) => (p.isOpen ? '100%' : '0%')});
  transition: all 0.2s linear;
  transform-origin: top;
  border-radius: 0px;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.19);
  background: #ffffff;
  border: 1px solid ${({ borderColor }) => borderColor || 'transparent'};
  padding: ${({ padding }) => padding || '18px 19px 13px'};
`;
