import { types } from "./types";

const initialState = {
  entries: null,
  isLoading: false,
};

export const catsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FILL_CATS:
      return {...state, entries: payload};
    case types.START_LOADING:
      return {...state, isLoading: true};
    case types.STOP_LOADING:
      return {...state, isLoading: false};

    default:
      return state;
  };
};