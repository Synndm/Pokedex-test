import { useState } from 'react';
import type { PokemonSprites } from '../../types/pokemon';
import './SpriteViewer.scss';

interface SpriteViewerProps {
    sprites: PokemonSprites;
    pokemonName: string;
}

interface SpriteOption {
    label: string;
    value: string | null;
}

function SpriteViewer({ sprites, pokemonName }: SpriteViewerProps) {
    const options: SpriteOption[] = [
        {
            label: 'Front',
            value: sprites.front_default,
        },
        {
            label: 'Back',
            value: sprites.back_default,
        },
        {
            label: 'Shiny Front',
            value: sprites.front_shiny,
        },
        {
            label: 'Shiny Back',
            value: sprites.back_shiny,
        },
    ];

    const availableOptions = options.filter(
        (option) => option.value
    );

    // Guardamos só o label; o sprite é derivado dele (estado derivado)
    const [selectedLabel, setSelectedLabel] = useState(
        availableOptions[0]?.label ?? ''
    );

    const selectedOption =
        availableOptions.find((option) => option.label === selectedLabel) ??
        availableOptions[0];

    if (!selectedOption) {
        return (
            <div className="sprite-viewer__empty">
                <span>Imagem indisponível</span>
            </div>
        );
    }

    return (
        <div className="sprite-viewer">
            <div className="sprite-viewer__image-container">
                <img
                    className="sprite-viewer__image"
                    src={selectedOption.value ?? ''}
                    alt={`${pokemonName} - sprite ${selectedOption.label}`}
                />
            </div>

            <div
                className="sprite-viewer__controls"
                role="group"
                aria-label="Escolher sprite"
            >
                {availableOptions.map((option) => {
                    const isActive = option.label === selectedOption.label;

                    return (
                        <button
                            key={option.label}
                            type="button"
                            className={
                                isActive
                                    ? 'sprite-viewer__button sprite-viewer__button--active'
                                    : 'sprite-viewer__button'
                            }
                            aria-pressed={isActive}
                            onClick={() => setSelectedLabel(option.label)}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default SpriteViewer;
