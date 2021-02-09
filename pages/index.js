// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from '../helpers/identifyUser';
import { disableSaga } from '../helpers/disableSaga';
import { initialReduxStateProps } from '../helpers/initialReduxStateProps';

// Actions
import { asteroidsActions } from '../bus/asteroids/actions';

// Components
import { Message } from '../components/Message';
import { Menu } from '../components/Menu';
import { Asteroids } from '../components/Asteroids';

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

  store.dispatch(asteroidsActions.loadAsteroidsAsync());
  await identifyUser(context, store);

  await disableSaga(store);

  return initialReduxStateProps (store, stateUpdates);
};

const Home = () => {

  return (
    <>
      <Menu />
      <Message /> 
      <Asteroids />
    </>
  );
};

export default Home;
