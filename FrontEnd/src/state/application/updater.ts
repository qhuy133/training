import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import { updateBlockNumber } from './actions';
import { useUpdateAppData } from './hooks';

export default function Updater(): null {
  const { library: provider, chainId } = useWeb3React();
  const dispatch = useDispatch();
  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });
  const updateAppData = useUpdateAppData();
  const isWindowVisible = useIsWindowVisible();
  const lastCheckedBlockNumber = useRef<number>(0);
  const numberOfBlockNumberToSkip = 10;

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (typeof state.blockNumber !== 'number') return { chainId, blockNumber };
        return {
          chainId,
          blockNumber:
            chainId === state.chainId ? Math.max(blockNumber, state.blockNumber) : blockNumber,
        };
      });
    },
    [chainId],
  );

  // attach/detach listeners
  useEffect(() => {
    if (!provider) {
      return undefined;
    }

    provider.on('block', blockNumberCallback);
    return () => {
      provider.removeListener('block', blockNumberCallback);
    };
  }, [blockNumberCallback, provider]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber) return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      }),
    );
  }, [dispatch, debouncedState.blockNumber, debouncedState.chainId]);

  useEffect(() => {
    if (isWindowVisible) {
      updateAppData();
    }
  }, [isWindowVisible, updateAppData]);

  useEffect(() => {
    if (
      !isWindowVisible ||
      !debouncedState.chainId ||
      !debouncedState.blockNumber ||
      lastCheckedBlockNumber.current > debouncedState.blockNumber - numberOfBlockNumberToSkip
    ) {
      return;
    }

    updateAppData();
    lastCheckedBlockNumber.current = debouncedState.blockNumber;
  }, [
    debouncedState.blockNumber,
    debouncedState.chainId,
    dispatch,
    isWindowVisible,
    updateAppData,
  ]);

  return null;
}
