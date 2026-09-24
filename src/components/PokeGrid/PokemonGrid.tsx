import type { Pokemon } from '../../types/pokemon';
import PokeCard from '../PokeCard/PokemonCard';
import './PokeGrid.scss';

interface PokemonGridProps {
    pokemons: Pokemon[];
    onPokemonClick: (pokemon: Pokemon) => void;
}

function PokemonGrid({
    pokemons,
    onPokemonClick,
}: PokemonGridProps) {
    return (
        <section className="pokemon-grid">
            {pokemons.map((pokemon) => (
                <PokeCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={onPokemonClick}
                />
            ))}
        </section>
    );
}

export default PokemonGrid;