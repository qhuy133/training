import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.foreground};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom center;
    min-height: 100vh;
  }

  button {
    font-family: inherit;
    border: none;
    background: transparent;

    &:not(:disabled) {
      cursor: pointer;
    }

    &:focus,
    &:active {
      outline: none;
    }

    :disabled {
      pointer-events: none;
    }
  }

  input {
    font-family: inherit;

    &:focus {
      outline: none;
    }
  }

  a, a:visited {
    text-decoration: none;
  }

  h1, h2, h3, h4, h5 {
    margin: 0;
  }

  ul, ol {
    list-style: none;
  }

  .custom-tooltip {
    max-width: 80%
  }

  .no-scroll {
    overflow: hidden;
  }

  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }

  @keyframes dots {
    0% {
      content: '.'
    }
    20% {
      content: '.'
    }
    40% {
      content: '..'
    }
    60% {
      content: '...'
    }
    90% {
      content: ''
    }
    100% {
      content: ''
    }
  }

  .btn-loading {
    &:after {
      content: ' ';
      text-align: left;
      width: 1rem;
      animation: dots 1.4s linear infinite;
      display: inline-block;
    }
  }

  span.highlight {
    color: ${(props) => props.theme.colors.success} !important;
  }
`;
