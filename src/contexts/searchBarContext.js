import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchBarContext = createContext();

export function SearchBarContextProvider({ children }) {
  const [recipes, setRecipes] = useState({});
  const [selectedMeal, setSelectedMeal] = useState({});
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState({});
  const [ingredientsMeal, setIngredientsMeal] = useState([]);
  const [ingredientsDrink, setIngredientsDrink] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});

  return (
    <SearchBarContext.Provider
      value={ {
        recipes,
        setRecipes,
        categories,
        setCategories,
        loading,
        setLoading,
        selectedMeal,
        setSelectedMeal,
        selectedDrink,
        setSelectedDrink,
        ingredientsMeal,
        setIngredientsMeal,
        ingredientsDrink,
        setIngredientsDrink,
        currentCategory,
        setCurrentCategory,
      } }
    >
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
