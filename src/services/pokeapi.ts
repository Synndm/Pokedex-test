const API_URL = 'https://pokeapi.co/api/v2';

export async function getPokemon(nameOrId: string) {
    const response = await fetch(`${API_URL}/pokemon/${nameOrId}`);

    if (!response.ok) {
        throw new Error('Pokemon não encontrado');
    }

    return response.json();
}