import React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useGetTransaction } from '../../state/transactions/hooks';
import { ReactComponent as CheckMark } from '../../assets/icons/icon-tx-check.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/icon-tx-error.svg';
import { getExplorerUrl } from '../../config';
import { useWeb3React } from '@web3-react/core';

export type TransactionPopupProps = {
  hash: string;
};

export const TransactionPopup: React.FC<TransactionPopupProps> = ({ hash }) => {
  const { chainId } = useWeb3React();
  const transaction = useGetTransaction(hash);

  const url = useMemo(() => {
    return [getExplorerUrl(chainId), 'tx', transaction?.hash].join('/');
  }, [chainId, transaction?.hash]);

  const status = useMemo(() => {
    if (!transaction) {
      return 'error';
    }
    if (transaction && !transaction.receipt) {
      return 'submitted';
    }

    if (transaction.receipt && transaction.receipt.status === 1) {
      // add lending error report logic
      return 'success';
    }

    return 'error';
  }, [transaction]);

  return (
    <Container target="_blank" href={url} status={status}>
      <StyledIcon>
        {status === 'success' ? (
          <CheckMark />
        ) : status === 'submitted' ? (
          <i className="fal fa-circle-notch fa-spin"></i>
        ) : (
          <ErrorIcon />
        )}
      </StyledIcon>
      <div>
        {status === 'submitted' ? (
          <Title status={status}>Pending</Title>
        ) : status === 'success' ? (
          <Title status={status}>Successful</Title>
        ) : (
          <Title status={status}>Failed</Title>
        )}
        <Message>{transaction?.summary}</Message>
      </div>
    </Container>
  );
};

const Colors = {
  success: '#03a062',
  error: '#fb6161',
  submitted: '#ff985c',
};

const BorderColors = {
  success: '#03a062',
  error: '#fb6161',
  submitted: '#ff985c',
};

const Container = styled.a<{ status: 'success' | 'error' | 'submitted' }>`
  display: flex;
  align-items: center;
  padding: 18px 15px;
  background-color: #143c56;
  border-radius: 3px;
  border: solid 1px ${(p) => (p.status ? BorderColors[p.status] : '#ffffff')};
  color: #ffffff;
`;

const Title = styled.div<{ status: 'success' | 'error' | 'submitted' }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(p) => (p.status ? Colors[p.status] : '#ffffff')};
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
