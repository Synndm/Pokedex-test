import type { Pokemon } from '../../types/pokemon';
import './PokemonModal.scss';
import PokemonStats from '../PokeStatus/PokemonStatus';
import PokemonAbilities from '../PokemonAbilities/PokemonAbilities';

interface PokemonModalProps {
    pokemon: Pokemon;
    onClose: () => void;
}

function PokemonModal({
    pokemon,
    onClose,
}: PokemonModalProps) {
    return (
        <div
            className="pokemon-modal"
            onClick={onClose}
        >
            <div
                className="pokemon-modal__content"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="pokemon-modal__close"
                    onClick={onClose}
                    aria-label="Fechar modal"
                >
                    ×
                </button>

                <span className="pokemon-modal__number">
                    #{pokemon.id.toString().padStart(3, '0')}
                </span>

                <h2 className="pokemon-modal__name">
                    {pokemon.name}
                </h2>

                <img
                    className="pokemon-modal__image"
                    src={pokemon.sprites.front_default ?? ''}
                    alt={`Imagem do ${pokemon.name}`}
                />

                <div className="pokemon-modal__types">
                    {pokemon.types.map((type) => (
                        <span key={type.slot}>
                            {type.type.name}
                        </span>
                    ))}
                </div>

                <div className="pokemon-modal__physical">
                    <div>
                        <strong>Altura</strong>
                        <span>{pokemon.height / 10} m</span>
                    </div>

                    <div>
                        <strong>Peso</strong>
                        <span>{pokemon.weight / 10} kg</span>
                    </div>
                </div>
                <PokemonAbilities
                    abilities={pokemon.abilities}
                />

                <PokemonStats
                    stats={pokemon.stats}
                />
            </div>
        </div>
    );
}

export default PokemonModal;