import { useEffect, useState } from 'react';
import type { Note } from '../../types/note';
import {
    createNote,
    deleteNote,
    getNotes,
    updateNote,
} from '../../services/notesApi';
import './PokemonNotes.scss';

interface PokemonNotesProps {
    pokemonId: number;
}

function PokemonNotes({ pokemonId }: PokemonNotesProps) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [newText, setNewText] = useState('');

    // Qual anotação está sendo editada (null = nenhuma)
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        // Evita usar a resposta de um Pokémon antigo se o usuário trocar rápido
        let ignore = false;

        async function loadNotes() {
            try {
                setLoading(true);
                setError('');

                const data = await getNotes(pokemonId);

                if (!ignore) {
                    setNotes(data);
                }
            } catch (err) {
                if (!ignore) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'Erro ao carregar anotações'
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        loadNotes();

        return () => {
            ignore = true;
        };
    }, [pokemonId]);

    // Roda uma ação da API cuidando do "salvando" e do erro
    async function run(action: () => Promise<void>) {
        try {
            setSaving(true);
            setError('');

            await action();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Algo deu errado'
            );
        } finally {
            setSaving(false);
        }
    }

    function handleCreate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const text = newText.trim();

        if (!text) {
            return;
        }

        run(async () => {
            const note = await createNote(pokemonId, text);

            setNotes((current) => [...current, note]);
            setNewText('');
        });
    }

    function startEditing(note: Note) {
        setEditingId(note._id);
        setEditingText(note.description);
    }

    function handleUpdate(id: string) {
        const text = editingText.trim();

        if (!text) {
            return;
        }

        run(async () => {
            const updated = await updateNote(id, text);

            // Troca só a anotação editada, mantendo as outras
            setNotes((current) =>
                current.map((note) => (note._id === id ? updated : note))
            );
            setEditingId(null);
        });
    }

    function handleDelete(id: string) {
        if (!window.confirm('Excluir esta anotação?')) {
            return;
        }

        run(async () => {
            await deleteNote(id);

            setNotes((current) => current.filter((note) => note._id !== id));
        });
    }

    return (
        <section className="pokemon-notes">
            <h3>Minhas anotações</h3>

            <form className="pokemon-notes__form" onSubmit={handleCreate}>
                <textarea
                    aria-label="Nova anotação"
                    placeholder="Escreva uma anotação sobre este Pokémon..."
                    value={newText}
                    onChange={(event) => setNewText(event.target.value)}
                    rows={2}
                />

                <button
                    type="submit"
                    disabled={saving || !newText.trim()}
                >
                    Adicionar
                </button>
            </form>

            {error && (
                <p className="pokemon-notes__error" role="alert">
                    {error}
                </p>
            )}

            {loading ? (
                <p className="pokemon-notes__empty" role="status">
                    Carregando anotações...
                </p>
            ) : notes.length === 0 ? (
                <p className="pokemon-notes__empty">
                    Nenhuma anotação ainda.
                </p>
            ) : (
                <ul className="pokemon-notes__list">
                    {notes.map((note) => (
                        <li key={note._id} className="pokemon-notes__item">
                            {editingId === note._id ? (
                                <>
                                    <textarea
                                        aria-label="Editar anotação"
                                        value={editingText}
                                        onChange={(event) =>
                                            setEditingText(event.target.value)
                                        }
                                        rows={2}
                                    />

                                    <div className="pokemon-notes__actions">
                                        <button
                                            type="button"
                                            onClick={() => handleUpdate(note._id)}
                                            disabled={saving || !editingText.trim()}
                                        >
                                            Salvar
                                        </button>

                                        <button
                                            type="button"
                                            className="pokemon-notes__secondary"
                                            onClick={() => setEditingId(null)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>{note.description}</p>

                                    <div className="pokemon-notes__actions">
                                        <small>
                                            {new Date(
                                                note.updatedAt ?? note.createdAt
                                            ).toLocaleString('pt-BR')}
                                            {note.updatedAt && ' (editada)'}
                                        </small>

                                        <button
                                            type="button"
                                            className="pokemon-notes__secondary"
                                            onClick={() => startEditing(note)}
                                            disabled={saving}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            className="pokemon-notes__danger"
                                            onClick={() => handleDelete(note._id)}
                                            disabled={saving}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default PokemonNotes;
