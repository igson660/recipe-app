import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipesDoneContext = createContext();

export function RecipesDoneProvider({ children }) {
  const [recipesDone, setRecipesDone] = useState([]);
  const [allRecipesDone, setAllRecipesDone] = useState([]);

  return (
    <RecipesDoneContext.Provider
      value={ { recipesDone, setRecipesDone, allRecipesDone, setAllRecipesDone } }
    >
      {children}
    </RecipesDoneContext.Provider>
  );
}

RecipesDoneProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
