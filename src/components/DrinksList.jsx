import React from 'react';
import { Redirect } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import DrinkCard from './DrinkCard';

export default function DrinksList() {
  const maxNumberOfRecipes = 11;
  const { recipes, loading } = useSearchBar();
  if (recipes !== null && recipes.length === 1) {
    return (<Redirect to={ `/bebidas/${recipes[0].idDrink}` } />);
  }
  return (
    <div>
      { loading && 'carregando...' }
      { recipes === null
      && alert('Sinto muito, não encontramos nenhuma receita para esses filtros.') }
      { (recipes !== null && recipes.length > 0) && recipes.map((recipe, index) => {
        if (index <= maxNumberOfRecipes) {
          return (
            <DrinkCard
              key={ recipe.idDrink }
              thumbnail={ recipe.strDrinkThumb }
              name={ recipe.strDrink }
              index={ index }
            />
          );
        }
        return null;
      }) }
    </div>
  );
}
