import { useWeb3React } from '@web3-react/core';
import React, { ReactNode, ReactText, useMemo } from 'react';
import { getExplorerUrl } from '../config';

export type ExplorerLinkProps = {
  address: string | number;
  children: ReactNode | ReactText;
  type?: 'address' | 'token' | 'tx' | 'blocks';
};

export const ExplorerLink: React.FC<ExplorerLinkProps> = ({ address, children, type }) => {
  const { chainId } = useWeb3React();
  const url = useMemo(() => {
    return [getExplorerUrl(chainId), type || 'address', address].join('/');
  }, [address, chainId, type]);

  return (
    <a target="_blank" href={url}>
      {children}
    </a>
  );
};
