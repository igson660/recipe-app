import React from 'react';
import useSearchBar from '../hooks/searchBar';

function IngredientsInProgressMeal() {
  const { ingredientsMeal } = useSearchBar();
  return (
    <ul>
      {
        (ingredientsMeal !== null && ingredientsMeal.length > 0)
            && ingredientsMeal.map((ingred, indice) => (
              <label
                key={ ingred }
                htmlFor={ `${indice}-ingredient-step` }
                data-testid={ `${indice}-ingredient-step` }
              >
                <input
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

export default IngredientsInProgressMeal;
