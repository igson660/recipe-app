import { useContext } from 'react';
import { RecipesDoneContext } from '../contexts/recipesDoneContext';

export default function useRecipesDone() {
  const value = useContext(RecipesDoneContext);
  return value;
}
