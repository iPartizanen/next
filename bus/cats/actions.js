import { types } from "./types";

export const catsActions = {
  fillCats: (cats) => {
    return {
      type: types.FILL_CATS,
      payload: cats,
    }
  },
  startLoading: () => {
    return {
      type: types.START_LOADING,
    }
  },
  stopLoading: () => {
    return {
      type: types.STOP_LOADING,
    }
  },
  // Async
  loadCatsAsync: () => {
    return {
      type: types.LOAD_CATS_ASYNC,
    }
  }
};
