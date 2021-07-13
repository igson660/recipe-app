import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function RecipesDoneCard({ recipe, index }) {
  const [copyClipboard, setCopyClipboard] = useState(false);

  function handleShareButton() {
    setCopyClipboard(true);
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
  }

  return (
    (recipe.type === 'comida') ? (
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
        { recipe.tags.map((tag, i) => {
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
        }) }
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
      </div>)
      : (
        <div>
          <Link to={ `/bebidas/${recipe.id}` }>
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
            { recipe.alcoholicOrNot }
          </p>
          <span data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </span>
          { (recipe.tags !== null) ? recipe.tags.map((tag, i) => {
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
        </div>
      )
  );
}

RecipesDoneCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
