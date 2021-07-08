import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import useIngredients from '../hooks/ingredients';
import { searchRecipesByIngredients } from '../services/api';

function IngredientCard({ name, index }) {
  const { location: { pathname } } = useHistory();
  const { setRecipes } = useSearchBar();
  const [thumbnail, setThumbnail] = useState(`https://www.themealdb.com/images/ingredients/${name}-Small.png`);
  const location = pathname.split('/')[2];
  const { setFetchingIngredients } = useIngredients();

  useEffect(() => {
    function checkingLocation() {
      if (location === 'bebidas') {
        setThumbnail(`https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`);
      }
    }
    checkingLocation();
  }, [name, pathname, location]);

  async function handleClickedIngredient() {
    setFetchingIngredients(true);
    const data = await searchRecipesByIngredients(`/${location}`, name);
    setRecipes(data);
  }

  return (
    <Link onClick={ handleClickedIngredient } to={ `/${location}` }>
      <div
        data-testid={ `${index}-ingredient-card` }
      >
        <h2 data-testid={ `${index}-card-name` }>{name}</h2>
        <img
          src={ thumbnail }
          alt={ `foto do ingrediente ${name}` }
          data-testid={ `${index}-card-img` }
        />
      </div>
    </Link>
  );
}

export default IngredientCard;

IngredientCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;
