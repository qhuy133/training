import styled from 'styled-components';

export type Size = 'sm' | 'md' | 'lg';

const Heights: Record<Size, number> = {
  sm: 32,
  md: 42,
  lg: 56,
};

const BorderRadius = {
  sm: '0px',
  md: '0px',
  lg: '0px',
};

const FontSize = {
  sm: '14px',
  md: '16px',
  lg: '20px',
};

const FontWeight = {
  sm: 'bold',
  md: 'bold',
  lg: 'bold',
};

export const ButtonOutline = styled.button<{
  error?: boolean;
  size?: Size;
  block?: boolean;
}>`
  position: relative;
  z-index: 1;
  padding: 5px 20px;
  font-size: ${(p) => FontSize[p.size || 'lg']};
  border-radius: ${(p) => BorderRadius[p.size || 'lg']};
  font-weight: ${(p) => FontWeight[p.size || 'lg']};
  color: ${({ theme }) => theme.colors.primary};
  display: ${(p) => (p.block ? 'flex' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  height: ${(p) => Heights[p.size || 'lg']}px;
  border: solid 1px ${({ theme }) => theme.colors.primary};
  i,
  img {
    margin-right: 8px;
    margin-bottom: 1px;
  }
  :not(:disabled) {
    :hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.foreground};
    }
  }
  :disabled {
    pointer-events: none;
    color: #555a71;
    border: 1px solid
      ${({ error, theme }) => (error ? theme.colors.danger : theme.colors.button.disable)};
  }
`;

export const Button = styled.button<{
  error?: boolean;
  size?: Size;
  block?: boolean;
}>`
  padding: 0 16px;
  font-size: ${(p) => FontSize[p.size || 'lg']};
  border-radius: ${(p) => BorderRadius[p.size || 'lg']};
  font-weight: ${(p) => FontWeight[p.size || 'lg']};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1;
  display: ${(p) => (p.block ? 'flex' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  height: ${(p) => Heights[p.size || 'lg']}px;
  width: ${(p) => (p.block ? '100%' : '')};
  background-color: ${({ theme }) => theme.colors.primary};
  i,
  img {
    margin-right: 8px;
    margin-bottom: 1px;
  }
  :not(:disabled) {
    :hover {
    }
  }
  :disabled {
    pointer-events: none;
    color: ${({ error, theme }) => (error ? theme.colors.danger : '#555a71')};
    background: ${({ theme }) => theme.colors.button.disable};
  }
`;
