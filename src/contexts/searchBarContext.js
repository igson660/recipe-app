import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchBarContext = createContext();

export function SearchBarContextProvider({ children }) {
  const [recipes, setRecipes] = useState({});
  const [selectedMeal, setSelectedMeal] = useState({});
  const [loading, setLoading] = useState(false);
  return (
    <SearchBarContext.Provider
      value={ {
        recipes, setRecipes, loading, setLoading, selectedMeal, setSelectedMeal } }
    >
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
