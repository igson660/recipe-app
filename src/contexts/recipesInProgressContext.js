import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipesInProgressContext = createContext();

export function RecipesInProgressContextProvider({ children }) {
  const [recipeInProgress, setRecipeInProgress] = useState({
    cocktails: {},
    meals: {},
  });

  return (
    <RecipesInProgressContext.Provider
      value={ { recipeInProgress, setRecipeInProgress } }
    >
      {children}
    </RecipesInProgressContext.Provider>
  );
}

RecipesInProgressContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
