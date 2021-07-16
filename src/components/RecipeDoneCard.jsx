import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import RecipeDoneMeal from './RecipeDoneMeal';

const copy = require('clipboard-copy');

export default function RecipesDoneCard({ recipe, index }) {
  const [copyClipboard, setCopyClipboard] = useState(false);

  function handleShareButton() {
    setCopyClipboard(true);
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
  }

  return (
    (recipe.type === 'comida') ? (
      <RecipeDoneMeal
        recipe={ recipe }
        index={ index }
        copyClipboard={ copyClipboard }
        handleShareButton={ handleShareButton }
        shareIcon={ shareIcon }
      />)
      : (
        <div className="recipeDoneCard">
          <Link to={ `/bebidas/${recipe.id}` }>
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
            { recipe.alcoholicOrNot }
          </p>
          <span
            className="dateRecipeDone"
            data-testid={ `${index}-horizontal-done-date` }
          >
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
        </div>
      )
  );
/* { copyClipboard
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
)} */
}

RecipesDoneCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
