import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ thumbnail, name, index, id }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link to={ `/comidas/${id}` }>
        <h2 data-testid={ `${index}-card-name` }>{name}</h2>
        <img
          src={ thumbnail }
          alt={ `foto do prato ${name}` }
          data-testid={ `${index}-card-img` }
        />
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
