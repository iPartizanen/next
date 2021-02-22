// Core
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Actions
import { asteroidsActions } from './actions';

// Selectors
import { selectAsteroidsEntries } from './selectors';

export const Asteroids = () => {
  const dispatch = useDispatch();
  const entries = useSelector(selectAsteroidsEntries);

  useEffect(() => {
    dispatch(asteroidsActions.loadAsteroidsAsync());
  }, []);

  const entriesJSX = entries && entries.map(({ id, full_name }) => (
    <p key={id}>
      {full_name}
    </p>
  ));

  return (
    <>
      <h1>Asteroids</h1>
      {entriesJSX}
    </>
  )
}
