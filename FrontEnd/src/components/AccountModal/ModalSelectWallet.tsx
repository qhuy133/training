import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { config, networkUrls, supportedChainIds } from '../../config';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { useAddPopup } from '../../state/application/hooks';
import Modal, {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '../Modal/ModalStyles';
import MetamaskLogo from '../../assets/images/wallets/Metamask.png';
import WalletConnectLogo from '../../assets/images/wallets/WalletConnect.png';
import TrustWalletLogo from '../../assets/images/wallets/TrustWallet.svg';
import MathWalletLogo from '../../assets/images/wallets/MathWallet.svg';
import safeWalletLogo from '../../assets/images/wallets/SafeWallet.svg';
import TokenPocketLogo from '../../assets/images/wallets/TokenPocker.svg';
import { useDispatch } from 'react-redux';
import { connectToAccount } from '../../state/user/actions';
import { ConnectorName } from '../../state/user/reducer';
import { CHAINS } from '../../utils/constants';

export type ModalSelectWalletProps = {
  onDismiss?: () => void;
};

const connectors = {
  injected: new InjectedConnector({
    supportedChainIds,
  }),
  walletconnect: new WalletConnectConnector({
    supportedChainIds,
    rpc: networkUrls,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
  }),
  default: new NetworkConnector({
    urls: networkUrls,
    defaultChainId: config.defaultChainId,
  }),
};

export const ModalSelectWallet: React.FC<ModalSelectWalletProps> = ({ onDismiss }) => {
  const isConnecting = useRef<boolean>();
  const { account, activate } = useWeb3React();
  const dispatch = useDispatch();
  const addPopup = useAddPopup();
  const [selectedConnector, setSelectedConnector] = useState<ConnectorName>();

  useEffect(() => {
    if (isConnecting.current && account) {
      dispatch(connectToAccount({ account, connector: selectedConnector }));
      isConnecting.current = false;
    }
  }, [account, dispatch, selectedConnector]);

  const connect = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      const connectorName = ev.currentTarget.dataset.connectorName as ConnectorName;
      setSelectedConnector(connectorName);
      isConnecting.current = true;
      const connector = connectors[connectorName];
      activate(connector, (e) => {
        throw e;
      })
        .then(() => {
          onDismiss();
        })
        .catch(async (e) => {
          isConnecting.current = false;
          setSelectedConnector(null);
          if (e instanceof UnsupportedChainIdError) {
            addPopup({
              type: 'error',
              title: 'Unsupported network',
              message: 'Please connect to Polygon network',
            });
            const params = CHAINS[0x89];
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [params],
            });
            window.location.href = '/';
          } else if (e.message === 'The user rejected the request.') {
            addPopup({
              type: 'error',
              title: 'Connect error',
              message: 'Please accept the connection request',
            });
          } else {
            addPopup({
              type: 'error',
              title: 'Connect error',
              message: e.message,
            });
          }

          console.warn(e);
        });
    },
    [activate, addPopup, onDismiss],
  );

  return (
    <Modal size="xs">
      <ModalHeader>
        <ModalTitle>Connect wallet</ModalTitle>
        <ModalCloseButton onClick={onDismiss} />
      </ModalHeader>
      <StyledModalContent>
        <StyledWallet data-connector-name="injected" onClick={connect}>
          MetaMask
          <img src={MetamaskLogo} />
        </StyledWallet>
        {/* <StyledWallet data-connector-name="walletconnect" onClick={connect}>
          Wallet Connect
          <img src={WalletConnectLogo} />
        </StyledWallet>
        <StyledWallet data-connector-name="injected" onClick={connect}>
          Math Wallet
          <img src={MathWalletLogo} />
        </StyledWallet>
        <StyledWallet data-connector-name="injected" onClick={connect}>
          Trust Wallet
          <img src={TrustWalletLogo} />
        </StyledWallet>
        <StyledWallet data-connector-name="injected" onClick={connect}>
          Token Pocket
          <img src={TokenPocketLogo} />
        </StyledWallet>
        <StyledWallet data-connector-name="injected" onClick={connect}>
          Safe Wallet
          <img src={safeWalletLogo} />
        </StyledWallet> */}
      </StyledModalContent>
    </Modal>
  );
};

const StyledModalContent = styled(ModalContent)`
  padding: 0px 24px;
`;

const StyledWallet = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.5s ease-in-out 0s;
  font-size: 16px;
  font-weight: normal;
  color: #070a10;
  padding: 18px 0px;
  border-bottom: 1px dashed #acb7d0;
  img {
    width: 32px;
    height: 32px;
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;
