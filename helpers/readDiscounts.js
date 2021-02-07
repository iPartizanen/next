// Instruments
import { readFeedData } from '../helpers/readFeedData';
import { userTypes } from '../bus/user/types';

// Actions
import { discountsActions } from '../bus/discounts/actions';

// Selectors
import { selectUserType } from '../bus/user/selectors';

export const readDiscounts = async (store) => {
  let discounts = null;

  const userType = selectUserType(store.getState());

  if (userType === userTypes.USER_IS_FRIEND 
    || userType === userTypes.USER_IS_FAMILY_MEMBER) {
      discounts = await readFeedData('./data/discounts.json');
  };

  store.dispatch(discountsActions.fillDiscounts(discounts));

  return discounts;
}
