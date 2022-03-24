import { useWeb3React } from '@web3-react/core';
import React from 'react';
import styled from 'styled-components';
import { Button, Size } from './Button';
import { ButtonConnect } from '.';
import { useApprove } from '../../hooks/useApprove';

export type ButtonApproveProps = {
  symbol: string;
  spender: string;
  size?: Size;
};

export const ButtonApprove: React.FC<ButtonApproveProps> = ({ symbol, spender, size }) => {
  const { account } = useWeb3React();
  const { approve, loadingSubmit } = useApprove(symbol, spender);

  return !account ? (
    <ButtonConnect />
  ) : (
    <StyledButtonApprove
      className={loadingSubmit ? 'btn-loading' : ''}
      size={size}
      onClick={approve}
      disabled={loadingSubmit}
    >
      Approve
    </StyledButtonApprove>
  );
};

const StyledButtonApprove = styled(Button)``;
