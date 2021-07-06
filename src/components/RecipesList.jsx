import React from 'react';
import { Redirect } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import RecipeCard from './RecipeCard';

export default function RecipesList() {
  const maxNumberOfRecipes = 11;
  const { recipes, loading } = useSearchBar();

  // console.log(recipes.length);

  if (recipes !== null && recipes.length === 1) {
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
