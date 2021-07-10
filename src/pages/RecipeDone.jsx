import React from 'react';
import Header from '../components/Header';
import RecipeDoneList from '../components/RecipeDoneList';
import useRecipesDone from '../hooks/recipesDone';
import receitas from '../test';

function RecipesDone() {
  const { recipesDone, setRecipesDone } = useRecipesDone();
  setRecipesDone(receitas);
  return (
    <>
      <Header title="Receitas Feitas" withIconSearch={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <RecipeDoneList />
    </>
  );
}

export default RecipesDone;
