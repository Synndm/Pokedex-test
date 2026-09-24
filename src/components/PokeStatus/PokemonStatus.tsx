import type { PokemonStat } from '../../types/pokemon';
import './PokemonStatus.scss';

interface PokemonStatsProps {
    stats: PokemonStat[];
}

function PokemonStats({ stats }: PokemonStatsProps) {
    return (
        <section className="pokemon-stats">
            <h3>Status</h3>

            <div className="pokemon-stats__list">
                {stats.map((stat) => (
                    <div
                        className="pokemon-stats__item"
                        key={stat.stat.name}
                    >
                        <div className="pokemon-stats__header">
                            <span>
                                {stat.stat.name}
                            </span>

                            <strong>
                                {stat.base_stat}
                            </strong>
                        </div>

                        <div className="pokemon-stats__bar">
                            <div
                                className="pokemon-stats__progress"
                                style={{
                                    width: `${Math.min(
                                        stat.base_stat,
                                        100
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PokemonStats;