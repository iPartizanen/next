// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from '../helpers/identifyUser';
import { readCars } from '../helpers/readCars';
import { initialReduxStateProps } from '../helpers/initialReduxStateProps';

// Components
import { Menu } from '../components/Menu';
import { Cars as CarsComponent } from '../components/Cars';

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

  await identifyUser(context, store);
  await readCars(store);
  
  return initialReduxStateProps (store, stateUpdates);
};

const Cars = () => {
  return (
    <>
      <Menu />
      <CarsComponent />
    </>
  );
}

export default Cars;
