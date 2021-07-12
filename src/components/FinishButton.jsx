import React from 'react';
import PropTypes from 'prop-types';

function FinishButton({ isFinished }) {
  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ isFinished }
    >
      Finalizar Receita
    </button>
  );
}

export default FinishButton;

FinishButton.propTypes = {
  isFinished: PropTypes.bool,
}.isRequired;
