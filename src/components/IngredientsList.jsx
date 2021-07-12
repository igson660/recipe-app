import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getIngredients } from '../services/api';
import IngredientCard from './IngredientCard';

function IngredientsList() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [id, setId] = useState('idIngredient');
  const [name, setName] = useState('strIngredient');
  const { location: { pathname } } = useHistory();
  const maxNumberOfRecipes = 11;

  useEffect(() => {
    const location = pathname.split('/')[2];
    async function fetchIngredients() {
      const data = await getIngredients(location);
      setIngredientsList(data);
    }
    function checkingLocation() {
      if (location === 'bebidas') {
        setId('strIngredient1');
        setName('strIngredient1');
      }
    }
    fetchIngredients();
    checkingLocation();
  }, [pathname]);
  return (
    <div>
      { (ingredientsList !== null
      && ingredientsList.length > 0) && ingredientsList.map((ingredient, index) => {
        if (index <= maxNumberOfRecipes) {
          return (
            <IngredientCard
              key={ ingredient[id] }
              name={ ingredient[name] }
              index={ index }
            />
          );
        }
        return null;
      }) }
    </div>
  );
}

export default IngredientsList;
