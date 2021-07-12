import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import useRecipesInProgressContext from '../hooks/mealInProgress';
import useSearchBar from '../hooks/searchBar';

function ButtonsDrink() {
  const { recipeInProgress, setRecipeInProgress } = useRecipesInProgressContext();
  const { ingredientsDrink } = useSearchBar();
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  function checkRecipeInProgress(checkId) {
    const allRecipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || {};
    if (!allRecipesInProgress.cocktails) {
      return false;
    }
    return Object.keys(allRecipesInProgress.cocktails).find((key) => key === checkId);
  }

  function initialRecipe(drinkId) {
    const newLocalStorage = {
      ...recipeInProgress,
      cocktails: { ...recipeInProgress.cocktails, [drinkId]: ingredientsDrink } };
    setRecipeInProgress(newLocalStorage);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
  }

  function checkRecipeDone(mealId) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || {};
    if (Object.keys(doneRecipes).length === 0) {
      return false;
    }
    return doneRecipes.find((recipe) => Number(recipe.id) === Number(mealId));
  }

  return (
    <Link to={ `/bebidas/${id}/in-progress` }>
      { !checkRecipeDone(id)
          && (checkRecipeInProgress(id)
            ? (
              <button
                style={ { position: 'fixed', bottom: '0', left: 0, zIndex: '10' } }
                type="button"
                data-testid="start-recipe-btn"
              >
                Continuar Receita
              </button>)
            : (
              <button
                style={ { position: 'fixed', bottom: '0', right: 0, zIndex: '10' } }
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => (
                  initialRecipe(id)
                ) }
              >
                Iniciar Receita
              </button>)
          )}
    </Link>
  );
}
export default ButtonsDrink;
