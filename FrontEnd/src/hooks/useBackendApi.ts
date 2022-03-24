import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import get from 'lodash/get';
import { config, getPoolConfig } from '../config';
import { useCallback } from 'react';
import merge from 'lodash/merge';
import max from 'lodash/max';
import range from 'lodash/range';
import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { endOfDay, getUnixTime, sub, startOfDay } from 'date-fns/esm';
import { useLastUpdated } from '../state/application/hooks';
import { Zero } from '@ethersproject/constants';
import { sum } from '../utils/numbers';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

type AdminFeeStats = {
  stats: Array<{
    timestamp: number;
    total: string;
    volume: string;
  }>;
  totalVolume: string;
  dayVolume: string;
};

const paramsSerializer = (params) => {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      v.forEach((t) => p.append(k, t));
    } else {
      if (v != null) {
        p.append(k, v.toString());
      }
    }
  });

  return p.toString();
};

export const useApiRequest = () => {
  const { chainId } = useWeb3React();
  return useCallback(
    <T = any>(request: AxiosRequestConfig) => {
      if (!chainId) {
        return null;
      }
      const baseURL = get(config, ['chainConfig', chainId, 'backendUrl']);
      const cancelTokenSource = axios.CancelToken.source();

      const data = axios
        .request<T>(
          merge(
            {
              params: {
                chainId,
              },
              baseURL,
              cancelToken: cancelTokenSource.token,
              paramsSerializer,
            },
            request,
          ),
        )
        .then((x) => x.data)
        .catch((e) => {
          if (e instanceof axios.Cancel) {
            return null as T;
          } else {
            throw e;
          }
        });

      return {
        data,
        cancel: cancelTokenSource.cancel,
      };
    },
    [chainId],
  );
};

export const useRawApiRequest = () => {
  return useCallback(<T = any>(request: AxiosRequestConfig) => {
    const cancelTokenSource = axios.CancelToken.source();

    const data = axios
      .request<T>(
        merge(
          {
            cancelToken: cancelTokenSource.token,
          },
          request,
        ),
      )
      .then((x) => x.data);

    return {
      data,
      cancel: cancelTokenSource.cancel,
    };
  }, []);
};
