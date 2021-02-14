// Core
import * as R from 'ramda';

export const initialReduxStateProps = (store, stateUpdates) => {
  const currentPageReduxState = store.getState();

  const initialReduxState = R.mergeDeepRight(
    stateUpdates,
    currentPageReduxState
  );

  return {
    props: {
      initialReduxState,
    }
  }
}
