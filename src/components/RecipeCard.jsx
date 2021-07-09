import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ thumbnail, name, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h2 data-testid={ `${index}-card-name` }>{name}</h2>
      <img
        src={ thumbnail }
        alt={ `foto do prato ${name}` }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
