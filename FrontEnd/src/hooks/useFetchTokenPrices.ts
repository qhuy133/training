import { parseUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPoolConfig, getTokenConfig } from '../config';
import { useLastUpdated } from '../state/application/hooks';
import { fetchMultiplePrice } from '../state/tokens/actions';
import { PricePrecision } from '../utils/constants';
import { useMulticall } from './useMulticall';
import { useNativeToken } from './useNativeToken';

const rewardSymbol = '1SWAP';
const rewardNativeTokenLpSymbol = '1SWAP_MOVR_LP';
const MOVR_USDC_MOON_SWAP_LP = '0x74888a02891586ebeccc7b04a0f7a9b5098daf05';

export const useFetchTokenPrices = () => {
  const { chainId } = useWeb3React();
  const multicall = useMulticall();
  const lastGlobalUpdate = useLastUpdated();
  const dispatch = useDispatch();
  const nativeTokenConfig = useNativeToken();
  const nativeToken = getTokenConfig(chainId, nativeTokenConfig?.symbol);
  const oneSwap3Pool = getPoolConfig(chainId, '1s3p');
  const busdOneSwap3Pool = getPoolConfig(chainId, '1s3pbusd');
  const mimOneSwap3Pool = getPoolConfig(chainId, '1s3pmim');
  const avaxUsdOneSwap3Pool = getPoolConfig(chainId, '1s3pavaxusd');
  const wanUsdOneSwap3Pool = getPoolConfig(chainId, '1s3pwanusd');
  const anyFraxOneSwap3Pool = getPoolConfig(chainId, '1s3panyfrax');
  const fraxOneSwap3Pool = getPoolConfig(chainId, '1s3pfrax');
  const maiOneSwap3Pool = getPoolConfig(chainId, '1s3pmai');
  const usdc = getTokenConfig(chainId, 'USDC');
  const reward = getTokenConfig(chainId, rewardSymbol);
  const rewardNativeTokenLp = getTokenConfig(chainId, rewardNativeTokenLpSymbol);

  useEffect(() => {
    return;
    if (
      !multicall ||
      !nativeToken?.address ||
      !usdc?.address ||
      !reward?.address ||
      !oneSwap3Pool?.address ||
      !busdOneSwap3Pool?.address ||
      !mimOneSwap3Pool?.address ||
      !anyFraxOneSwap3Pool?.address ||
      !fraxOneSwap3Pool?.address ||
      !avaxUsdOneSwap3Pool?.address ||
      !maiOneSwap3Pool ||
      !wanUsdOneSwap3Pool?.address ||
      !rewardNativeTokenLp?.address
    ) {
      return;
    }
    multicall([
      {
        target: nativeToken?.address,
        signature: 'balanceOf(address) returns (uint)',
        params: [MOVR_USDC_MOON_SWAP_LP],
      },
      {
        target: usdc?.address, // USDC
        signature: 'balanceOf(address) returns (uint)',
        params: [MOVR_USDC_MOON_SWAP_LP],
      },

      {
        target: nativeToken?.address,
        signature: 'balanceOf(address) returns (uint)',
        params: [rewardNativeTokenLp?.address],
      },
      {
        target: reward?.address,
        signature: 'balanceOf(address) returns (uint)',
        params: [rewardNativeTokenLp?.address],
      },
      {
        target: rewardNativeTokenLp?.address,
        signature: 'totalSupply() returns (uint)',
        params: [],
      },
      {
        target: oneSwap3Pool?.address,
        signature: 'getVirtualPrice() returns (uint)',
        params: [],
      },
      {
        target: busdOneSwap3Pool?.address,
        signature: 'getVirtualPrice() returns (uint)',
        params: [],
      },
      {
        target: mimOneSwap3Pool?.address,
        signature: 'getVirtualPrice() returns (uint)',
        params: [],
      },
      {
        target: avaxUsdOneSwap3Pool?.address,
        signature: 'getVirtualPrice() returns (uint)',
        params: [],
      },
      {
        target: anyFraxOneSwap3Pool?.address,
        signature: 'getVirtualPrice() returns (uint)',
        params: [],
      },
      {
        target: wanUsdOneSwap3Pool?.address,
        signature: 'getVirtualPrice() returns (uint)',
        params: [],
      },
      {
        target: fraxOneSwap3Pool?.address,
        signature: 'getVirtualPrice() returns (uint)',
        params: [],
      },
      {
        target: maiOneSwap3Pool?.address,
        signature: 'getVirtualPrice() returns (uint)',
        params: [],
      },
    ]).then((data) => {
      if (data) {
        // MoonSwap
        const movrBalanceInMoonSwapLp = data[0][0];
        const usdcBalanceInMoonSwapLp = data[1][0];
        // 1Swap
        const movrBalanceIn1SwapLp = data[2][0];
        const rewardBalanceIn1SwapLp = data[3][0];
        const movrRewardLpSupply = data[4][0];
        const virtualPrice = data[5][0];
        const busd1swapVirtualPrice = data[6][0];
        const mim1swapVirtualPrice = data[7][0];
        const avaxUsd1swapVirtualPrice = data[8][0];
        const anyFrax1swapVirtualPrice = data[9][0];
        const wanUsd1swapVirtualPrice = data[10][0];
        const frax1swapVirtualPrice = data[11][0];
        const mai1swapVirtualPrice = data[12][0];
        // Calc token price
        const movrPrice = usdcBalanceInMoonSwapLp
          ?.mul(parseUnits('1', 12)) // missingDecimal
          ?.mul(PricePrecision)
          ?.div(movrBalanceInMoonSwapLp);
        const rewardPrice = movrBalanceIn1SwapLp?.mul(movrPrice)?.div(rewardBalanceIn1SwapLp);
        // Calc lp price
        const movrValue = movrBalanceIn1SwapLp?.mul(movrPrice);
        const rewardValue = rewardBalanceIn1SwapLp?.mul(rewardPrice);
        const movrRewardLpPrice = movrValue?.add(rewardValue)?.div(movrRewardLpSupply);
        dispatch(
          fetchMultiplePrice({
            '1S3P': virtualPrice.toString(),
            'BUSD-1S3P': busd1swapVirtualPrice.toString(),
            'MIM-1S3P': mim1swapVirtualPrice.toString(),
            'AVAXUSD-1S3P': avaxUsd1swapVirtualPrice.toString(),
            'ANYFRAX-1S3P': anyFrax1swapVirtualPrice.toString(),
            'FRAX-1S3P': frax1swapVirtualPrice.toString(),
            'WANUSD-1S3P': wanUsd1swapVirtualPrice.toString(),
            'MAI-1S3P': mai1swapVirtualPrice.toString(),
            USDC: '1000000', // 1 USD
            USDT: '1000000', // 1 USD
            DAI: '1000000000000000000', // 1 USD
            MOVR: movrPrice.toString(),
            [rewardSymbol]: rewardPrice.toString(),
            [rewardNativeTokenLpSymbol]: movrRewardLpPrice.toString(),
          }),
        );
      }
    });
  }, [
    multicall,
    lastGlobalUpdate,
    dispatch,
    nativeToken?.address,
    usdc?.address,
    reward?.address,
    oneSwap3Pool?.address,
    rewardNativeTokenLp?.address,
    busdOneSwap3Pool?.address,
    mimOneSwap3Pool?.address,
    avaxUsdOneSwap3Pool?.address,
    wanUsdOneSwap3Pool?.address,
    anyFraxOneSwap3Pool?.address,
    fraxOneSwap3Pool?.address,
    maiOneSwap3Pool,
  ]);
};
