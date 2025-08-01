import React from 'react';

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <input
      type="search"
      placeholder="Search doctors..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}

