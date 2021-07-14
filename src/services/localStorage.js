export function addRecipesInProgressToLocalStorage(typeOfRecipe, id) {
  const allRecipesInProgress = JSON
    .parse(localStorage.getItem('inProgressRecipes')) || {};
  let newAllRecipeInProgress;
  if (typeOfRecipe === 'comidas' && !allRecipesInProgress.meals[id]) {
    newAllRecipeInProgress = {
      ...allRecipesInProgress,
      meals: { ...allRecipesInProgress.meals, [id]: [] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newAllRecipeInProgress));
    return;
  }
  if (typeOfRecipe === 'bebidas' && !allRecipesInProgress.cocktails[id]) {
    newAllRecipeInProgress = {
      ...allRecipesInProgress,
      cocktails: { ...allRecipesInProgress.cocktails, [id]: [] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newAllRecipeInProgress));
    return;
  }
  if (typeOfRecipe === 'comidas') {
    newAllRecipeInProgress = {
      ...allRecipesInProgress,
      meals: {
        ...allRecipesInProgress.meals,
        [id]: [...allRecipesInProgress.meals[id]],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newAllRecipeInProgress));
    return;
  }
  if (typeOfRecipe === 'bebidas') {
    newAllRecipeInProgress = {
      ...allRecipesInProgress,
      cocktails: {
        ...allRecipesInProgress.cocktails,
        [id]: [...allRecipesInProgress.cocktails[id]],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newAllRecipeInProgress));
  }
}

export function addInitialLocalStorage(typeOfRecipe, id) {
  const allInProgressRecipes = JSON
    .parse(localStorage.getItem('inProgressRecipes')) || {};
  if (!allInProgressRecipes.meals && typeOfRecipe === 'comidas') {
    const initialStorage = {
      ...allInProgressRecipes,
      meals: { [id]: [] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(initialStorage));
    return;
  }
  if (!allInProgressRecipes.cocktails && typeOfRecipe === 'bebidas') {
    const initialStorage = {
      ...allInProgressRecipes,
      cocktails: { [id]: [] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(initialStorage));
  }
}
