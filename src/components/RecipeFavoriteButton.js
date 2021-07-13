import React from 'react';
import Proptypes from 'prop-types';
import iconFavoriteBlack from '../images/blackHeartIcon.svg';

function RecipeFavoriteButton({ id, setFavoritesFiltered, index }) {
  function handleFavoriteButton() {
    const localStorageFavorite = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || [];
    const removeMeal = localStorageFavorite
      .filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeMeal));
    setFavoritesFiltered(removeMeal);
  }

  return (
    <button
      type="button"
      onClick={ () => handleFavoriteButton() }
    >
      <img
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ iconFavoriteBlack }
        alt="Clique para Favoritar esta Receita"
      />
    </button>
  );
}

RecipeFavoriteButton.propTypes = {
  id: Proptypes.string,
  setFavorites: Proptypes.func,
}.isRequired;

export default RecipeFavoriteButton;
