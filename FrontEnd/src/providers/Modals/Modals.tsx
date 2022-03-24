/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { nanoid } from '@reduxjs/toolkit';
import React, { createContext, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useBodyClass } from '../../hooks/useBodyClass';
import { screenUp } from '../../utils/styles';

interface ModalsContext {
  content?: React.ReactNode;
  onPresent: (content: React.ReactNode, backdropClick?: boolean, id?: string) => string;
  onDismiss: (id: string) => void;
}

export const Context = createContext<ModalsContext>({
  onPresent: () => '',
  onDismiss: () => {},
});

interface ModalInfo {
  id: string;
  content?: React.ReactNode;
  backdropClick?: boolean;
}

const modalSetter =
  (info: ModalInfo) =>
  (state: ModalInfo[]): ModalInfo[] => {
    const existed = info.id && state.some((x) => x.id === info.id);
    if (!existed) {
      return [...state, info];
    }

    return state.map((item) => (item.id !== info.id ? item : info));
  };

const Modals: React.FC = ({ children }) => {
  const [modals, setModals] = useState<ModalInfo[]>([]);
  useBodyClass(modals.length > 0, 'no-scroll');

  const handlePresent = useCallback(
    (modalContent: React.ReactNode, backdropClick?: boolean, id?: string) => {
      id = id || nanoid();
      setModals(modalSetter({ id, content: modalContent, backdropClick }));
      return id;
    },
    [],
  );

  const handleDismiss = useCallback((id: string) => {
    setModals((data) => data.filter((t) => t.id !== id));
  }, []);

  const backdropClick = useCallback(() => {
    if (modals.length === 0) {
      return;
    }
    setModals((data) => data.slice(0, data.length - 1));
  }, [modals]);

  return (
    <Context.Provider
      value={{
        content: modals,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      {modals?.map((modal) => (
        <StyledModalWrapper key={modal.id}>
          <ModalContent>
            <StyledBackdrop onClick={modal.backdropClick ? backdropClick : undefined} />
            {React.isValidElement(modal.content) &&
              React.cloneElement(modal.content, {
                onDismiss: () => handleDismiss(modal.id),
              })}
          </ModalContent>
        </StyledModalWrapper>
      ))}
    </Context.Provider>
  );
};

const StyledModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 0px 0;
  min-height: 100vh;
  position: relative;
  ${screenUp('lg')`
    padding: 20px 20px;
  `}/* &::before {
    content: '';
    background-color: #00000088;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  } */
`;

const StyledBackdrop = styled.div`
  background-color: #00000088;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

export default Modals;
