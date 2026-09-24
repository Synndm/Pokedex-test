import type { Pokemon } from '../../types/pokemon';
import './PokeCard.scss';

interface PokeCardProps {
    pokemon: Pokemon;
    onClick: (pokemon: Pokemon) => void;
}

function PokeCard({ pokemon, onClick }: PokeCardProps) {
    return (
        <article
            className="poke-card"
            onClick={() => onClick(pokemon)}
        >
            <span className="poke-card__number">
                #{pokemon.id.toString().padStart(3, '0')}
            </span>

            <img
                className="poke-card__image"
                src={pokemon.sprites.front_default ?? ''}
                alt={`Imagem do ${pokemon.name}`}
            />

            <h2 className="poke-card__name">
                {pokemon.name}
            </h2>

            <div className="poke-card__types">
                {pokemon.types.map((type) => (
                    <span
                        key={type.slot}
                        className={`poke-card__type poke-card__type--${type.type.name}`}
                    >
                        {type.type.name}
                    </span>
                ))}
            </div>
        </article>
    );
}

export default PokeCard;