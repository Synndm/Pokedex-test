import { useEffect, useState } from 'react';

import {
  getPokemon,
  getPokemonsDetails,
} from './services/pokeapi';

import type { Pokemon } from './types/pokemon';

import PokemonGrid from './components/PokeGrid/PokemonGrid';
import SearchBar from './components/SearchBar/SearchBar';

import './App.scss';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const data = await getPokemonsDetails();

        setPokemons(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadPokemon();
  }, []);

  async function handleSearch(value: string) {
    try {
      setSearching(true);

      const pokemon = await getPokemon(value);

      setPokemons([pokemon]);
    } catch (error) {
      console.error(error);

      setPokemons([]);
    } finally {
      setSearching(false);
    }
  }

  return (
    <main className="app">
      <header className="app__header">
        <h1>Pokédex</h1>

        <p>
          Explore os Pokémon disponíveis na PokéAPI.
        </p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {searching ? (
        <p className="app__message">
          Buscando Pokémon...
        </p>
      ) : (
        <PokemonGrid pokemons={pokemons} />
      )}
    </main>
  );
}

export default App;