// Instruments
import { types } from "./types";

export const userActions = {
  fillUser: (user) => ({
    type: types.FILL_USER,
    payload: user,
  }),
  setVisitCounts: (visitCounts) => ({
    type: types.SET_VISIT_COUNTS,
    payload: { visitCounts },
  }),
  setUserType: (userType) => ({
    type: types.SET_USER_TYPE,
    payload: { userType },
  }),
};
