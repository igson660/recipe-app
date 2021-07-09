import React from 'react';
import { Redirect } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import RecipeCard from './RecipeCard';
import useHeader from '../hooks/header';

export default function RecipesList() {
  const maxNumberOfRecipes = 11;
  const { recipes, loading } = useSearchBar();
  const { toggleSearchBar } = useHeader();

  if (recipes !== null && recipes.length === 1 && toggleSearchBar) {
    return (<Redirect to={ `/comidas/${recipes[0].idMeal}` } />);
  }
  return (
    <div>
      { loading && 'carregando...' }
      { recipes === null
      && alert('Sinto muito, não encontramos nenhuma receita para esses filtros.') }
      { (recipes !== null && recipes.length > 0) && recipes.map((recipe, index) => {
        if (index <= maxNumberOfRecipes) {
          return (
            <RecipeCard
              key={ recipe.idMeal }
              thumbnail={ recipe.strMealThumb }
              name={ recipe.strMeal }
              index={ index }
            />
          );
        }
        return null;
      }) }
    </div>
  );
}
