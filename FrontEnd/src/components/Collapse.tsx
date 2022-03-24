import React, { createContext, useContext } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

interface CollapseContext {
  current?: number;
  onToggle: (id: number, openOnly: boolean) => void;
}

export const CollapseContext = createContext<CollapseContext>({
  current: -1,
  onToggle: undefined,
});

export const Collapse: React.FC = ({ children }) => {
  const [expanded, setExpanded] = useState(-1);

  const onToggle = useCallback((index: number, openOnly: boolean) => {
    setExpanded((t) => {
      return t === index && !openOnly ? -1 : index;
    });
  }, []);

  return (
    <CollapseContext.Provider
      value={{
        current: expanded,
        onToggle,
      }}
    >
      {children}
    </CollapseContext.Provider>
  );
};

interface CollapseItemContext {
  id?: number;
}

export const CollapseItemContext = createContext<number>(null);

export const CollapseItem: React.FC<{ id: number }> = ({ children, id }) => {
  const { onToggle } = useContext(CollapseContext);

  const onItemClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      ev.stopPropagation();
      onToggle(id, true);
    },
    [id, onToggle],
  );
  return (
    <CollapseItemContext.Provider value={id}>
      <div onClick={onItemClick}>{children}</div>
    </CollapseItemContext.Provider>
  );
};

export const CollapseButton: React.FC<{ id: number; openOnly?: boolean }> = ({
  children,
  id,
  openOnly,
}) => {
  const { onToggle } = useContext(CollapseContext);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      onToggle(id, openOnly);
    },
    [id, onToggle, openOnly],
  );

  return <div onClick={onClick}>{children}</div>;
};

export const CollapseBody: React.FC<{ id: number }> = ({ children, id }) => {
  const { current } = useContext(CollapseContext);
  return <>{current === id ? children : null}</>;
};

export const CollapseOpen: React.FC<{ id: number }> = ({ children, id }) => {
  const { current } = useContext(CollapseContext);
  return <>{current === id ? children : null}</>;
};

export const CollapseClose: React.FC<{ id: number }> = ({ children, id }) => {
  const { current } = useContext(CollapseContext);
  return <>{current !== id ? children : null}</>;
};
