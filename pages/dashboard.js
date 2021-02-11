// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from '../helpers/identifyUser';
import { readNews } from '../helpers/readNews';
import { readDiscounts } from '../helpers/readDiscounts';
import { readCars } from '../helpers/readCars';
import { initialReduxStateProps } from '../helpers/initialReduxStateProps';

// Components
import { Menu } from '../components/Menu';
import { News } from '../components/News';
import { Discounts } from '../components/Discounts';
import { Cars } from '../components/Cars';

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

  await identifyUser(context, store);
  await readNews(store);
  await readDiscounts(store);
  await readCars(store);

  return initialReduxStateProps (store, stateUpdates);
};

const Dashboard = () => {
  return (
    <>
      <Menu />  
      <News />
      <Discounts />
      <Cars />
    </>
  );
};

export default Dashboard;
