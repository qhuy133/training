import React, { useCallback, useEffect } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ButtonConnect } from '../../Buttons';
import { InjectedConnector } from '@web3-react/injected-connector';
import styled from 'styled-components';
import { usePendingTransactionCount } from '../../../state/transactions/hooks';

import { NetworkConnector } from '../../../libs/NetworkConnector';
import { useSavedConnector } from '../../../state/user/hooks';
import { ConnectorName } from '../../../state/user/reducer';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { shortenAddress } from '../../../utils/addresses';
import useModal from '../../../hooks/useModal';
import AccountModal from '../../AccountModal/AccountModal';
import { screenUp } from '../../../utils/styles';
import { useToggleMainNav } from '../../../state/application/hooks';
import logo from '../../../assets/images/logo.svg';
import { NavBar } from './components/NavBar';
import { NavLink } from 'react-router-dom';
import avatar from '../../../assets/icons/avatar.svg';
import { supportedChainIds,  networkUrls, config} from '../../../config';
import { } from '../../../config';

const connectors: Record<ConnectorName, AbstractConnector> = {
  injected: new InjectedConnector({
    supportedChainIds,
  }),
  network: new NetworkConnector({
    urls: networkUrls,
    defaultChainId: config.defaultChainId,
  }),
};

const Header: React.FC = () => {
  const { account, activate } = useWeb3React<JsonRpcProvider>();
  const shortenAccount = shortenAddress(account || '');
  const [showAccountModal] = useModal(<AccountModal />);
  const savedConnector = useSavedConnector();
  const pendingTransactionCount = usePendingTransactionCount();
  const toggleMainNav = useToggleMainNav();

  useEffect(() => {
    if (!account && savedConnector && savedConnector === 'injected') {
      if (window.ethereum?.isMetaMask) {
        window.ethereum._metamask.isUnlocked().then((isUnlocked) => {
          if (isUnlocked) {
            activate(connectors[savedConnector], () => {
              return activate(connectors.network);
            });
          } else {
            activate(connectors.network, (e) => {
              console.error(e);
            });
            return;
          }
        });
        return;
      }

      activate(connectors[savedConnector], () => {
        return activate(connectors.network);
      });
      return;
    }

    if (!savedConnector && !account) {
      activate(connectors.network, (e) => {
        console.error(e);
      });
      return;
    }
  }, [account, activate, savedConnector]);

  const onToggleClick = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      toggleMainNav();
    },
    [toggleMainNav],
  );

  return (
    <StyledHeader>
      <ButtonToggleMenu className="far fa-bars" onClick={onToggleClick} />
      <NavBar />
      <RightSide>
        {account ? (
          <ButtonAccount onClick={showAccountModal}>
            <AccountInfo>
              {pendingTransactionCount > 0 ? (
                <>
                  <span>
                    &nbsp;
                    {pendingTransactionCount} Pending
                    {pendingTransactionCount > 1 ? 's' : ''}
                  </span>
                  <i className="far fa-circle-notch fa-spin" style={{ marginLeft: '5px' }} />
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="account-icon">
                    <img src={avatar} />
                  </div>
                  <span>{shortenAccount}</span>
                </div>
              )}
            </AccountInfo>
          </ButtonAccount>
        ) : (
          <ButtonConnectHeader height="40px" />
        )}
      </RightSide>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 21px;
  background: ${({ theme }) => theme.colors.header.background};
  ${screenUp('lg')`
    padding: 0 25px;
  `}
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  ${screenUp('lg')`
    width: 750px;
  `}
`;

const StyledTvl = styled.div`
  display: none;
  padding-left: 20px;
  font-size: 16px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.foreground};
  span {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.header.tvl};
  }
  ${screenUp('lg')`
    display: inline;
  `}
`;

const RightSide = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  ${screenUp('lg')`
    position: relative;
    z-index: 1000;
    width: 750px;
    justify-content: flex-end;
  `}
`;



const ButtonAccount = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  color: ${({ theme }) => theme.colors.secondary};
  height: 40px !important;
  display: flex;
  align-items: center;
  padding: 0px 10px 0px 0px;
  transition: ease-in-out 100ms;
  white-space: nowrap;
  border: 1px solid ${({ theme }) => theme.colors.header.border};
  &:hover {
    background-color: ${({ theme }) => theme.colors.header.avatarHover};
  }
`;

const AccountInfo = styled.div`
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.secondary};
  .account-icon {
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 39px;
    background-color: #5e74a5;
    img {
      width: 20px;
    }
  }
  i.far {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ButtonConnectHeader = styled(ButtonConnect)``;

const Logo = styled.img`
  width: 80px;
  ${screenUp('lg')`
    width: 100px;
  `}
`;

const ButtonToggleMenu = styled.i<{ isClose?: boolean }>`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 20px;
  margin-right: 12px;
  ${screenUp('lg')`
    display: none;
  `}
`;

export default Header;
