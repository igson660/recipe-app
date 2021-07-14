import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';

function FinishButton({ isFinished }) {
  const { selectedMeal, selectedDrink } = useSearchBar();
  const { location: { pathname } } = useHistory();
  const typeRecipe = pathname.split('/')[1];

  function getDate() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;
    return dataAtual;
  }

  function handleLocalStorage() {
    const allRecipesDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (!allRecipesDone) return;
    let tags;
    if (selectedDrink.strTags === null
      || selectedMeal.strTags === null
      || selectedDrink.strTags === 'null'
      || selectedMeal.strTags === 'null') {
      tags = [];
    }
    if (typeRecipe === 'bebidas') {
      if (selectedDrink.strTags !== null && selectedDrink.strTags === 'null') {
        tags = selectedDrink.strTags.split(',');
      }
      const recipeDoneObject = {
        id: selectedDrink.idDrink,
        type: 'bebida',
        area: '',
        category: selectedDrink.strCategory,
        alcoholicOrNot: selectedDrink.strAlcoholic,
        name: selectedDrink.strDrink,
        image: selectedDrink.strDrinkThumb,
        doneDate: getDate(),
        tags,
      };
      localStorage.setItem('doneRecipes',
        JSON.stringify([...allRecipesDone, recipeDoneObject]));
      return;
    }
    if (typeRecipe === 'comidas') {
      if (selectedMeal.strTags !== null && selectedMeal.strTags === 'null') {
        tags = selectedMeal.strTags.split(',');
      }
      const recipeDoneObject = {
        id: selectedMeal.idMeal,
        type: 'comida',
        area: selectedMeal.strArea,
        category: selectedMeal.strCategory,
        alcoholicOrNot: '',
        name: selectedMeal.strMeal,
        image: selectedMeal.strMealThumb,
        doneDate: getDate(),
        tags,
      };
      localStorage.setItem('doneRecipes',
        JSON.stringify([...allRecipesDone, recipeDoneObject]));
    }
  }

  return (
    <Link style={ { paddingBottom: '100px' } } to="/receitas-feitas">
      <button
        onClick={ handleLocalStorage }
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
