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
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    return null;
  }
}

export const getMealApi = async (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
};

export const getDrinkApi = async () => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
};
