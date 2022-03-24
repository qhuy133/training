import { useMemo } from 'react';
import { formatNumber, FormatOption } from '../utils/numbers';

const FormatNumber: React.FC<{ value: number } & Partial<FormatOption>> = ({
  value,
  ...options
}) => {
  const str = useMemo(() => {
    return value > 1e4 ? '\u221E' : formatNumber(value, options);
  }, [options, value]);
  return <>{str}</>;
};

export default FormatNumber;
