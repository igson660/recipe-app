import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeDoneMeal({ recipe, index, shareIcon, copyClipboard, handleShareButton }) {
  console.log(recipe);
  return (
    <div>
      <Link to={ `/comidas/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt={ `foto do ${recipe.name}` }
          src={ recipe.image }
          width="400px"
        />
        <p data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { `${recipe.area} - ${recipe.category}` }
      </p>
      <span data-testid={ `${index}-horizontal-done-date` }>
        { recipe.doneDate }
      </span>
      { (recipe.tags !== undefined
        && recipe.tags !== null) ? recipe.tags.map((tag, i) => {
          if (i <= 1) {
            return (
              <p
                key={ i }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </p>
            );
          }
          return null;
        }) : null }
      { copyClipboard
        ? <span>Link copiado!</span>
        : (
          <button
            type="button"
            onClick={ () => handleShareButton() }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              alt="compartilhar"
              src={ shareIcon }
            />
          </button>
        )}
    </div>);
}

export default RecipeDoneMeal;

RecipeDoneMeal.propTypes = {
  index: PropTypes.number,
  shareIcon: PropTypes.string,
  copyClipboard: PropTypes.bool,
  handleShareButton: PropTypes.func,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
}.isRequired;
