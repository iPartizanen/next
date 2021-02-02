// Instruments
import { types, userTypes } from './types';

const initialState = {
  userId: '',
  visitCounts: 0,
  userType: userTypes.USER_IS_GUEST,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FILL_USER:
      return {...state, ...payload};
    case types.SET_VISIT_COUNTS:
      return {...state, ...payload};
    case types.SET_USER_TYPE:
      return {...state, ...payload};
    default:
      return state;
  }
};
