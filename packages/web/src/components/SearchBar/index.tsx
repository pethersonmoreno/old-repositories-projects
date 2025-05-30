import React, { useState } from 'react';
import Button from '../Button';
import InputText from '../InputText';
import './style.scss';

function SearchBar() {
  const [search, setSearch] = useState('');
  return (
    <div className="search-bar">
      <InputText
        className="input"
        placeholder="Library’s name"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Button label="Search" />
    </div>
  );
}

export default SearchBar;
