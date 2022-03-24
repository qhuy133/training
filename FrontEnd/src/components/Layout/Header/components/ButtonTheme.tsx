import React from 'react';
import styled from 'styled-components';
import { useToggleTheme } from '../../../../state/application/hooks';

const ButtonTheme: React.FC = () => {
  const { theme, toggle } = useToggleTheme();

  return (
    <StyledContainer onClick={toggle}>
      <i className={theme === 'dark' ? 'fal fa-lightbulb-slash' : 'fal fa-lightbulb-on'}></i>
    </StyledContainer>
  );
};

const StyledContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.header.border};
  i {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default ButtonTheme;
