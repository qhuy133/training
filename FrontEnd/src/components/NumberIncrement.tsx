import React from 'react';
import CountUp from 'react-countup';

export type NumberIncrementProps = {
  start?: number;
  end: number;
  delay?: number;
  duration?: number;
  decimals?: number;
};

export const NumberIncrement: React.FC<NumberIncrementProps> = ({
  start,
  end = 0,
  delay,
  duration,
  decimals,
}) => {
  return (
    <CountUp
      start={start | 0}
      end={end}
      delay={delay | 0}
      duration={duration | 1}
      decimals={decimals | 0}
      decimal="."
      separator=","
      preserveValue
    >
      {({ countUpRef }) => <span ref={countUpRef} />}
    </CountUp>
  );
};
