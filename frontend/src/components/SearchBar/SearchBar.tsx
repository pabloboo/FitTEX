import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextSearch: () => void;
  onImageSearch: () => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  onTextSearch,
  onImageSearch,
  loading,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={onSearchQueryChange}
      />
      <button onClick={onTextSearch}>Search</button>
      <button
        onClick={onImageSearch}
        disabled={loading}
        className={`image-search-button ${loading ? "loading" : ""}`}
        title="Search by image"
      >
        <img
          src="/src/assets/image-search-icon.png"
          alt="Search by image"
          className="image-search-icon"
        />
      </button>
    </div>
  );
};

export default SearchBar;