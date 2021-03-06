// Instruments
import { types } from './types';

const initialState = [];

export const carsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FILL_CARS:
      return state.concat(payload);
    default:
      return state;
  }
};
