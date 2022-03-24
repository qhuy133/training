import ApplicationUpdater from './application/updater';
import TransactionUpdater from './transactions/updater';
import UserUpdater from './user/updater';
import TokensUpdater from './tokens/updater';
import FarmUpdater from './farms/updater';
import { FarmInfoUpdater } from './farms/updaterFarmInfo';
import FarmUserUpdater from './farms/updaterUserFarmInfo';


export const Updaters: React.FC = () => {
  return (
    <>
      <ApplicationUpdater />
      <TransactionUpdater />
      <UserUpdater />
      <TokensUpdater />
      <FarmUpdater />
      <FarmInfoUpdater />
      <FarmUserUpdater />
    </>
  );
};
