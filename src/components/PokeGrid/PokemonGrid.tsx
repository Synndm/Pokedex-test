import type { Pokemon } from '../../types/pokemon';
import PokeCard from '../PokeCard/PokemonCard';
import './PokeGrid.scss';

interface PokemonGridProps {
    pokemons: Pokemon[];
}

function PokemonGrid({ pokemons }: PokemonGridProps) {
    return (
        <section className="pokemon-grid">
            {pokemons.map((pokemon) => (
                <PokeCard
                    key={pokemon.id}
                    pokemon={pokemon}
                />
            ))}
        </section>
    );
}

export default PokemonGrid;