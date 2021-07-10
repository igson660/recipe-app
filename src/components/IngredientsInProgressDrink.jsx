import React from 'react';
import useSearchBar from '../hooks/searchBar';

function IngredientsInProgressDrink() {
  const { ingredientsDrink } = useSearchBar();
  return (
    <ul>
      {
        (ingredientsDrink !== null && ingredientsDrink.length > 0)
            && ingredientsDrink.map((ingred, indice) => (
              <label key={ ingred } htmlFor={ `${indice}-ingredient-step` }>
                <input
                  name={ `${indice}-ingredient-step` }
                  type="checkbox"
                  data-testid={ `${indice}-ingredient-step` }
                  key={ ingred }
                />
                { ingred }
              </label>
            ))
      }
    </ul>
  );
}

export default IngredientsInProgressDrink;
