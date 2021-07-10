import React from 'react';
// import { Redirect } from 'react-router-dom';
import RecipeDoneCard from './RecipeDoneCard';
import useRecipesDone from '../hooks/recipesDone';

export default function RecipesList() {
  const { recipesDone } = useRecipesDone();
  const dateReCipe = '01-01-2021';
  const verifica = recipesDone.length > 0 && Object.keys(recipesDone[0])[0];
  return (
    <div>
      { verifica ? recipesDone.map((recipe, index) => (
        <RecipeDoneCard
          key={ index }
          index={ index }
          recipe={ recipe }
          idMeal={ Object.keys(recipe).find((key) => key === 'idMeal') }
          dateRecipe={ dateReCipe }
        />
      )) : null }
    </div>
  );
}
