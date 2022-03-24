import React, { ReactText } from 'react';
import DAILogo from '../assets/tokens/DAI.png';
import USDCLogo from '../assets/tokens/USDC.png';
import USDTLogo from '../assets/tokens/USDT.png';
import WETHLogo from '../assets/tokens/ETH.png';
import WBTCLogo from '../assets/tokens/BTC.png';
import MOVRLogo from '../assets/tokens/MOVR.png';
import BUSDLogo from '../assets/tokens/BUSD.png';
import IS3USDLogo from '../assets/tokens/1S3P.png';
import IS3USD_LP from '../assets/tokens/1S3P_LP.png';
import BUSD_1S3P from '../assets/tokens/BUSD-1S3P.png';
import SWAP_MOVR_LP from '../assets/tokens/1SWAP_MOVR_LP.png';
import MIM from '../assets/tokens/MIM.svg';
import MIM_1S3P from '../assets/tokens/MIM-1S3P.png';
import DAIELogo from '../assets/tokens/DAIE.png';
import USDCELogo from '../assets/tokens/USDCE.png';
import USDTELogo from '../assets/tokens/USDTE.png';
import AVAXUSD_1S3P from '../assets/tokens/AVAXUSD-1S3P.png';
import anyFRAX from '../assets/tokens/anyFRAX.png';
import anyFRAX_1S3P from '../assets/tokens/anyFRAX-1S3P.png';
import USDCMLogo from '../assets/tokens/USDCM.png';
import USDTMLogo from '../assets/tokens/USDTM.png';
import WANUSD_1S3P from '../assets/tokens/WANUSD-1S3P.png';
import FRAX from '../assets/tokens/FRAX.png';
import FRAX_1S3P from '../assets/tokens/FRAX-1S3P.png';
import MAI from '../assets/tokens/MAI.png';
import MAI_1S3P from '../assets/tokens/MAI-1S3P.png';

import SWAP from '../assets/tokens/1SWAP.png';

export type TokenSymbolProps = {
  symbol: string;
  size?: ReactText;
  autoHeight?: boolean;
};

const logosBySymbol: { [title: string]: string } = {
  DAI: DAILogo,
  USDC: USDCLogo,
  USDT: USDTLogo,
  WETH: WETHLogo,
  WBTC: WBTCLogo,
  BUSD: BUSDLogo,
  '1S3P': IS3USDLogo,
  'BUSD-1S3P': BUSD_1S3P,
  '1SWAP_MOVR_LP': SWAP_MOVR_LP,
  '1SWAP': SWAP,
  MOVR: MOVRLogo,
  MIM: MIM,
  'MIM-1S3P': MIM_1S3P,
  'DAI.E': DAIELogo,
  'USDC.E': USDCELogo,
  'USDT.E': USDTELogo,
  'AVAXUSD-1S3P': AVAXUSD_1S3P,
  'USDC.M': USDCMLogo,
  'USDT.M': USDTMLogo,
  'WANUSD-1S3P': WANUSD_1S3P,
  '1S3P_LP': IS3USD_LP,
  ANYFRAX: anyFRAX,
  'ANYFRAX-1S3P': anyFRAX_1S3P,
  FRAX: FRAX,
  'FRAX-1S3P': FRAX_1S3P,
  MAI: MAI,
  'MAI-1S3P': MAI_1S3P,
};

export const TokenSymbol: React.FC<TokenSymbolProps> = ({
  symbol,
  size = 32,
  autoHeight = false,
}) => {
  if (!symbol) {
    return <></>;
  }
  return (
    <img
      className="token-symbol"
      src={logosBySymbol[symbol.toUpperCase()] || logosBySymbol.DEFAULT}
      alt={`${symbol} Logo`}
      width={size}
      height={autoHeight ? 'auto' : size}
    />
  );
};
