// Core
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Actions
import { catsActions } from './actions';

// Selectors
import {
  selectCatsEntries,
  selectCatsIsLoading
} from './selectors';

// Styles
import styles from './styles.module.scss';

export const Cats = () => {
  const dispatch = useDispatch();
  const entries = useSelector(selectCatsEntries);
  const isLoading = useSelector(selectCatsIsLoading);

  useEffect(() => {
    dispatch(catsActions.loadCatsAsync());
  }, []);

  const spinnerJSX = isLoading && (
    <p>Loading...</p>
  );

  const entriesJSX = entries && !isLoading && entries.map(({ _id, text }) => (
    <p key={_id}>
      {text}
    </p>
  ));

  return (
    <section className={styles.cats}>
      <h1>Cats</h1>
      {spinnerJSX}
      <div className={styles.list}>
        {entriesJSX}
      </div>
    </section>
  )
}