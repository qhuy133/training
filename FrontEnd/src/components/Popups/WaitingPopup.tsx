import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PendingIcon } from '../../assets/icons/icon-tx-pending.svg';

export type WaitingProps = {
  message: string;
  title?: string;
};

export const WaitingPopup: React.FC<WaitingProps> = ({ message, title }) => {
  return (
    <Container>
      <StyledIcon>
        <PendingIcon />
      </StyledIcon>
      <div>
        {title ? <Title>{title}</Title> : null}
        <Message>{message}</Message>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 15px;
  background-color: #143c56;
  border-radius: 3px;
  border: solid 1px #ff985c;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ff985c;
  padding-bottom: 6px;
`;

const Message = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: #ffffff;
  line-height: 1.6;
`;

const StyledIcon = styled.div`
  margin-right: 15px;
  flex-shrink: 0;
  font-size: 1.2rem;
`;
