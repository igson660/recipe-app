import React from 'react';
import useSearchBar from '../hooks/searchBar';

function IngredientsMeal() {
  const { ingredientsMeal } = useSearchBar();
  return (
    <ul>
      {
        (ingredientsMeal !== null && ingredientsMeal.length > 0)
            && ingredientsMeal.map((ingred, indice) => (
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

export default IngredientsMeal;
