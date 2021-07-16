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
      const data = await RandomRecipe(typeOfFood);
      let idKey = 'idMeal';
      if (typeOfFood === 'bebidas') idKey = 'idDrink';
      setPath(`/${typeOfFood}/${data[0][idKey]}`);
    }
    handleSurpriseRecipe();
  }, [pathname]);

  return (
    <div id="recipeDone">
      <Link to={ `${pathname}/ingredientes` }>
        <button
          className="tagFilter"
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `${pathname}/area` }>
        { exploreByArea && (
          <button
            className="tagFilter"
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>)}

      </Link>
      <br />
      <Link to={ path }>
        <button
          className="tagFilter"
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>

      </Link>
    </div>
  );
}

export default ExploreButtons;

ExploreButtons.propTypes = {
  exploreByArea: PropTypes.bool,
}.isRequired;
