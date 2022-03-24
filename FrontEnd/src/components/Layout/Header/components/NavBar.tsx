import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useBodyClass } from '../../../../hooks/useBodyClass';
import { useIsMainNavOpen, useSetMainNavOpen } from '../../../../state/application/hooks';
import { ExternalLinks } from '../../../../utils/constants';
import { screenUp } from '../../../../utils/styles';
import ButtonMore from './ButtonMore';
import logo from '../../../../assets/images/logo.svg';
import logoReward from '../../../../assets/images/logo.png';
import { useTokenPrice } from '../../../../state/tokens/hooks';
import { BigNumberValue } from '../../../BigNumberValue';
import metamask from '../../../../assets/images/metamask.png';
import { useAddTokenMetamask } from '../../../../hooks/useAddTokenToMetamask';
import Modal1Swap from '../../../Modal1Swap';
import useModal from '../../../../hooks/useModal';

export const NavBar: React.FC = () => {
  const isOpen = useIsMainNavOpen();
  const setMainNavOpen = useSetMainNavOpen();
  useBodyClass(isOpen, 'no-scroll');
  const rewardPrice = useTokenPrice('1SWAP');
  const addToken = useAddTokenMetamask();
  const [show1SwapModal] = useModal(<Modal1Swap />);

  const onClickItem = useCallback(() => {
    if (isOpen) {
      setMainNavOpen(false);
    }
  }, [isOpen, setMainNavOpen]);

  const onAddToken = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      addToken('1SWAP');
    },
    [addToken],
  );

  return (
    <StyledContainer open={isOpen}>
      <StyledPrice onClick={show1SwapModal}>
        <div className="logo">
          <img src={logoReward} />
        </div>
        <span>
          <BigNumberValue value={rewardPrice} decimals={18} fractionDigits={6} currency="USD" />
        </span>
        <button className="metamask" onClick={onAddToken}>
          <img src={metamask} />
        </button>
      </StyledPrice>
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ open?: boolean }>`
  position: fixed;
  margin: 0;
  padding: 21px;
  top: 0;
  left: 0;
  right: 0;
  width: 90%;
  height: 100%;
  justify-content: center;
  transform: ${(p) => (p.open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.2s linear;
  z-index: 999;
  background: #16415c;
  ${screenUp('lg')`
    position: inherit;
    z-index: 1;
    height: fit-content;
    transform: none;
    background-color: transparent;
  `}
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${screenUp('lg')`
    display: none;
  `}
`;

const StyledLogoNavLink = styled(NavLink)`
  img {
    width: 80px;
  }
`;

const StyledButtonClose = styled.button`
  i {
    color: ${(props) => props.theme.colors.foreground};
    font-size: 20px;
  }
`;

const StyledPrice = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  height: 40px !important;
  border: 1px solid ${({ theme }) => theme.colors.header.border};
  cursor: default;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 38px;
    background-color: ${({ theme }) => theme.colors.header.price};
    img {
      height: 30px;
    }
  }
  .metamask {
    margin: 0 6px 0 auto;
    img {
      width: 18px;
    }
  }
  span {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }
  ${screenUp('lg')`
    display: none;
  `}
`;

const StyledLinkBuy = styled.a`
  margin-top: 14px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3085b1;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  i {
    margin-right: 12px;
  }
  ${screenUp('lg')`
    display: none;
  `}
`;

const StyledNav = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  ${screenUp('lg')`
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `}
`;

const StyledNavItem = styled.li`
  margin: 0;
  padding: 10px 0;
  /* text-align: center; */
  &.disabled {
    pointer-events: none;
    a {
      opacity: 0.5;
    }
  }
  ${screenUp('lg')`
     padding: 0;
     text-align: left;
  `}
`;

const StyledNavLink = styled(NavLink)`
  font-size: 18px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.secondary};
  &:hover {
    color: ${(props) => props.theme.colors.foreground};
  }
  &.active {
    color: ${(props) => props.theme.colors.foreground};
  }
  ${screenUp('lg')`
    font-weight: normal;
    margin: 0 20px;
    font-size: 16px;
    &.active {
      font-weight: bold;
    }
  `}
`;

const StyledNavExternalLink = styled.a`
  margin: 0 0 18px 0;
  font-size: 18px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.secondary};
  ${screenUp('lg')`
    display: none;
  `}
`;

const StyledLine = styled.div`
  margin: 20px 0px;
  width: 100%;
  height: 1px;
  background: rgba(172, 183, 208, 0.3);
  ${screenUp('lg')`
    display: none;
  `}
`;
