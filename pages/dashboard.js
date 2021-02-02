// Core
import { useDispatch } from 'react-redux';

// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from '../helpers/identifyUser';
import { readFeedData } from '../helpers/readFeedData';
import { userTypes } from '../bus/user/types';

// Components
import News from '../components/News';
import Discounts from '../components/Discounts';
import Cars from '../components/Cars';
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

  // dashboard
  const news = await readFeedData('./data/news.json');

  const discounts = (userType === userTypes.USER_IS_FRIEND 
    || userType === userTypes.USER_IS_FAMILY_MEMBER) 
      && await readFeedData('./data/discounts.json');

  const cars = (userType === userTypes.USER_IS_FAMILY_MEMBER) 
    && await readFeedData('./data/cars.json');

  return {
    props: {
      initialReduxState,
      news: { news },
      discounts: { discounts },
      cars: { cars },
      currentPage: '/dashboard',
    }
  }
};

const Dashboard = (props) => {
  const {
    news,
    discounts,
    cars,
    initialReduxState,
  } = props;
  const { visitCounts } = initialReduxState.user;
  const dispatch = useDispatch();
  dispatch(userActions.fillUser({ visitCounts }));

  return (
    <>
      <Menu currentPage={'/dashboard'}/>  
      <News {...news} />
      <Discounts {...discounts} />
      <Cars {...cars} />
    </>
  );
};

export default Dashboard;
