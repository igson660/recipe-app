import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RandomRecipe } from '../services/api';

function ExploreButtons({ exploreByArea = true }) {
  const history = useHistory();
  const [path, setPath] = useState('');
  const { location: { pathname } } = history;

  useEffect(() => {
    async function handleSurpriseRecipe() {
      const typeOfFood = pathname.split('/')[2];
      console.log(typeOfFood);
      const data = await RandomRecipe(typeOfFood);
      // console.log(data);
      let idKey = 'idMeal';
      if (typeOfFood === 'bebidas') idKey = 'idDrink';
      setPath(`/${typeOfFood}/${data[0][idKey]}`);
    }

    handleSurpriseRecipe();
  }, [pathname]);

  return (
    <>
      <Link to={ `${pathname}/ingredientes` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `${pathname}/area` }>
        { exploreByArea && (
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>)}

      </Link>
      <Link to={ path }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>

      </Link>
    </>
  );
}

export default ExploreButtons;

ExploreButtons.propTypes = {
  exploreByArea: PropTypes.bool,
}.isRequired;
