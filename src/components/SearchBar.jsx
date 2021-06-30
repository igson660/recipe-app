import React, { useState } from 'react';

function SearchBar() {
  const [radioValue, setRadioValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  return (
    <div>
      <input
        onChange={ ({ target }) => setSearchValue(target.value) }
        type="text"
        data-testid="search-input"
      />
      <input
        type="radio"
        value="ingredients"
        data-testid="ingredient-search-radio"
        name="search-bar-inputs"
        onChange={ ({ target }) => setRadioValue(target.value) }
      />
      Ingredientes
      <input
        type="radio"
        value="name"
        data-testid="name-search-radio"
        name="search-bar-inputs"
        onChange={ ({ target }) => setRadioValue(target.value) }
      />
      Nome
      <input
        type="radio"
        value="first-letter"
        data-testid="first-letter-search-radio"
        name="search-bar-inputs"
        onChange={ ({ target }) => setRadioValue(target.value) }
      />
      Primeira letra
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>

    </div>
  );
}

export default SearchBar;
