import React from 'react';
import PropTypes from 'prop-types';
import { fetchMealsByArea, searchRecipes } from '../services/api';
import useSearchBar from '../hooks/searchBar';

function SelectArea({ options }) {
  const { setRecipes } = useSearchBar();

  async function handleRecipes() {
    const data = await searchRecipes('/comidas');
    setRecipes(data);
  }

  async function handleAreaClick({ target: { value } }) {
    if (value === 'All') {
      handleRecipes();
      return;
    }
    const data = await fetchMealsByArea(value);
    setRecipes(data);
  }

  return (
    <select
      onChange={ handleAreaClick }
      data-testid="explore-by-area-dropdown"
    >
      <option
        data-testid="All-option"
        value="All"
      >
        All
      </option>
      { options.map(({ strArea }) => (
        <option
          key={ strArea }
          data-testid={ `${strArea}-option` }
          value={ strArea }
        >
          { strArea }
        </option>
      )) }
    </select>
  );
}

export default SelectArea;

SelectArea.propTypes = {
  options: PropTypes.shape({
    strArea: PropTypes.string,
  }),
}.isRequired;
