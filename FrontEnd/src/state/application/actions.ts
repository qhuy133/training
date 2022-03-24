import { createAction } from '@reduxjs/toolkit';

export type PopupContent =
  | {
      type: 'error';
      message: string;
      title: string;
    }
  | {
      type: 'waiting';
      title?: string;
      message: string;
    }
  | {
      type: 'transaction';
      hash: string;
    };

export const updateBlockNumber = createAction<{
  chainId: number;
  blockNumber: number;
}>('app/updateBlockNumber');

export const toggleWalletModal = createAction<void>('app/toggleWalletModal');

export const toggleSettingsMenu = createAction<void>('app/toggleSettingsMenu');

export const addPopup = createAction<{
  key?: string;
  removeAfterMs?: number | null;
  content: PopupContent;
}>('app/addPopup');

export const removePopup = createAction<{ key: string }>('app/removePopup');

export const hideInfoBox = createAction<{ key: string }>('app/hideInfoBox');

export const showInfoBox = createAction<{ key: string }>('app/showInfoBox');

export const setSlippageTolerance = createAction<{ slippage: number }>(
  'app/setSlippageTolerance',
);

export const setTransactionDeadline = createAction<{ deadline: number }>(
  'app/setTransactionDeadline',
);

export const acceptTerms = createAction('app/acceptTerms');

export const toggleMainNav =
  createAction<{ isOpen: boolean | null | undefined }>('app/toggleMainNav');

export const toggleTheme = createAction('app/toggleTheme');

export const updateAppData = createAction(
  'app/updateAppData',
  (timestamp: number, chainId: number) => {
    return {
      payload: {
        timestamp,
        chainId,
      },
    };
  },
);
