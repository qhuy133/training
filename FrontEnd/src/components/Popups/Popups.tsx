import React from 'react';
import styled from 'styled-components';
import { useActivePopups } from '../../state/application/hooks';
import { screenUp } from '../../utils/styles';
import { PopupItem } from './PopupItem';

export const Popups: React.FC = () => {
  const popupItems = useActivePopups();

  return (
    <PopupWrapper>
      {popupItems.map((t) => (
        <PopupItem
          key={t.key}
          popupId={t.key}
          removeAfterMs={t.removeAfterMs}
          content={t.content}
        ></PopupItem>
      ))}
    </PopupWrapper>
  );
};

const PopupWrapper = styled.div`
  position: fixed;
  z-index: 1010;
  top: 0;
  width: 100%;
  max-width: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0px;

  ${screenUp('md')`
    top: 80px;
    right: 30px;
    max-width: 360px;
    transform: none;
    left: unset;
    bottom: unset;
    padding: 10px;
  `}
`;
