const ErrorMessages: Record<string, string> = {
  '> maxA': 'A too large',
  '> maxSwapFee': 'Swap fee too large',
  '> maxAdminFee': 'Admin fee too large',
  '> maxWithdrawFee': 'Withdrwal fee too large',
  tokenNotFound: 'Token not found',
  '< rampDelay': 'Please wait 1 days before start a new ramping',
  '< minRampTime': 'Ramping time too short',
  outOfRange: 'Value out of range',
  '> maxChange': 'Change too large',
  zeroAddress: 'Cannot set address to 0x0',

  // from 1SwapLib
  invalidAmountsLength:
    'Amounts is invalid. Should be the same length as the number of tokens in pool',
  initialDepositRequireAllTokens: 'Initial deposit require all tokens',
  '> slippage': 'Slippage',
  'totalSupply = 0': 'Pool is empty',
  '> balance': 'Insufficient balance',
  '> totalSupply': 'Pool balance exceeded',
  indexOutOfRange: 'Index out of range',
  invariantCalculationFailed: 'Pool estimation failed',
  'Cannot exceed total supply': 'Withdraw exceed pool balance',

  // from BlueIce
  'Voting lock can be 4 years max': 'Lock time cannot be longer than 3 years',
  'Voting lock can be 7 days min': 'Lock time cannot be shorter than 7 days',
};

type ChainError = {
  code: number;
  message: string;
  data: {
    code: number;
    message: string;
    data: string;
  };
};

const isRevert = (tx: any): tx is ChainError => {
  return tx.code === -32603 && tx.data;
};

const isDenied = (tx: any) => {
  return tx.code === 4001;
};

export const getErrorMessage = (tx: any) => {
  if (isDenied(tx)) {
    return 'User denied transaction confirmation';
  }
  if (isRevert(tx)) {
    if (tx.data?.message.startsWith('execution reverted: ')) {
      const message = tx.data.message.replace('execution reverted: ', '');
      return ErrorMessages[message] || message;
    }
  }

  return tx.message;
};
