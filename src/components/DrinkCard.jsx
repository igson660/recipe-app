import React from 'react';
import PropTypes from 'prop-types';

export default function DrinkCard({ thumbnail, name, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p>{index}</p>
      <h2 data-testid={ `${index}-card-name` }>{name}</h2>
      <img
        src={ thumbnail }
        alt={ `foto do drink ${name}` }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

DrinkCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
