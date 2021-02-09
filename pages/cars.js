// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from "../helpers/identifyUser";
import { readCars } from '../helpers/readCars';

// Components
import { Menu } from '../components/Menu';
import { Cars as CarsComponent } from '../components/Cars';

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());

  await identifyUser(context, store);
  await readCars(store);
  
  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    }
  }
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
