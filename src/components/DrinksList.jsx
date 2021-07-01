import React from 'react';
import { Redirect } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';

export default function DrinksList() {
  const { recipes, loading } = useSearchBar();
  if (recipes !== null && recipes.length === 1) {
    return (<Redirect to={ `/bebidas/${recipes[0].idDrink}` } />);
  }
  return (
    <div>
      { loading && 'carregando...' }
      { recipes === null
      && alert('Sinto muito, não encontramos nenhuma receita para esses filtros.') }
    </div>
  );
}
