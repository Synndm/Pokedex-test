import { useState } from 'react';
import './SearchBar.scss';

interface SearchBarProps {
    onSearch: (value: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
    const [search, setSearch] = useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const value = search.trim();

        if (!value) {
            return;
        }

        onSearch(value);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Pesquise por nome ou número..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <button type="submit">
                Buscar
            </button>
        </form>
    );
}

export default SearchBar;