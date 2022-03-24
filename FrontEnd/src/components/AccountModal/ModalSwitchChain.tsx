import { useWeb3React } from '@web3-react/core';
import React from 'react';
import styled from 'styled-components';
import { ChainId, CHAINS, NETWORK_ICON, NETWORK_LABEL } from '../../utils/constants';
import Modal from '../Modal';
import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalProps,
  ModalTitle,
} from '../Modal/ModalStyles';

export type ModalSwitchChainProps = ModalProps;

export const ModalSwitchChain: React.FC<ModalSwitchChainProps> = ({ onDismiss }) => {
  const { chainId, library, account } = useWeb3React();

  if (!chainId) return null;

  return (
    <Modal size="sm">
      <StyledModalHeader>
        <ModalTitle>Select a Network</ModalTitle>
        <ModalCloseButton onClick={onDismiss} />
      </StyledModalHeader>
      <ModalContent>
        <Grid>
          {[ChainId.polygon].map((key: ChainId, i: number) => {
            if (chainId === key) {
              return (
                <StyledChainBtn className="cursor-pointer active" key={i}>
                  <img src={NETWORK_ICON[key]} alt="Switch Network" />
                  <div className="font-bold text-primary">{NETWORK_LABEL[key]}</div>
                </StyledChainBtn>
              );
            }
            return (
              <StyledChainBtn
                key={i}
                onClick={async () => {
                  const params = CHAINS[key];
                  library
                    ?.send('wallet_addEthereumChain', [params, account])
                    .then(() => {
                      window.location.href = '/';
                    })
                    .catch();
                  onDismiss();
                }}
                className="flex items-center w-full p-3 rounded cursor-pointer bg-dark-800 hover:bg-dark-700"
              >
                <img
                  src={NETWORK_ICON[key]}
                  alt="Switch Network"
                  className="w-8 h-8 mr-2 rounded-md"
                />
                <div className="font-bold text-primary">{NETWORK_LABEL[key]}</div>
              </StyledChainBtn>
            );
          })}
        </Grid>
      </ModalContent>
    </Modal>
  );
};

const StyledChainBtn = styled.button<{ noBorder?: boolean }>`
  padding: 11px 16px;
  position: relative;
  align-items: center;
  width: 100%;
  margin-left: 0;
  height: 64px;
  color: white;
  display: flex;
  justify-content: flex-start;
  border-style: solid;
  border-radius: 10px;
  border: solid 1px #2d3046;
  :hover {
    background-color: #2d3046;
  }
  :disabled {
    pointer-events: none;
    background: #303a58;
  }
  img {
    border-radius: 10px;
    width: 42px;
    height: 42px;
    margin-right: 10px;
  }
  .font-bold {
    font-style: bold;
  }
  transition: all 0.2s ease-in-out 0s;
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    border-radius: 10px;
    background-color: #151839;
    z-index: -1;
  }
  &.active {
    background-image: linear-gradient(
      94deg,
      #8800ec -6%,
      #fcae3c 38%,
      #f8b86a 63%,
      #e75dd9 108%
    );
    background-position-x: -2px;
    background-position-y: 0%;
    background-size: 220% 100%;
    z-index: 1;
    pointer-events: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  padding-bottom: 10px;
  align-items: end;
`;

const StyledModalHeader = styled(ModalHeader)`
  margin-bottom: 18px;
  padding: 26px 24px 24px 24px;
  background: linear-gradient(to left, #426dff 0%, #8e41ff 100%) left bottom #151839 no-repeat;
  background-size: 100% 2px;
  border-radius: 20px 20px 0px 0px;
`;
