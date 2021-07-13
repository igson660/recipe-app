import React from 'react';
import RecipeDoneCard from './RecipeDoneCard';
import useRecipesDone from '../hooks/recipesDone';

export default function RecipesList() {
  const { recipesDone } = useRecipesDone();
  let verifica = false;
  if (recipesDone) {
    verifica = recipesDone.length > 0;
  }
  return (
    <div>
      { verifica ? recipesDone.map((recipe, index) => (
        <RecipeDoneCard
          key={ index }
          index={ index }
          recipe={ recipe }
        />
      )) : null }
    </div>
  );
}
