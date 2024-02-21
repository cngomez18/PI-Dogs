import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by breed"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
