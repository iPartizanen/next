// Other
import { serverDispatch } from '../helpers/serverDispatch';

export const initialDispatcher = async (
  context,
  store
) => {
  // await serverDispatch(store, (dispatch) => {
    
  // });

  //const state = store.getState();

  const stateUpdates = {
      //
  };

  return {
    store,
    stateUpdates,
  };
}