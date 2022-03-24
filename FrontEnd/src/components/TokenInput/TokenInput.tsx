import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import React, { ChangeEvent, useCallback, useLayoutEffect, useMemo } from 'react';
import { useRef } from 'react';
import { safeParseUnits } from '../../utils/numbers';

type NativeInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type TokenInputProps = Omit<NativeInputProps, 'value' | 'onChange'> & {
  value: BigNumber;
  onChange: (v: BigNumber, ev?: ChangeEvent<HTMLInputElement>) => void;
  decimals: number;
  invalid?: boolean;
};

export const TokenInput: React.FC<TokenInputProps> = ({
  value,
  onChange,
  decimals,
  invalid,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>();
  const inputValue = useMemo(() => {
    if (!value) {
      return '';
    }

    const inputValue = inputRef.current?.value;
    const parsedValue = inputValue ? safeParseUnits(inputValue, decimals) : null;
    if (parsedValue && value.eq(parsedValue)) {
      return inputValue;
    }

    return formatUnits(value, decimals);
  }, [decimals, value]);

  const onInputChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        const _v = ev.target.value
          ? safeParseUnits(ev.target.value.replace('-', ''), decimals)
          : undefined;
        onChange(_v, ev);
      }
    },
    [decimals, onChange],
  );

  useLayoutEffect(() => {
    inputRef.current.setAttribute('invalid', invalid ? 'true' : 'false');
  }, [invalid]);

  return (
    <input
      placeholder="0.0"
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={onInputChange}
      {...props}
    />
  );
};
