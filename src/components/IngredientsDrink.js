import React from 'react';
import useSearchBar from '../hooks/searchBar';

function IngredientsDrink() {
  const { ingredientsDrink } = useSearchBar();
  return (
    <ul>
      {
        (ingredientsDrink !== null && ingredientsDrink.length > 0)
            && ingredientsDrink.map((ingred, indice) => (
              <li
                data-testid={ `${indice}-ingredient-name-and-measure` }
                key={ ingred }
              >
                { ingred }
              </li>
            ))
      }
    </ul>
  );
}

export default IngredientsDrink;
