import { createReducer, nanoid } from '@reduxjs/toolkit';
import {
  addPopup,
  PopupContent,
  removePopup,
  toggleWalletModal,
  toggleSettingsMenu,
  updateBlockNumber,
  hideInfoBox,
  setSlippageTolerance,
  showInfoBox,
  acceptTerms,
  setTransactionDeadline,
  toggleMainNav,
  toggleTheme,
  updateAppData,
} from './actions';

type PopupList = Array<{
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
}>;

type InfoBoxList = {
  [key: string]: boolean;
};

export enum ConnectorNames {
  injected = 'injected',
  walletConnect = 'walletConnect',
}

export interface ApplicationState {
  blockNumber: { [chainId: number]: number };
  popupList: PopupList;
  infoBoxList: InfoBoxList;
  walletModalOpen: boolean;
  settingsMenuOpen: boolean;
  slippageTolerance: number;
  transactionDeadline: number; // in minutes
  acceptedTerms: boolean;
  mainNavOpen?: boolean;
  theme: 'dark' | 'light';
  lastUpdated?: { [chainId: number]: number | undefined };
}

export const initialState: ApplicationState = {
  blockNumber: {},
  lastUpdated: {},
  popupList: [],
  infoBoxList: {},
  walletModalOpen: false,
  settingsMenuOpen: false,
  slippageTolerance: 0.005,
  transactionDeadline: 10,
  acceptedTerms: false,
  theme: 'dark',
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    })
    .addCase(toggleWalletModal, (state) => {
      state.walletModalOpen = !state.walletModalOpen;
    })
    .addCase(toggleSettingsMenu, (state) => {
      state.settingsMenuOpen = !state.settingsMenuOpen;
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs } }) => {
      state.popupList = (
        key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ]);
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false;
        }
      });
    })
    .addCase(hideInfoBox, (state, { payload: { key } }) => {
      state.infoBoxList[key] = true;
    })
    .addCase(showInfoBox, (state, { payload: { key } }) => {
      state.infoBoxList[key] = false;
    })
    .addCase(setSlippageTolerance, (state, { payload: { slippage } }) => {
      state.slippageTolerance = slippage;
    })
    .addCase(setTransactionDeadline, (state, { payload: { deadline } }) => {
      state.transactionDeadline = deadline;
    })
    .addCase(acceptTerms, (state) => {
      state.acceptedTerms = true;
    })
    .addCase(toggleMainNav, (state, { payload }) => {
      if (payload.isOpen == null) {
        state.mainNavOpen = !state.mainNavOpen;
      } else {
        state.mainNavOpen = payload.isOpen;
      }
    })
    .addCase(toggleTheme, (state) => {
      if (state.theme === 'light') {
        state.theme = 'dark';
      } else {
        state.theme = 'light';
      }
    })
    .addCase(updateAppData, (state, { payload }) => {
      const { chainId, timestamp } = payload;
      state.lastUpdated[chainId] = timestamp;
    }),
);
