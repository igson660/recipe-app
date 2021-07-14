import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import IngredientBox from './IngredientBox';

function IngredientsInProgressDrink({ isFinished }) {
  const { ingredientsDrink } = useSearchBar();
  const { location: { pathname } } = useHistory();
  const [checkedIngredients, setCheckedIngredients] = useState(0);
  const id = pathname.split('/')[2];
  const localStorageKey = 'cocktails';

  useEffect(() => {
    const allInProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || {};
    if (!allInProgressRecipes.cocktails) return;
    const recipeInProgress = Object
      .entries(allInProgressRecipes[localStorageKey])
      .find((values) => values[0] === id);
    setCheckedIngredients(recipeInProgress[1].length);
    if (recipeInProgress[1].length) isFinished(true);
  }, [id, isFinished]);

  function verifyChecked(action) {
    if (action === 'add') setCheckedIngredients((old) => old + 1);
    if (action === 'subtract') setCheckedIngredients((old) => old - 1);
    if (checkedIngredients === ingredientsDrink.length - 1) isFinished(true);
  }
  return (
    <ul>
      {
        (ingredientsDrink !== null && ingredientsDrink.length > 0)
            && ingredientsDrink.map((ingred, indice) => (
              <IngredientBox
                key={ ingred }
                ingredient={ ingred }
                index={ indice }
                verify={ verifyChecked }
              />
            ))
      }
    </ul>
  );
}

export default IngredientsInProgressDrink;

IngredientsInProgressDrink.propTypes = {
  isFinished: PropTypes.func,
}.isRequired;
