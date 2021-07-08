import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';

function IngredientCard({ name, index }) {
  const { location: { pathname } } = useHistory();
  const [thumbnail, setThumbnail] = useState(`https://www.themealdb.com/images/ingredients/${name}-Small.png`);
  const location = pathname.split('/')[2];

  useEffect(() => {
    function checkingLocation() {
      if (location === 'bebidas') {
        setThumbnail(`https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`);
      }
    }
    checkingLocation();
  }, [name, pathname, location]);

  return (
    <Link to={ `/${location}` }>
      <div data-testid={ `${index}-ingredient-card` }>
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
