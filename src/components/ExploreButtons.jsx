import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RandomRecipe } from '../services/api';

function ExploreButtons({ exploreByArea = true }) {
  const history = useHistory();
  const [path, setPath] = useState(null);
  const { location: { pathname } } = history;
  console.log(path);

  async function handleSurpriseRecipe() {
    const typeOfFood = pathname.split('/')[2];
    const data = await RandomRecipe(typeOfFood);
    let idKey = 'idMeal';
    if (typeOfFood === 'bebidas') idKey = 'idDrink';
    const url = `/${typeOfFood}/${data[0][idKey]}`;
    setPath(`/${typeOfFood}/${data[0][idKey]}`);
    return url;
    // history.push(`/${typeOfFood}/${data[0][idKey]}`);
  }

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
      {/* <Link to={ () => handleSurpriseRecipe() }> */}
      <button
        onClick={ handleSurpriseRecipe }
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>

      {/* </Link> */}
    </>
  );
}

export default ExploreButtons;

ExploreButtons.propTypes = {
  exploreByArea: PropTypes.bool,
}.isRequired;
