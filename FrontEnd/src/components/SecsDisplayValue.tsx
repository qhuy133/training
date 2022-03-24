import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import React, { useMemo } from 'react';

export type SecsDisplayValueProps = {
  secs: number;
  formatter?: string;
};

export const SecsDisplayValue: React.FC<SecsDisplayValueProps> = ({ secs, formatter }) => {
  const text = useMemo(() => {
    if (!secs) {
      return;
    }
    return format(fromUnixTime(secs), formatter ? formatter : 'dd/MM/yyyy HH:mm:ss O');
  }, [formatter, secs]);

  return <>{text}</>;
};
