// Core
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Instruments
import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';
import { identifyUser } from '../../helpers/identifyUser';
import { readCars } from '../../helpers/readCars';
import { initialReduxStateProps } from '../../helpers/initialReduxStateProps';

// Components
import { Menu } from '../../components/Menu';
import { Car as CarComponent } from '../../components/Car';
import { BackButton } from '../../components/BackButton';

// Selectors
import { selectCars } from '../../bus/cars/selectors';

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

  await identifyUser(context, store);
  await readCars(store);

  return initialReduxStateProps (store, stateUpdates);
};

const Car = () => {

  const router = useRouter();
  const { car } = router.query;

  const cars = useSelector(selectCars);

  if (!cars) { 
    useEffect(()=>{ router.replace('/'); });
    return null;
  };
  
  const data = cars.find(item => item.id === car);
 
  if (!data) { 
    useEffect(()=>{ router.replace('/404'); });
    return null;
  };

  return (
    <>
      <Menu />
      <CarComponent {...data} />
      <p/>
      <BackButton />
    </>
  );
}

export default Car;
