export async function searchRecipesByIngredients(pathname, searchValue) {
  if (pathname === '/comidas') {
    const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
    const { meals } = await response.json();
    // console.log(data);
    return meals;
  }
  const response = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`);
  const { drinks } = await response.json();
  return drinks;
}

export async function searchRecipesByName(pathname, searchValue) {
  if (pathname === '/comidas') {
    const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
    const { meals } = await response.json();
    return meals;
  }
  const response = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`);
  const { drinks } = await response.json();
  return drinks;
}

export async function searchRecipesByFirstLetter(pathname, searchValue) {
  if (pathname === '/comidas') {
    const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
    const { meals } = await response.json();
    return meals;
  }
  const response = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`);
  const { drinks } = await response.json();
  return drinks;
}
