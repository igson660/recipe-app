import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeDoneMeal({ recipe, index, shareIcon, handleShareButton }) {
  return (
    <div className="recipeDoneCard">
      <Link to={ `/comidas/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt={ `foto do ${recipe.name}` }
          src={ recipe.image }
        />
        <p data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { `${recipe.area} - ${recipe.category}` }
      </p>
      <span className="dateRecipeDone" data-testid={ `${index}-horizontal-done-date` }>
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
      {['right'].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={ placement }
          placement={ placement }
          overlay={
            <Tooltip id={ `tooltip- ${placement} ` }>
              Link
              <strong> Copiado</strong>
            </Tooltip>
          }
        >
          <button
            data-testid="share-btn"
            type="button"
            onClick={ () => handleShareButton() }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              alt="compartilhar"
              src={ shareIcon }
            />
          </button>
          {/* <Button variant="secondary">Popover on {placement}</Button> */}
        </OverlayTrigger>
      ))}
    </div>);
  /* { copyClipboard
        ? (

        )
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
        )} */
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
