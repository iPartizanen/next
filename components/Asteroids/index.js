// Core
import { useSelector } from 'react-redux';

// Selectors
import { selectAsteroidsEntries } from '../../bus/asteroids/selectors';

export const Asteroids = () => {
  const entries = useSelector(selectAsteroidsEntries);

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
