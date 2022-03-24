import { parseUnits } from '@ethersproject/units';

export const ExternalLinks = {
  twitter: 'https://twitter.com/1swapfi',
  documentations: 'https://docs.1swap.fi',
  codes: 'https://github.com/1swapfi',
  medium: 'https://1swapfi.medium.com',
  telegram: 'https://t.me/oneswapfi',
  buy1SwapSolarbeam:
    'https://app.solarbeam.io/exchange/swap?outputCurrency=0x3516a7588C2E6FFA66C9507eF51853eb85d76e5B&inputCurrency=ETH',
};

export enum ChainId {
  bsc = 56,
  bscTestnet = 97,
  local = 31337,
  polygon = 137,
  polygonMumbai = 80001,
  fantom = 250,
  fantomTestNet = 4002,
  avalanche = 43114,
  moonriver = 1285,
}

export const DefaultSteps = [
  { ratio: 0 },
  { ratio: 25, label: '25%' },
  { ratio: 50, label: '50%' },
  { ratio: 75, label: '75%' },
  { ratio: 100 },
];

export const MaxTransactionHistory = 20;
export const SlippagePrecision = parseUnits('1', 10);
export const Precision = parseUnits('1', 10);
export const FeePrecision = parseUnits('1', 10);
export const PricePrecision = parseUnits('1', 18);
export const BlocksPerYear = 14334545;
export const BlocksPerDay = Math.round(BlocksPerYear / 365);
export const MinutesUpdateEstimateOutput = 10;
export const PriceUpdateInterval = 15; // seconds

// common precision used in lending contracts
export const LendingPrecision = parseUnits('1', 18);
export const MaxLimitRatio = 80;
export const SafeLimitPrecision = parseUnits('0.8', 18);
export const MintSafeLimitPrecision = parseUnits('0.65', 18);

export const StableCollateralRatioPrecision = parseUnits('1', 18);
export const StableFeePrecision = parseUnits('1', 6);

export const BonusPrecision = parseUnits('0.0000005', 10); // rounding 0.0001%
export const ImpactPrecision = parseUnits('0.0000005', 10); // rounding 0.0001%

export const TokenThreshold: { [symbol: string]: number } = {
  WBTC: 0.00001,
  WETH: 0.0001,
  DEFAULT: 0.0001,
};

export const CurrencyThreshold = 0.01;

export type HeaderElements =
  | 'navbar'
  | 'switchChainModal'
  | 'iceModal'
  | 'accountModal'
  | 'more';

import Fantom from '../assets/images/networks/fantom-network.jpg';
import Matic from '../assets/images/networks/matic-network.jpg';
import Polygon from '../assets/images/networks/polygon-network.jpg';
import Avalanche from '../assets/images/networks/avalanche-network.jpg';
import MoonRiver from '../assets/images/networks/moonriver-network.jpg';

export const NETWORK_ICON = {
  [ChainId.fantom]: Fantom,
  [ChainId.polygon]: Polygon,
  [ChainId.polygonMumbai]: Matic,
  [ChainId.avalanche]: Avalanche,
  [ChainId.moonriver]: MoonRiver,
};

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.fantom]: 'Fantom',
  [ChainId.polygon]: 'Polygon',
  [ChainId.polygonMumbai]: 'Matic Testnet',
  [ChainId.avalanche]: 'Avalanche',
  [ChainId.moonriver]: 'MoonRiver',
};

export const CHAINS: {
  [chainId in ChainId]?: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
  };
} = {
  [ChainId.fantom]: {
    chainId: '0xfa',
    chainName: 'Fantom',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpcapi.fantom.network'],
    blockExplorerUrls: ['https://ftmscan.com'],
  },
  [ChainId.polygon]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com'], //['https://matic-mainnet.chainstacklabs.com/'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  [ChainId.avalanche]: {
    chainId: '0xA86A',
    chainName: 'Avalanche',
    nativeCurrency: {
      name: 'Avalanche Token',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://explorer.avax.network'],
  },
  [ChainId.moonriver]: {
    chainId: '0x505',
    chainName: 'MoonRiver',
    nativeCurrency: {
      name: 'MoonRiver Token',
      symbol: 'MOVR',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.moonriver.moonbeam.network'],
    blockExplorerUrls: ['https://blockscout.moonriver.moonbeam.network/'],
  },
};
