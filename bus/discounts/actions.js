// Instruments
import { types } from "./types";

export const discountsActions = {
  // Argument 'discounts' is array of discounts
  fillDiscounts: (discounts) => ({
    type: types.FILL_DISCOUNTS,
    payload: discounts,
  }),
};
