// Instruments
import { types } from "./types";

export const userActions = {
  fillUser: (user) => ({
    type: types.FILL_USER,
    payload: user,
  }),
  setVisitCounts: (user) => ({
    type: types.SET_VISIT_COUNTS,
    payload: user,
  }),
  setUserType: (user) => ({
    type: types.SET_USER_TYPE,
    payload: user,
  }),
};
