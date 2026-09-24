import type {
    Pokemon,
    PokemonListResponse
} from '../types/pokemon';
const API_URL = 'https://pokeapi.co/api/v2';


export async function getPokemon(nameOrId: string): Promise<Pokemon> {
    const response = await fetch(`${API_URL}/pokemon/${nameOrId.toLowerCase()}`);

    if (!response.ok) {
        throw new Error('Pokemon não encontrado');
    }

    return response.json();
}

export async function getPokemons(
    limit = 50,
    offset = 0
): Promise<PokemonListResponse> {
    const response = await fetch(
        `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
        throw new Error('Não foi possível carregar os Pokémon');
    }

    return response.json();
}

export async function getPokemonsDetails(
    limit = 50,
    offset = 0
): Promise<Pokemon[]> {
    const data = await getPokemons(limit, offset);

    const pokemons = await Promise.all(
        data.results.map((pokemon) => getPokemon(pokemon.name))
    );

    return pokemons;
}