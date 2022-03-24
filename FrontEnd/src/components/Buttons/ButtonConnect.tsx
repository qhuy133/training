import React from 'react';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import { Button } from './Button';
import { ModalSelectWallet } from '../AccountModal/ModalSelectWallet';

const ButtonConnect: React.FC<{ block?: boolean; height?: string }> = ({ block, height }) => {
  const [connect] = useModal(<ModalSelectWallet />);

  return (
    <StyledButtonConnect block={block} size="md" height={height} onClick={connect}>
      <i className="far fa-wallet"></i>
      Connect
    </StyledButtonConnect>
  );
};

export default ButtonConnect;

const StyledButtonConnect = styled(Button)<{ height?: string }>`
  height: ${(props) => props.height || '36px'} !important;
  width: auto !important;
  white-space: nowrap;
  i {
    margin-right: 5px;
  }
`;
