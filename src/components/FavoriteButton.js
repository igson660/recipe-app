import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import iconFavoriteWhite from '../images/whiteHeartIcon.svg';
import iconFavoriteBlack from '../images/blackHeartIcon.svg';
import useSearchBar from '../hooks/searchBar';

function FavoriteButton() {
  const { selectedMeal, selectedDrink } = useSearchBar();
  const [favorite, setFavorite] = useState(false);
  const [favoriteObjects, setFavoriteObjects] = useState({});
  const { location: { pathname } } = useHistory();
  const typeRecipe = pathname.split('/')[1];

  useEffect(() => {
    let favoriteObject = {
      id: selectedDrink.idDrink,
      type: 'bebida',
      area: '',
      category: selectedDrink.strCategory,
      alcoholicOrNot: selectedDrink.strAlcoholic,
      name: selectedDrink.strDrink,
      image: selectedDrink.strDrinkThumb,
    };
    if (typeRecipe === 'comidas') {
      favoriteObject = {
        id: selectedMeal.idMeal,
        type: 'comida',
        area: selectedMeal.strArea,
        category: selectedMeal.strCategory,
        alcoholicOrNot: '',
        name: selectedMeal.strMeal,
        image: selectedMeal.strMealThumb,
      };
    }
    setFavoriteObjects(favoriteObject);
  }, [selectedDrink, selectedMeal, typeRecipe]);

  useEffect(() => {
    function checkFavorite() {
      const localStorageFavorite = JSON
        .parse(localStorage.getItem('favoriteRecipes')) || [];
      const isFavorite = localStorageFavorite
        .find((recipe) => recipe.id === favoriteObjects.id);
      setFavorite(isFavorite);
    }
    checkFavorite();
  }, [favoriteObjects]);

  function handleFavoriteButton() {
    const newValueFavorite = !favorite;
    setFavorite(newValueFavorite);
    const localStorageFavorite = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || [];
    if (newValueFavorite) {
      const newLocalStorageFavorite = [...localStorageFavorite, favoriteObjects];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorageFavorite));
      return;
    }
    if (typeRecipe === 'comidas') {
      const removeMeal = localStorageFavorite
        .filter((recipe) => recipe.id !== selectedMeal.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeMeal));
      return;
    }
    const removeDrink = localStorageFavorite
      .filter((recipe) => recipe.id !== selectedDrink.idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeDrink));
  }

  return (
    <button
      type="button"
      onClick={ () => handleFavoriteButton() }
    >
      <img
        src={ favorite ? iconFavoriteBlack : iconFavoriteWhite }
        alt="Clique para Favoritar esta Receita"
        data-testid="favorite-btn"
      />
    </button>
  );
}

export default FavoriteButton;
