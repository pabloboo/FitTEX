import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextSearch: () => void;
  onImageSearch: () => void;
  imageLoading: boolean;
  textLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  onTextSearch,
  onImageSearch,
  imageLoading,
  textLoading,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={onSearchQueryChange}
      />
      <button
        onClick={onTextSearch}
        disabled={textLoading}
        className={`text-search-button ${textLoading ? "loading" : ""}`}
      >
        {textLoading ? "Searching..." : "Search"}
      </button>
      <button
        onClick={onImageSearch}
        disabled={imageLoading}
        className={`image-search-button ${imageLoading ? "loading" : ""}`}
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