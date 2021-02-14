// Core
import * as R from 'ramda';

// Instruments
import { initializeStore } from '../init/store';
import { initApollo } from '../init/initApollo';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from '../helpers/identifyUser';
import { disableSaga } from '../helpers/disableSaga';
import queryPokemons from '../bus/pokemons/hooks/usePokemons/gql/queryPokemons.graphql';

// Actions
import { asteroidsActions } from '../bus/asteroids/actions';

// Components
import { Message } from '../components/Message';
import { Menu } from '../components/Menu';
import { Asteroids } from '../components/Asteroids';
import { Pokemons } from '../components/Pokemons';

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(context, initializeStore());
  
  const initialApolloState = await initApollo(context, async (execute) => {
    await execute({
      query: queryPokemons,
    });
  });

  store.dispatch(asteroidsActions.loadAsteroidsAsync());
  await identifyUser(context, store);

  await disableSaga(store);

  const currentPageReduxState = store.getState();

  const initialReduxState = R.mergeDeepRight(
    stateUpdates,
    currentPageReduxState
  );

  return {
    props: {
      initialReduxState,
      initialApolloState,
    }
  }
};

const Home = () => {

  return (
    <>
      <Menu />
      <Message /> 
      <Asteroids />
      <Pokemons />
    </>
  );
};

export default Home;
