import styled from 'styled-components';
import { screenUp } from '../../utils/styles';

type ModalSize = 'xs' | 'sm' | 'md' | 'lg';
export interface ModalProps {
  onDismiss?: () => void;
  size?: ModalSize;
}

const getModalSize = (size: ModalSize = 'sm') => {
  switch (size) {
    case 'xs':
      return 450;
    case 'sm':
      return 500;
    case 'md':
      return 800;
    case 'lg':
      return 1140;
    default:
      return 300;
  }
};

export const Modal = styled.div<{ size?: ModalSize }>`
  margin: 0;
  width: 100%;
  max-width: ${(p) => getModalSize(p.size)}px;
  z-index: 1000;
  background-color: #fff;
  border-radius: 0;
  ${screenUp('lg')`
    margin: 0 auto;
  `}
`;

export const ModalContent = styled.div`
  margin: 0px 24px 24px;
  background-color: #e5e7ef;
  padding: 23px 19px 26px 19px;
  color: #070a10;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 24px 24px 24px;
`;

export const ModalFooter = styled.div`
  padding: 0px 24px 35px 24px;
`;

export const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #070a10;
`;

export const ModalCloseButton = styled.button.attrs({
  children: <i className="fal fa-times" />,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  order: 9;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1.2rem;
  margin-left: auto;
  width: 24px;
  height: 24px;
  border: 1px solid #acb7d0;
  i {
    color: #acb7d0;
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    i {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export default Modal;
