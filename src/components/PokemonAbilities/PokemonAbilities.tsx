import type { PokemonAbility } from '../../types/pokemon';
import './PokemonAbilities.scss';

interface PokemonAbilitiesProps {
    abilities: PokemonAbility[];
}

function PokemonAbilities({
    abilities,
}: PokemonAbilitiesProps) {
    return (
        <section className="pokemon-abilities">
            <h3>Habilidades</h3>

            <div className="pokemon-abilities__list">
                {abilities.map((ability) => (
                    <span
                        key={ability.slot}
                        className="pokemon-abilities__item"
                    >
                        {ability.ability.name}

                        {ability.is_hidden && (
                            <small>
                                Hidden
                            </small>
                        )}
                    </span>
                ))}
            </div>
        </section>
    );
}

export default PokemonAbilities;