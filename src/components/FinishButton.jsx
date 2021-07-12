import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FinishButton({ isFinished }) {
  return (
    <Link style={ { paddingBottom: '100px' } } to="/receitas-feitas">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isFinished }
      >
        Finalizar Receita
      </button>
    </Link>
  );
}

export default FinishButton;

FinishButton.propTypes = {
  isFinished: PropTypes.bool,
}.isRequired;
