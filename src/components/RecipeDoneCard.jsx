import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function RecipesDoneCard({ recipe, index, idMeal, dateRecipe }) {
  const tags = [recipe.strTags];
  return (
    idMeal ? (
      <div>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt={ `foto do ${recipe.strMeal}` }
          src={ recipe.strMealThumb }
        />
        <p data-testid={ `${index}-horizontal-name` }>
          { recipe.strMeal }
        </p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { recipe.strCategory }
        </p>
        <p data-testid={ `${index}-horizontal-area-text` }>
          { recipe.strArea }
        </p>
        <span data-testid={ `${index}-horizontal-done-date` }>
          { dateRecipe }
        </span>
        { tags.map((tag, i) => {
          if (i <= 1) {
            return (
              <p
                key={ i }
                data-testid={ `${i}-${tag}-horizontal-tag` }
              >
                { console.log(i, tag) }
                { tag }
              </p>
            );
          }
          return null;
        }) }
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          alt="compartilhar"
          src={ shareIcon }
        />
      </div>)
      : (
        <div>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt={ `foto do ${recipe.strDrink}` }
            src={ recipe.strDrinkThumb }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.strAlcoholic }
          </p>
          <p data-testid={ `${index}-horizontal-name` }>
            { recipe.strDrink }
          </p>
          <span data-testid={ `${index}-horizontal-done-date` }>
            { dateRecipe }
          </span>
          { (tags !== null) ? tags.map((tag, i) => {
            if (i.length <= 1) {
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
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            alt="compartilhar"
            src={ shareIcon }
          />
        </div>
      )
  );
}

RecipesDoneCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
