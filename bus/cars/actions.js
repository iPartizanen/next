// Instruments
import { types } from "./types";

export const carsActions = {
  // Argument 'cars' is array of cars
  fillCars: (cars) => ({
    type: types.FILL_CARS,
    payload: cars,
  }),
};
