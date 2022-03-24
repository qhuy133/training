enum ComptrollerError {
  NO_ERROR,
  UNAUTHORIZED,
  COMPTROLLER_MISMATCH,
  INSUFFICIENT_SHORTFALL,
  INSUFFICIENT_LIQUIDITY,
  INVALID_CLOSE_FACTOR,
  INVALID_COLLATERAL_FACTOR,
  INVALID_LIQUIDATION_INCENTIVE,
  MARKET_NOT_ENTERED, // no longer possible
  MARKET_NOT_LISTED,
  MARKET_ALREADY_LISTED,
  MATH_ERROR,
  NONZERO_BORROW_BALANCE,
  PRICE_ERROR,
  REJECTION,
  SNAPSHOT_ERROR,
  TOO_MANY_ASSETS,
  TOO_MUCH_REPAY,
}

enum ComptrollerFailureInfo {
  ACCEPT_ADMIN_PENDING_ADMIN_CHECK,
  ACCEPT_PENDING_IMPLEMENTATION_ADDRESS_CHECK,
  EXIT_MARKET_BALANCE_OWED,
  EXIT_MARKET_REJECTION,
  SET_CLOSE_FACTOR_OWNER_CHECK,
  SET_CLOSE_FACTOR_VALIDATION,
  SET_COLLATERAL_FACTOR_OWNER_CHECK,
  SET_COLLATERAL_FACTOR_NO_EXISTS,
  SET_COLLATERAL_FACTOR_VALIDATION,
  SET_COLLATERAL_FACTOR_WITHOUT_PRICE,
  SET_IMPLEMENTATION_OWNER_CHECK,
  SET_LIQUIDATION_INCENTIVE_OWNER_CHECK,
  SET_LIQUIDATION_INCENTIVE_VALIDATION,
  SET_MAX_ASSETS_OWNER_CHECK,
  SET_PENDING_ADMIN_OWNER_CHECK,
  SET_PENDING_IMPLEMENTATION_OWNER_CHECK,
  SET_PRICE_ORACLE_OWNER_CHECK,
  SUPPORT_MARKET_EXISTS,
  SUPPORT_MARKET_OWNER_CHECK,
  SET_PAUSE_GUARDIAN_OWNER_CHECK,
}

const errorMessage: Record<number, string> = {
  [ComptrollerError.UNAUTHORIZED]: 'Unauthorized',
  [ComptrollerError.COMPTROLLER_MISMATCH]: 'Comptroller mismatch',
  [ComptrollerError.INSUFFICIENT_SHORTFALL]: 'Insufficient shortfall',
  [ComptrollerError.INSUFFICIENT_LIQUIDITY]: 'Insufficient liquidity',
  [ComptrollerError.INVALID_CLOSE_FACTOR]: 'Invalid close factor',
  [ComptrollerError.INVALID_COLLATERAL_FACTOR]: 'Invalid collateral factor',
  [ComptrollerError.INVALID_LIQUIDATION_INCENTIVE]: 'Invalid liquidation incentive',
  [ComptrollerError.MARKET_NOT_ENTERED]: 'Market not entered', // no longer possible
  [ComptrollerError.MARKET_NOT_LISTED]: 'Market not listed',
  [ComptrollerError.MARKET_ALREADY_LISTED]: 'Market already listed',
  [ComptrollerError.MATH_ERROR]: 'Math error',
  [ComptrollerError.NONZERO_BORROW_BALANCE]: 'Nonzero borrow balance',
  [ComptrollerError.PRICE_ERROR]: 'Price error',
  [ComptrollerError.REJECTION]: 'Rejection',
  [ComptrollerError.SNAPSHOT_ERROR]: 'Snapshot error',
  [ComptrollerError.TOO_MANY_ASSETS]: 'Too many assets',
  [ComptrollerError.TOO_MUCH_REPAY]: 'Too much repay',
};

const infoMessage: Record<number, string> = {
  [ComptrollerFailureInfo.ACCEPT_ADMIN_PENDING_ADMIN_CHECK]: 'Accept admin pending admin check',
  [ComptrollerFailureInfo.ACCEPT_PENDING_IMPLEMENTATION_ADDRESS_CHECK]:
    'Accept pending implementation address check',
  [ComptrollerFailureInfo.EXIT_MARKET_BALANCE_OWED]: 'Exit market balance owed',
  [ComptrollerFailureInfo.EXIT_MARKET_REJECTION]: 'Exit market rejection',
  [ComptrollerFailureInfo.SET_CLOSE_FACTOR_OWNER_CHECK]: 'Set close factor owner check',
  [ComptrollerFailureInfo.SET_CLOSE_FACTOR_VALIDATION]: 'Set close factor validation',
  [ComptrollerFailureInfo.SET_COLLATERAL_FACTOR_OWNER_CHECK]:
    'Set collateral factor owner check',
  [ComptrollerFailureInfo.SET_COLLATERAL_FACTOR_NO_EXISTS]: 'Set collateral factor no exists',
  [ComptrollerFailureInfo.SET_COLLATERAL_FACTOR_VALIDATION]: 'Set collateral factor validation',
  [ComptrollerFailureInfo.SET_COLLATERAL_FACTOR_WITHOUT_PRICE]:
    'Set collateral factor without price',
  [ComptrollerFailureInfo.SET_IMPLEMENTATION_OWNER_CHECK]: 'Set implementation owner check',
  [ComptrollerFailureInfo.SET_LIQUIDATION_INCENTIVE_OWNER_CHECK]:
    'Set liquidation incentive owner check',
  [ComptrollerFailureInfo.SET_LIQUIDATION_INCENTIVE_VALIDATION]:
    'Set liquidation incentive validation',
  [ComptrollerFailureInfo.SET_MAX_ASSETS_OWNER_CHECK]: 'Set max assets owner check',
  [ComptrollerFailureInfo.SET_PENDING_ADMIN_OWNER_CHECK]: 'Set pending admin owner check',
  [ComptrollerFailureInfo.SET_PENDING_IMPLEMENTATION_OWNER_CHECK]:
    'Set pending implementation owner check',
  [ComptrollerFailureInfo.SET_PRICE_ORACLE_OWNER_CHECK]: 'Set price oracle owner check',
  [ComptrollerFailureInfo.SUPPORT_MARKET_EXISTS]: 'Support market exists',
  [ComptrollerFailureInfo.SUPPORT_MARKET_OWNER_CHECK]: 'Support market owner check',
  [ComptrollerFailureInfo.SET_PAUSE_GUARDIAN_OWNER_CHECK]: 'Set pause guardian owner check',
};

export const parseComptrollerError = (error: number, info: number) => {
  return {
    error: errorMessage[error],
    info: infoMessage[info],
  };
};
