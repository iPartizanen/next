// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from '../helpers/identifyUser';
import { initialReduxStateProps } from '../helpers/initialReduxStateProps';

// Components
import { User as UserComponent } from '../components/User';
import { Menu } from '../components/Menu';

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(context, initializeStore());
  await identifyUser(context, store);

  return initialReduxStateProps (store, stateUpdates);
};

const User = () => {

  return (
    <>
      <Menu />
      <UserComponent />
    </>
  );
};

export default User;
