// Core
import { combineReducers } from 'redux';

// Reducers
import { userReducer } from "../bus/user/reducer";
import { newsReducer } from "../bus/news/reducer";
import { discountsReducer } from "../bus/discounts/reducer";
import { carsReducer } from "../bus/cars/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  news: newsReducer,
  discounts: discountsReducer,
  cars: carsReducer,
});
