// Hooks
import { usePokemons } from './hooks/usePokemons';

export const Pokemons = () => {
  const { pokemons } = usePokemons();

  const PokemonsJSX = pokemons && pokemons.map(({ name }) => (
    <li key={name}>
      {name}
    </li>
  ));

  return (
    <>
      <h1>Pokemons</h1>
      {PokemonsJSX}
    </>
  )
}