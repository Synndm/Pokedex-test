import type { Pokemon } from '../../types/pokemon';
import './PokeCard.scss';

interface PokeCardProps {
    pokemon: Pokemon;
    onClick: (pokemon: Pokemon) => void;
}

function PokeCard({ pokemon, onClick }: PokeCardProps) {
    return (
        <article className="poke-card">
            <span className="poke-card__number">
                #{pokemon.id.toString().padStart(3, '0')}
            </span>

            <img
                className="poke-card__image"
                src={pokemon.sprites.front_default ?? ''}
                alt=""
                loading="lazy"
            />

            <h2 className="poke-card__name">
                {/* O ::after do botão cobre o card inteiro, então o card todo é clicável */}
                <button
                    type="button"
                    className="poke-card__button"
                    onClick={() => onClick(pokemon)}
                    aria-haspopup="dialog"
                >
                    {pokemon.name}
                </button>
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
