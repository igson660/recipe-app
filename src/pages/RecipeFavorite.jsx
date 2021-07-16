import React, { useState, useEffect } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import '../styles/Recipes.css';

function RecipeFavorite() {
  const [favorites, setFavorites] = useState([]);
  const [favoritesFiltered, setFavoritesFiltered] = useState([]);

  useEffect(() => {
    const localStorageFavorites = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorites(localStorageFavorites);
    setFavoritesFiltered(localStorageFavorites);
  }, []);

  function HandleFilter(filter) {
    if (filter === 'all') {
      setFavoritesFiltered(favorites);
      return;
    }
    const filterFood = favorites.filter((favorite) => favorite.type === filter);
    setFavoritesFiltered(filterFood);
  }

  return (
    <>
      <Header title="Receitas Favoritas" withIconSearch={ false } />
      <div id="recipeDone">
        <button
          className="tagFilter"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => HandleFilter('all') }
        >
          Todas
        </button>
        <button
          className="tagFilter"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => HandleFilter('comida') }
        >
          Comidas
        </button>
        <button
          className="tagFilter"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => HandleFilter('bebida') }

        >
          Bebidas
        </button>
        {
          (favoritesFiltered !== null && favoritesFiltered.length > 0)
        && favoritesFiltered
          .map((favorite, index) => (<FavoriteCard
            thumbnail={ favorite.image }
            key={ favorite.id }
            id={ favorite.id }
            index={ index }
            name={ favorite.name }
            setFavoritesFiltered={ setFavoritesFiltered }
            area={ favorite.area }
            category={ favorite.category }
            type={ favorite.type }
            alcoholicOrNot={ favorite.alcoholicOrNot }
          />))
        }
      </div>
    </>
  );
}

export default RecipeFavorite;
