import React from 'react';
import useSearchBar from '../hooks/searchBar';

function IngredientsInProgressDrink() {
  const { ingredientsDrink } = useSearchBar();
  return (
    <ul>
      {
        (ingredientsDrink !== null && ingredientsDrink.length > 0)
            && ingredientsDrink.map((ingred, indice) => (
              <label
                key={ ingred }
                htmlFor={ `${indice}-ingredient-step` }
                data-testid={ `${indice}-ingredient-step` }
              >
                <input
                  id={ `${indice}-ingredient-step` }
                  name={ `${indice}-ingredient-step` }
                  type="checkbox"
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
