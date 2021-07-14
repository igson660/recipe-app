import React, { useEffect } from 'react';
import Header from '../components/Header';
import RecipeDoneList from '../components/RecipeDoneList';
import useRecipesDone from '../hooks/recipesDone';

function RecipesDone() {
  const { recipesDone, setRecipesDone } = useRecipesDone();

  useEffect(() => {
    setRecipesDone(JSON.parse(localStorage.getItem('doneRecipes')));
  }, [setRecipesDone]);

  function filterAll() {
    setRecipesDone(JSON.parse(localStorage.getItem('doneRecipes')));
  }

  function filter(e) {
    if (recipesDone !== undefined) {
      const filtered = recipesDone.filter((recipe) => (recipe.type === e));
      setRecipesDone(filtered);
    }
    return null;
  }

  return (
    <>
      <Header title="Receitas Feitas" withIconSearch={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterAll() }
      >
        All
      </button>
      <button
        type="button"
        value="comida"
        data-testid="filter-by-food-btn"
        onClick={ (e) => filter(e.target.value) }
      >
        Food
      </button>
      <button
        type="button"
        value="bebida"
        data-testid="filter-by-drink-btn"
        onClick={ (e) => filter(e.target.value) }
      >
        Drinks
      </button>
      <RecipeDoneList />
    </>
  );
}

export default RecipesDone;
