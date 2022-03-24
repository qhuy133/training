import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { formatUnits, parseUnits } from '@ethersproject/units';

// BigNumber math utils
export const max = (a: BigNumber, b: BigNumber) => (a && b ? (a.gt(b) ? a : b) : null);

export const min = (a: BigNumber, b: BigNumber) => (a && b ? (a.lt(b) ? a : b) : null);

export const sum = (a: BigNumber, b: BigNumber) => a.add(b);

// Parse Utils
export const safeParseUnits = (x: string, decimals: number): BigNumber | undefined => {
  if (!x) {
    return;
  }
  try {
    const lastDot = x.lastIndexOf('.');
    if (lastDot >= 0) {
      x = x.substr(0, lastDot + decimals + 1);
    }
    return parseUnits(x, decimals);
  } catch (e) {
    return;
  }
};

// Format utils

export type FormatOption = {
  locale: string;
  compact: boolean;
  fractionDigits: number;
  keepTrailingZeros: boolean;
  significantDigits?: number;
  percentage?: boolean;
  currency?: string;
  thousandGrouping: boolean;
};

const defaultFormat: FormatOption = {
  locale: 'en-US',
  compact: true,
  keepTrailingZeros: false,
  fractionDigits: 3,
  percentage: false,
  currency: '',
  thousandGrouping: true,
};

/**
 * convert format option to Intl options
 */
const parseConfig = (fmt: FormatOption): Intl.NumberFormatOptions => {
  const ret: Intl.NumberFormatOptions = {
    maximumFractionDigits: fmt.fractionDigits,
  };

  if (fmt.compact) {
    ret.notation = 'compact';
  }
  if (fmt.keepTrailingZeros) {
    ret.minimumFractionDigits = fmt.fractionDigits;
  }

  if (fmt.significantDigits) {
    ret.minimumSignificantDigits = fmt.significantDigits;
    ret.maximumFractionDigits = null;
  }

  if (fmt.percentage) {
    ret.style = 'percent';
  }

  if (fmt.currency) {
    ret.style = 'currency';
    ret.currency = fmt.currency;
    ret.minimumFractionDigits = 0;
  }

  if (fmt.thousandGrouping) {
    ret.useGrouping = true;
  }

  return ret;
};

const defaultFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 3,
  useGrouping: true,
});

/**
 * format fixed string to variours format
 * @param fixed fixed string number
 */
export const formatNumber = (input: number, options?: Partial<FormatOption>): string => {
  if (input == null || isNaN(input)) {
    return '';
  }
  let formatter: Intl.NumberFormat;
  if (!options) {
    formatter = defaultFormatter;
  } else {
    formatter = new Intl.NumberFormat(
      'en-US',
      parseConfig({
        ...defaultFormat,
        ...options,
      }),
    );
  }
  return formatter.format(input);
};

export const formatBigNumber = (
  input: BigNumber,
  decimals: number,
  option?: Partial<FormatOption>,
  threshold?: number,
): string => {
  if (!input) {
    return '-';
  }
  const value = +formatUnits(input, decimals);
  if (threshold && value > 0 && value < threshold) {
    return `< ${formatNumber(threshold, {
      ...option,
      significantDigits: 1,
      compact: false,
    })}`;
  }
  return formatNumber(value, option);
};

export const toBigNumber = (x: BigNumberish) => (x == null ? null : BigNumber.from(x));
