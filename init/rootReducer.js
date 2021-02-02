// Core
import { combineReducers } from 'redux';

// Reducers
import { userReducer } from "../bus/user/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
});
