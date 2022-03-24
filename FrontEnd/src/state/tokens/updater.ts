// import { sortBy } from 'lodash';
// import { useMemo } from 'react';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppState } from '..';
// import { useGetTokensPrice } from '../../hooks/useBackendApi';
// import { useLastUpdated } from '../application/hooks';
// import { fetchMultiplePrice } from './actions';

import { useFetchTokenPrices } from '../../hooks/useFetchTokenPrices';

const Updater = () => {
  useFetchTokenPrices();
  // const dispatch = useDispatch();
  // const observedTokens = useSelector((x: AppState) => x.tokens.observedTokens);
  // const lastGlobalUpdate = useLastUpdated();

  // const tokenHashed = useMemo(() => {
  //   return sortBy(observedTokens).join(':');
  // }, [observedTokens]);

  // useEffect(() => {
  // const observedTokens = tokenHashed.split(':').filter((t) => !!t);
  // if (!observedTokens.length) {
  //   return;
  // }

  // const response = getTokensPrice(observedTokens);

  // if (!response) {
  //   return;
  // }

  // response.data.then((res) => {
  //   if (res) {
  //     dispatch(fetchMultiplePrice(res));
  //   }
  // });
  // return response.cancel;
  // }, [dispatch, getTokensPrice, tokenHashed, lastGlobalUpdate]);

  return null;
};

export default Updater;
