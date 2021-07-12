import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ingredientsContext = createContext();

export function IngredientsContextProvider({ children }) {
  const [fetchingIngredients, setFetchingIngredients] = useState(false);

  return (
    <ingredientsContext.Provider
      value={ { fetchingIngredients, setFetchingIngredients } }
    >
      {children}
    </ingredientsContext.Provider>
  );
}

IngredientsContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
