import React from 'react';
import { useMemo } from 'react';
import { ReactText } from 'react';

import { ReactComponent as ic_add } from '../../assets/icons/ic_add.svg';
import { ReactComponent as check_mark } from '../../assets/icons/check-mark.svg';
import { ReactComponent as astronaut } from '../../assets/icons/astronaut.svg';

const Icons = {
  add: ic_add,
  check: check_mark,
  astronaut: astronaut,
};

export type IconProps = {
  name: keyof typeof Icons;
  size?: ReactText;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<IconProps> = ({ name, size: _size, ...props }) => {
  const style = useMemo(() => {
    return {
      width: _size,
      height: _size,
    };
  }, [_size]);

  const Comp = Icons[name];

  return <Comp {...props} style={style} />;
};

export default Icon;
