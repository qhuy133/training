import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { load, save } from 'redux-localstorage-simple';
import application, { initialState } from './application/reducer';
import transactions from './transactions/reducer';
import user, { initialState as userInitialState } from './user/reducer';
import tokens, { initialState as tokensInitialState } from './tokens/reducer';
import farms, { initialState as farmsInitialState } from './farms/reducer';

const PERSISTED_KEYS: string[] = [
  'user.account',
  'user.connector',
  'transactions',
  'application.theme',
];
const PERSISTED_NAMESPACE = '__1swap_finance';

export const store = configureStore({
  reducer: {
    application,
    transactions,
    user,
    tokens,
    farms,
  },
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    save({
      states: PERSISTED_KEYS,
      namespace: PERSISTED_NAMESPACE,
    }),
  ],
  preloadedState: load({
    states: PERSISTED_KEYS,
    disableWarnings: true,
    namespace: PERSISTED_NAMESPACE,
    preloadedState: {
      application: { ...initialState },
      user: { ...userInitialState },
      tokens: { ...tokensInitialState },
      farms: { ...farmsInitialState },
    },
  }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
