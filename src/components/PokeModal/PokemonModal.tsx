import { useEffect, useRef } from 'react';
import type { Pokemon } from '../../types/pokemon';
import './PokemonModal.scss';
import PokemonStats from '../PokeStatus/PokemonStatus';
import PokemonAbilities from '../PokemonAbilities/PokemonAbilities';
import SpriteViewer from '../SpriteViewer/SpriteViewer';

interface PokemonModalProps {
    pokemon: Pokemon;
    onClose: () => void;
}

function PokemonModal({
    pokemon,
    onClose,
}: PokemonModalProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const titleId = `pokemon-modal-title-${pokemon.id}`;

    useEffect(() => {
        // Guarda quem tinha o foco (o card) para devolver quando fechar
        const previousFocus = document.activeElement as HTMLElement | null;

        closeButtonRef.current?.focus();

        // Impede a página de fundo de rolar enquanto o modal está aberto
        document.body.style.overflow = 'hidden';

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup: roda quando o modal é desmontado
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            previousFocus?.focus();
        };
    }, [onClose]);

    return (
        <div
            className="pokemon-modal"
            onClick={onClose}
        >
            <div
                className="pokemon-modal__content"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    ref={closeButtonRef}
                    type="button"
                    className="pokemon-modal__close"
                    onClick={onClose}
                    aria-label="Fechar modal"
                >
                    ×
                </button>

                <span className="pokemon-modal__number">
                    #{pokemon.id.toString().padStart(3, '0')}
                </span>

                <h2 id={titleId} className="pokemon-modal__name">
                    {pokemon.name}
                </h2>

                <SpriteViewer
                    key={pokemon.id}
                    sprites={pokemon.sprites}
                    pokemonName={pokemon.name}
                />

                <div className="pokemon-modal__types">
                    {pokemon.types.map((type) => (
                        <span key={type.slot}>
                            {type.type.name}
                        </span>
                    ))}
                </div>

                <dl className="pokemon-modal__physical">
                    <div>
                        <dt>Altura</dt>
                        <dd>{pokemon.height / 10} m</dd>
                    </div>

                    <div>
                        <dt>Peso</dt>
                        <dd>{pokemon.weight / 10} kg</dd>
                    </div>
                </dl>

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
