import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllFarmsConfig } from '../../config';
import { initialLoadFarmingPoolsSuccess } from './actions';

const Updater: React.FC = () => {
  const { chainId } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    const pools = getAllFarmsConfig(chainId) || [];
    dispatch(initialLoadFarmingPoolsSuccess(pools));
  }, [chainId, dispatch]);
  return null;
};

export default Updater;
