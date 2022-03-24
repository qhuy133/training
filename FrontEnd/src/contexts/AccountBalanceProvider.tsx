import { BigNumber } from '@ethersproject/bignumber';
import ERC20 from '../chain/ERC20';

export const useTokenBalance = (token: ERC20): BigNumber => {
  return BigNumber.from(0);
};
