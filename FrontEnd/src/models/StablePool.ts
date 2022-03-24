import { BigNumber } from '@ethersproject/bignumber';

export type StablePool = {
  id: string;
  name: string;
  address: string;
  assets: Array<string>;
  basePool?: string;
  basePoolIndex?: number;
  lpToken: string;
  isPartner?: boolean;

  fee?: BigNumber;
  adminFee?: BigNumber;
  withdrawFee?: BigNumber;
  a?: BigNumber;

  virtualPrice?: BigNumber;
  totalSupply?: BigNumber;
  balances?: Record<string, BigNumber>;
};
