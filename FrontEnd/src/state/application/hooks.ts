import { useCallback, useMemo, useRef } from 'react';
import {
  addPopup,
  PopupContent,
  removePopup,
  toggleWalletModal,
  toggleSettingsMenu,
  hideInfoBox,
  setSlippageTolerance,
  showInfoBox,
  acceptTerms,
  setTransactionDeadline,
  toggleMainNav,
  toggleTheme,
  updateAppData,
} from './actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../index';
import { useWeb3React } from '@web3-react/core';
import { parseUnits } from '@ethersproject/units';
import useDebounce from '../../hooks/useDebounce';

export function useBlockNumber(): number | undefined {
  const { chainId } = useWeb3React();
  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1]);
}

export function useWalletModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.walletModalOpen);
}

export function useIsDarkTheme(): boolean {
  return useSelector((t: AppState) => t.application.theme) === 'light';
}

export const useLastUpdated = () => {
  const { chainId } = useWeb3React();
  const lastUpdated = useSelector(
    (state: AppState) => state.application.lastUpdated[chainId ?? -1],
  );
  const delay = useRef<number>(Math.floor(Math.random() * 1000));
  const debounced = useDebounce(lastUpdated, delay.current);
  return debounced;
};

export const useUpdateAppData = () => {
  const { chainId } = useWeb3React();
  const dispatch = useDispatch();
  return useCallback(() => {
    if (!chainId) {
      return;
    }
    dispatch(updateAppData(Date.now(), chainId));
  }, [chainId, dispatch]);
};

export function useWalletModalToggle(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleWalletModal()), [dispatch]);
}

export function useSettingsMenuOpen(): boolean {
  return useSelector((state: AppState) => state.application.settingsMenuOpen);
}

export function useToggleSettingsMenu(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleSettingsMenu()), [dispatch]);
}

// returns a function that allows adding a popup
export function useAddPopup(): (
  content: PopupContent,
  key?: string,
  waiting?: boolean,
) => void {
  const dispatch = useDispatch();

  return useCallback(
    (content: PopupContent, key?: string, waiting?: boolean) => {
      const removeAfterMs = content.type === 'waiting' || waiting ? null : 8e3;
      dispatch(addPopup({ content, key, removeAfterMs }));
    },
    [dispatch],
  );
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }));
    },
    [dispatch],
  );
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList);
  return useMemo(() => list.filter((item) => item.show), [list]);
}

// check if infobox was previously hidden
export function useIsHiddenInfoBox(key: string): boolean {
  const list = useSelector((state: AppState) => state.application.infoBoxList);
  return useMemo(() => list[key] ?? false, [key, list]);
}

// hide Infobox for one session
export function useHideInfoBox(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(hideInfoBox({ key }));
    },
    [dispatch],
  );
}
// hide Infobox for one session
export function useShowInfoBox(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(showInfoBox({ key }));
    },
    [dispatch],
  );
}

export function useSetSlippageTolerance(): (slippage: number) => void {
  const dispatch = useDispatch();
  return useCallback(
    (slippage: number) => {
      dispatch(setSlippageTolerance({ slippage }));
    },
    [dispatch],
  );
}
export function useSetTransactionDeadline(): (deadline: number) => void {
  const dispatch = useDispatch();
  return useCallback(
    (deadline: number) => {
      dispatch(setTransactionDeadline({ deadline }));
    },
    [dispatch],
  );
}

export function useGetSlippageTolerance(): number {
  const slippage = useSelector((state: AppState) => state.application.slippageTolerance);
  return slippage;
}

export function useGetTransactionDeadline(): number {
  const transactionDeadline = useSelector(
    (state: AppState) => state.application.transactionDeadline,
  );
  return transactionDeadline;
}

export const useTrasactionSettings = () => {
  const appState = useSelector((t: AppState) => t.application);
  return useMemo(() => {
    return {
      slippageTolerance: appState.slippageTolerance,
      transactionDeadline: appState.transactionDeadline,
    };
  }, [appState?.slippageTolerance, appState?.transactionDeadline]);
};

export function useAcceptTerms(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(acceptTerms());
  }, [dispatch]);
}

export function useIsAcceptedTerms(): boolean {
  const accepted = useSelector((state: AppState) => state.application.acceptedTerms);
  return accepted;
}

export const useGetDeadline = () => {
  const deadline = useSelector((state: AppState) => state.application.transactionDeadline);
  return useCallback(() => {
    return Math.floor(Date.now() / 1000) + deadline * 60;
  }, [deadline]);
};

export const useGetSlippagePrecise = () => {
  const slippage = useSelector((s: AppState) => s.application.slippageTolerance);

  return useMemo(() => {
    return parseUnits(slippage.toFixed(10), 10);
  }, [slippage]);
};

export const useIsMainNavOpen = () => {
  return useSelector<AppState, boolean>((s) => s.application.mainNavOpen);
};

export const useToggleMainNav = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(toggleMainNav({ isOpen: null }));
  }, [dispatch]);
};

export const useSetMainNavOpen = () => {
  const dispatch = useDispatch();
  return useCallback(
    (isOpen: boolean) => {
      dispatch(toggleMainNav({ isOpen }));
    },
    [dispatch],
  );
};

export const useToggleTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((s: AppState) => s.application.theme);
  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return { theme, toggle };
};
