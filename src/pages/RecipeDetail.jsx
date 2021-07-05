import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';

export default function RecipeDetail() {
  const { recipes, selectedMeal, setSelectedMeal } = useSearchBar();
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const id = pathname.split('/')[2];
    const recipe = recipes.filter((meal) => meal.idMeal === id);
    setSelectedMeal(recipe[0]);
  }, [recipes, setSelectedMeal, pathname]);
  console.log(selectedMeal);
  return (
    <div>
      <p>Detalhes</p>
      <img
        src={ selectedMeal.strMealThumb }
        alt={ `Foto do Prato ${selectedMeal.strMeal}` }
      />
    </div>
  );
}
