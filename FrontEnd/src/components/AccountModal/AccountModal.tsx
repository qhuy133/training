import React, { useCallback } from 'react';
import Modal, {
  ModalCloseButton,
  ModalHeader,
  ModalProps,
  ModalTitle,
} from '../Modal/ModalStyles';
import { useWeb3React } from '@web3-react/core';
import { useDisconnectAccount } from '../../state/user/hooks';
import styled from 'styled-components';
import { shortenAddress } from '../../utils/addresses';
import { ExplorerLink } from '../ExplorerLink';
import avatar from '../../assets/icons/avatar.svg';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, deactivate } = useWeb3React();
  const shortAccount = shortenAddress(account);
  const disconnectAccount = useDisconnectAccount();

  const disconnect = useCallback(() => {
    deactivate();
    disconnectAccount();
    onDismiss && onDismiss();
  }, [deactivate, disconnectAccount, onDismiss]);

  return (
    <Modal size="xs">
      <ModalHeader>
        <ModalTitle>Account</ModalTitle>
        <ModalCloseButton onClick={onDismiss} />
      </ModalHeader>
      <StyledAccountInfo>
        <div className="icon">
          <img src={avatar} />
        </div>
        <div className="account">{shortAccount}</div>
        <ExplorerLink address={account}>
          View account&nbsp;
          <i className="far fa-external-link"></i>
        </ExplorerLink>
      </StyledAccountInfo>
      <StyledAction>
        <StyledDisconnect onClick={disconnect}>Disconnect</StyledDisconnect>
      </StyledAction>
    </Modal>
  );
};

const StyledAccountInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 24px 18px 24px;
  padding-bottom: 18px;
  border-bottom: solid 1px #acb7d0;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 37px;
    height: 37px;
    border-radius: 7px;
    background-color: #32659b;
    img {
      width: 20px;
    }
  }
  .account {
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #070a10;
  }
  a {
    margin-left: auto;
    font-size: 14px;
    font-weight: bold;
    color: #3085b1;
    :hover {
      text-decoration: underline;
    }
  }
`;

const StyledAction = styled.div`
  margin: 0px 24px 24px 24px;
  display: flex;
`;

const StyledDisconnect = styled.button`
  margin-left: auto;
  height: 36px;
  border: solid 1px #cecece;
  font-size: 14px;
  font-weight: bold;
  color: #3085b1;
  padding: 0px 10px;
  :hover {
    color: #3085b1;
    border: solid 1px #3085b1;
    background-color: #3085b1;
    color: #fff;
  }
`;

export default AccountModal;
