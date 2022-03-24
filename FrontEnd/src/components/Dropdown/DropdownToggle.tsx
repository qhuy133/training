import React, { useContext } from 'react';
import { DropdownContext } from './Dropdown';
import cx from 'classnames';

export type DropdownToggleProps = {
  children: React.ReactElement;
};

export const DropdownToggle: React.FC<DropdownToggleProps> = ({ children }) => {
  const { toggle, isOpen } = useContext(DropdownContext);

  return React.cloneElement(children, {
    className: cx(children.props.className, { open: isOpen }),
    onClick: toggle,
  });
};
