export async function searchRecipesByIngredients(pathname, searchValue) {
  if (pathname === '/comidas') {
    try {
      const response = await
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      return null;
    }
  }
  try {
    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    return null;
  }
}

export async function searchRecipesByName(pathname, searchValue) {
  if (pathname === '/comidas') {
    try {
      const response = await
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      return null;
    }
  }
  try {
    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    return null;
  }
}

export async function searchRecipesByFirstLetter(pathname, searchValue) {
  if (pathname === '/comidas') {
    try {
      const response = await
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      return null;
    }
  }
  try {
    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    return null;
  }
}

export async function searchRecipes(pathname) {
  if (pathname === '/comidas') {
    try {
      const response = await
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      return null;
    }
  }
  try {
    const response = await
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    return null;
  }
}

export async function RandomRecipe(pathname) {
  if (pathname === 'comidas') {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      return null;
    }
  }
  try {
    const response = await
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    return null;
  }
}

export async function searchCategories(pathname) {
  if (pathname === '/comidas') {
    try {
      const response = await
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      return null;
    }
  }
  try {
    const response = await
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    return null;
  }
}

export async function searchRecipesByCategory(pathname, category) {
  if (pathname === '/comidas') {
    try {
      const response = await
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      return null;
    }
  }
  try {
    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    return null;
  }
}
