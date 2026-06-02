import React, { useState } from 'react';
import { Input } from '../atoms';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search...' }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="mb-4"
    />
  );
};
