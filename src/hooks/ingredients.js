import { useContext } from 'react';
import { ingredientsContext } from '../contexts/ingredientsContext';

export default function useIngredients() {
  const value = useContext(ingredientsContext);
  return value;
}
