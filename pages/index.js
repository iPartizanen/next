// Core
import Head from 'next/head';
import * as R from 'ramda';

// Instruments
import { initializeStore } from '../init/store';
import { initApollo } from '../init/initApollo';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from '../helpers/identifyUser';
import queryPokemons from '../bus/pokemons/hooks/usePokemons/gql/queryPokemons.graphql';

// Components
import { Message } from '../components/Message';
import { Menu } from '../components/Menu';
import { Asteroids } from '../bus/asteroids/asteroidsComponent';
import { Pokemons } from '../bus/pokemons/pokemonsComponent';
import { Cats } from '../bus/cats/catsComponent';
import { Spinner } from '../components/Spinner';

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(context, initializeStore());
  
  const initialApolloState = await initApollo(context, async (execute) => {
    await execute({
      query: queryPokemons,
    });
  });

  // uncomment for server-side saga
  // store.dispatch(asteroidsActions.loadAsteroidsAsync());
  await identifyUser(context, store);

  // await disableSaga(store);

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
      <Head>
        <title>Home page</title>
      </Head>
      <Menu />
      <Message /> 
      <Spinner />
      <Cats /> 
      <Asteroids />
      <Pokemons />
    </>
  );
};

export default Home;
