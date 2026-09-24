export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonType[];
    sprites: PokemonSprites;
}

export interface PokemonSprites {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
}

export interface PokemonSummary {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonSummary[];
}