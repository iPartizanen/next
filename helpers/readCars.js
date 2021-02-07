// Instruments
import { readFeedData } from '../helpers/readFeedData';
import { userTypes } from '../bus/user/types';

// Actions
import { carsActions } from '../bus/cars/actions';

// Selectors
import { selectUserType } from '../bus/user/selectors';

export const readCars = async (store) => {
  let cars = null;

  const userType = selectUserType(store.getState());

  if (userType === userTypes.USER_IS_FAMILY_MEMBER) {
      cars = await readFeedData('./data/cars.json');
  };

  store.dispatch(carsActions.fillCars(cars));

  return cars;
}
