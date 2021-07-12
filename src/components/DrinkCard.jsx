import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function DrinkCard({ thumbnail, name, index, id }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link to={ `/bebidas/${id}` }>
        <p>{index}</p>
        <h2 data-testid={ `${index}-card-name` }>{name}</h2>
        <img
          src={ thumbnail }
          alt={ `foto do drink ${name}` }
          data-testid={ `${index}-card-img` }
        />
      </Link>
    </div>
  );
}

DrinkCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
