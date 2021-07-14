import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import IngredientBox from './IngredientBox';

function IngredientsInProgressMeal({ isFinished }) {
  const { location: { pathname } } = useHistory();
  const { ingredientsMeal } = useSearchBar();
  const [checkedIngredients, setCheckedIngredients] = useState(0);
  const id = pathname.split('/')[2];
  const localStorageKey = 'meals';

  function verifyChecked(action) {
    if (action === 'add') setCheckedIngredients((old) => old + 1);
    if (action === 'subtract') setCheckedIngredients((old) => old - 1);
    if (checkedIngredients === ingredientsMeal.length - 1) isFinished(true);
  }

  useEffect(() => {
    const allInProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || {};
    if (!allInProgressRecipes.meals) return;
    const recipeInProgress = Object
      .entries(allInProgressRecipes[localStorageKey])
      .find((values) => values[0] === id);
    setCheckedIngredients(recipeInProgress[1].length);
    if (recipeInProgress[1].length) isFinished(true);
  }, [id, isFinished]);

  return (
    <ul>
      {
        (ingredientsMeal !== null && ingredientsMeal.length > 0)
            && ingredientsMeal.map((ingred, indice) => (
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

export default IngredientsInProgressMeal;

IngredientsInProgressMeal.propTypes = {
  isFinished: PropTypes.func,
}.isRequired;
