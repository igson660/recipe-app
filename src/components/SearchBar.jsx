import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import {
  searchRecipesByFirstLetter,
  searchRecipesByIngredients,
  searchRecipesByName,
} from '../services/api';
import useHeader from '../hooks/header';

function SearchBar() {
  const [radioValue, setRadioValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { location: { pathname } } = useHistory();
  const [alert, setAlert] = useState(false);
  const {
    setRecipes,
    setLoading,
  } = useSearchBar();
  const { toggleSearchBar } = useHeader();

  async function handleSearchButton() {
    setLoading(true);
    switch (radioValue) {
    case 'ingredients':
    {
      const data = await searchRecipesByIngredients(pathname, searchValue);
      setRecipes(data);
      break;
    }
    case 'name': {
      const data = await searchRecipesByName(pathname, searchValue);
      setRecipes(data);
      break;
    }
    case 'first-letter': {
      if (searchValue.length === 1) {
        setAlert(false);
        const data = await searchRecipesByFirstLetter(pathname, searchValue);
        setRecipes(data);
        break;
      }
      setAlert(true);
      break;
    }
    default:
    }
    setLoading(false);
  }
  return (
    <div>
      { toggleSearchBar
      && (
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
          Ingrediente
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
            onClick={ handleSearchButton }
            disabled={ !(radioValue && searchValue) }
          >
            Buscar
          </button>
          {alert && window.alert('Sua busca deve conter somente 1 (um) caracter') }
        </div>
      ) }
    </div>
  );
}

export default SearchBar;
