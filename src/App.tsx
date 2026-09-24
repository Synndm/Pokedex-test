import { useCallback, useEffect, useState } from 'react';

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
  const [searchError, setSearchError] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [selectedPokemon, setSelectedPokemon] =
    useState<Pokemon | null>(null);

  useEffect(() => {
    async function loadPokemon() {
      try {
        setSearching(true);

        const data = await getPokemonsDetails();

        setPokemons(data);
      } catch (error) {
        console.error(error);

        setSearchError(
          'Não foi possível carregar os Pokémon. Tente novamente mais tarde.'
        );
      } finally {
        setSearching(false);
      }
    }

    loadPokemon();
  }, []);

  async function handleSearch(value: string) {
    try {
      setSearching(true);
      setSearchError('');
      setIsSearchActive(true);

      const pokemon = await getPokemon(value);

      setPokemons([pokemon]);
    } catch (error) {
      console.error(error);

      setSearchError(
        'Pokémon não encontrado. Verifique o nome ou número informado.'
      );
    } finally {
      setSearching(false);
    }
  }

  async function handleClearSearch() {
    try {
      setSearching(true);
      setSearchError('');
      setIsSearchActive(false);

      const data = await getPokemonsDetails();

      setPokemons(data);
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  }

  function handlePokemonClick(pokemon: Pokemon) {
    setSelectedPokemon(pokemon);
  }

  // useCallback mantém a mesma função entre renderizações,
  // assim o useEffect do modal não roda de novo à toa
  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  return (
    <>
      <header className="app__header">
        <div className="app__brand">
          <span className="app__logo" aria-hidden="true" />

          <h1>Pokédex</h1>
        </div>

        <p>
          Explore os Pokémon disponíveis na PokéAPI.
        </p>
      </header>

      <main className="app">
        <SearchBar onSearch={handleSearch} />

        {searching ? (
          <p className="app__message" role="status">
            Buscando Pokémon...
          </p>
        ) : (
          <>
            {searchError && (
              <div className="app__error" role="alert">
                <p className="app__message">
                  {searchError}
                </p>
              </div>
            )}

            {isSearchActive && (
              <button
                type="button"
                className="app__back-button"
                onClick={handleClearSearch}
              >
                ← Ver todos os Pokémon
              </button>
            )}

            <PokemonGrid
              pokemons={pokemons}
              onPokemonClick={handlePokemonClick}
            />
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
