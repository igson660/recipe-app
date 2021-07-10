import React from 'react';
import useSearchBar from '../hooks/searchBar';
import IngredientBox from './IngredientBox';

function IngredientsInProgressMeal() {
  const { ingredientsMeal } = useSearchBar();
  return (
    <ul>
      {
        (ingredientsMeal !== null && ingredientsMeal.length > 0)
            && ingredientsMeal.map((ingred, indice) => (
              <IngredientBox
                key={ ingred }
                ingredient={ ingred }
                index={ indice }
              />
            ))
      }
    </ul>
  );
}

export default IngredientsInProgressMeal;
