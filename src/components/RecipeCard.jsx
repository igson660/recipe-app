import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ thumbnail, name, index }) {
  const maxNumberOfRecipes = 12;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      { index <= maxNumberOfRecipes && (
        <>
          <h2 data-testid={ `${index}-card-name` }>{name}</h2>
          <img
            src={ thumbnail }
            alt={ `foto do prato ${name}` }
            data-testid={ `${index}-card-img` }
          />
        </>
      ) }
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
