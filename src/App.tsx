import { useEffect, useState } from 'react';

import {
  getPokemon,
  getPokemonsDetails,
} from './services/pokeapi';

import type { Pokemon } from './types/pokemon';

import PokemonGrid from './components/PokeGrid/PokemonGrid';
import SearchBar from './components/SearchBar/SearchBar';
import PokemonModal from './components/PokeModal/PokemonModal';

import './App.scss';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searching, setSearching] = useState(false);

  const [selectedPokemon, setSelectedPokemon] =
    useState<Pokemon | null>(null);

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

  function handlePokemonClick(pokemon: Pokemon) {
    setSelectedPokemon(pokemon);
  }

  return (
    <main className="app">
      <header className="app__header">
        <h1>Pokédex project</h1>
  
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
        <PokemonGrid
          pokemons={pokemons}
          onPokemonClick={handlePokemonClick}
        />
      )}
  
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </main>
  );
}

export default App;