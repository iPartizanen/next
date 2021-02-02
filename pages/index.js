// Core
import { useDispatch } from 'react-redux';

// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from "../helpers/identifyUser";

// Components
import Message from '../components/Message';
import Menu from '../components/Menu';

// Actions
import { userActions } from '../bus/user/actions';

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());

  const { userId, visitCounts, userType } = await identifyUser(context);

  store.dispatch(userActions.fillUser({ userId }));
  store.dispatch(userActions.setVisitCounts({ visitCounts }));
  store.dispatch(userActions.setUserType({ userType }));

  const initialReduxState = store.getState();
 
  return {
    props: {
      initialReduxState,      
    }
  }
};

const Home = (props) => {
  const { initialReduxState } = props;
  const { visitCounts, userType } = initialReduxState.user;
  const dispatch = useDispatch();
  dispatch(userActions.fillUser({ visitCounts }));

  return (
    <>
      <Menu currentPage={'/'}/>
      <Message /> 
    </>
  );
};

export default Home;
