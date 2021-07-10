import React from 'react';
import useSearchBar from '../hooks/searchBar';
import IngredientBox from './IngredientBox';

function IngredientsInProgressDrink() {
  const { ingredientsDrink } = useSearchBar();
  return (
    <ul>
      {
        (ingredientsDrink !== null && ingredientsDrink.length > 0)
            && ingredientsDrink.map((ingred, indice) => (
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

export default IngredientsInProgressDrink;
