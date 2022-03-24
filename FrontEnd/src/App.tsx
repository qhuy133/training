import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { store } from './state';
import { Updaters } from './state/updaters';
import Modals from './providers/Modals';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { ContractProvider } from './providers/ContractProvider';
import { Theme } from './providers/Theme/Theme';
import Header from './components/Layout/Header';
import { Popups } from './components/Popups';
import { MainWrapper } from './components/Layout/MainWrapper';
import Farms from './views/Farms';

const getLibrary = (p: ExternalProvider | JsonRpcFetchFunc) => {
  return new Web3Provider(p);
};


export const App: React.FC = () => {
  return (
    <Providers>
      <Popups />
      <Header />
      <MainWrapper>
        <Farms />
      </MainWrapper>
    </Providers>
  );
};

export default App;

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <Theme>
          <ContractProvider>
            <Updaters />
            <Modals>
              <BrowserRouter>{children}</BrowserRouter>
            </Modals>
          </ContractProvider>
        </Theme>
      </Provider>
    </Web3ReactProvider>
  );
};
