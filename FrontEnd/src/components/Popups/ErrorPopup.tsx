import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ErrorIcon } from '../../assets/icons/icon-tx-error.svg';

export type ErrorPopupProps = {
  title: string;
  message: string;
};

export const ErrorPopup: React.FC<ErrorPopupProps> = ({ title, message }) => {
  return (
    <Container>
      <StyledIcon>
        <ErrorIcon />
      </StyledIcon>
      <div>
        <Title>{title}</Title>
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
  border: solid 1px #fb6161;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #fb6161;
  padding-bottom: 6px;
`;

const Message = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: #ffffff;
  line-height: 1.6;
`;

const StyledIcon = styled.div`
  margin-right: 10px;
  flex-shrink: 0;
`;
