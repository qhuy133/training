import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { PopupContent } from '../../state/application/actions';
import { useRemovePopup } from '../../state/application/hooks';
import { screenUp } from '../../utils/styles';
import { ErrorPopup } from './ErrorPopup';
import { TransactionPopup } from './TransactionPopup';
import { WaitingPopup } from './WaitingPopup';

interface PopupItemProps {
  popupId: string;
  content: PopupContent;
  removeAfterMs: number | null;
}

export const PopupItem: React.FC<PopupItemProps> = ({ removeAfterMs, popupId, content }) => {
  const removePopup = useRemovePopup();
  const removeThisPopup = useCallback(() => removePopup(popupId), [popupId, removePopup]);
  useEffect(() => {
    if (removeAfterMs == null) return undefined;

    const timeout = setTimeout(() => {
      removeThisPopup();
    }, removeAfterMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeAfterMs, removeThisPopup]);

  let contentDiv = null;

  switch (content.type) {
    case 'waiting':
      contentDiv = <WaitingPopup {...content} />;
      break;
    case 'error':
      contentDiv = <ErrorPopup {...content} />;
      break;
    case 'transaction':
      contentDiv = <TransactionPopup {...content} />;
      break;
  }

  return (
    <StyledPopup>
      <StyledClose onClick={removeThisPopup}></StyledClose>
      {contentDiv}
    </StyledPopup>
  );
};

const StyledPopup = styled.div`
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
`;

const StyledClose = styled.button.attrs({
  children: <i className="fal fa-times" />,
})`
  position: absolute;
  right: 22px;
  top: 18px;
  padding: 0;
  opacity: 0.4;
  color: #ffffff;
  font-size: 18px;
  ${screenUp('md')`
    font-size: 16px;
  `}
`;
