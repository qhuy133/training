import 'styled-components';

declare module 'styled-components' {
  interface DefaultTheme {
    colors: {
      background: string;
      foreground: string;
      success: string;
      secondary: string;
      danger: string;
      primary: string;
      text: {
        primary: string;
        secondary: string;
      };
      header: {
        background: string;
        border: string;
        avatar: string;
        avatarHover: string;
        price: string;
        tvl: string;
      };
      button: {
        disable: string;
      };
    };
  }
}
