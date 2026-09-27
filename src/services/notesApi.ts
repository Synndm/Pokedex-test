import type { Note } from '../types/note';

// Em produção vem do .env (VITE_API_URL); no seu computador usa a API local
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        // A API devolve { error: "mensagem" }; se não vier, usamos uma genérica
        const body = await response.json().catch(() => null);

        throw new Error(body?.error ?? 'Erro ao comunicar com o servidor');
    }

    // 204 (DELETE) não tem corpo para ler
    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

export function getNotes(pokemonId: number) {
    return request<Note[]>(`/notes?pokemonId=${pokemonId}`);
}

export function createNote(pokemonId: number, description: string) {
    return request<Note>('/notes', {
        method: 'POST',
        body: JSON.stringify({ pokemonId, description }),
    });
}

export function updateNote(id: string, description: string) {
    return request<Note>(`/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ description }),
    });
}

export function deleteNote(id: string) {
    return request<void>(`/notes/${id}`, { method: 'DELETE' });
}
