// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from "../helpers/identifyUser";

// Components
import { Message } from '../components/Message';
import { Menu } from '../components/Menu';

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());
  await identifyUser(context, store)

  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    }
  }
};

const Home = () => {

  return (
    <>
      <Menu />
      <Message /> 
    </>
  );
};

export default Home;
