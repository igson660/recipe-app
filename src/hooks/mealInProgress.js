import { useContext } from 'react';
import { RecipesInProgressContext } from '../contexts/recipesInProgressContext';

export default function useRecipesInProgressContext() {
  const value = useContext(RecipesInProgressContext);
  return value;
}
