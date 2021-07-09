import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import iconShared from '../images/shareIcon.svg';
import iconFavorite from '../images/whiteHeartIcon.svg';
import { getMealApi, getDrinkApiSugestions } from '../services/api';
import useRecipesInProgressContext from '../hooks/mealInProgress';

export default function RecipeDetail() {
  const numberDrinksSugestions = 5;
  const { selectedMeal, setSelectedMeal } = useSearchBar();
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];
  const [selectedDrinksSugestions, setSelectedDrinksSugestions] = useState({});
  const [ingredientsMeal, setIngredientsMeal] = useState([]);
  const { recipeInProgress, setRecipeInProgress } = useRecipesInProgressContext();

  useEffect(() => {
    const handleStateMeal = async () => {
      const meals = await getMealApi(id);
      setSelectedMeal(meals[0]);
      const limit = 20;
      for (let ind = 0; ind <= limit; ind += 1) {
        // expressão `${meals[0][`strIngredient${ind}`]}` retirada da solução do Grupo 6 - Turma 9
        setIngredientsMeal((oldArray) => [
          ...oldArray,
          `${meals[0][`strIngredient${ind}`]} - ${meals[0][`strMeasure${ind}`]}`,
        ]);
      }
    };
    handleStateMeal();
  }, [pathname, setSelectedMeal, setSelectedDrinksSugestions, id]);

  useEffect(() => {
    const handleStateDrinkSugestions = async () => {
      const drinks = await getDrinkApiSugestions();
      setSelectedDrinksSugestions(drinks);
    };
    handleStateDrinkSugestions();
  }, []);

  function checkRecipeInProgress(checkId) {
    const allRecipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || {};
    if (allRecipesInProgress === {}) return false;
    return Object.keys(allRecipesInProgress.meals).find((key) => key === checkId);
    // return setRecipeInProgress(allRecipesInProgress);
  }

  function initialRecipe(mealId) {
    setRecipeInProgress({
      ...recipeInProgress,
      meals: { ...recipeInProgress.meals, [mealId]: ingredientsMeal } });
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
  }

  return (
    <div>
      <Image
        data-testid="recipe-photo"
        src={ selectedMeal.strMealThumb }
        alt={ `Foto do Prato ${selectedMeal.strMeal}` }
        fluid
      />
      <Container>
        <Row>
          <Col>
            <h3 data-testid="recipe-title">{ selectedMeal.strMeal }</h3>
          </Col>
          <Col>
            <img
              src={ iconShared }
              alt="Compartilhar Receita"
              data-testid="share-btn"
            />
          </Col>
          <Col>
            <img
              src={ iconFavorite }
              alt="Clique para Favoritar esta Receita"
              data-testid="favorite-btn"
              // onClick={ () => setSelectedMeal({ ...selectedMeal, favorite: true }) }
            />
          </Col>
        </Row>
      </Container>
      <p data-testid="recipe-category">{ selectedMeal.strCategory }</p>
      <ul>
        {
          (ingredientsMeal !== null && ingredientsMeal.length > 0)
            ? ingredientsMeal.map((ingred, indice) => {
              if (ingred !== ' - ' && ingred !== ' -  '
                && ingred !== 'undefined - undefined'
                && ingred !== 'null - null') {
                return (
                  <li
                    data-testid={ `${indice - 1}-ingredient-name-and-measure` }
                    key={ ingred }
                  >
                    { ingred }
                  </li>
                );
              }
              return null;
            }) : <h3>Carregando...</h3>
        }
      </ul>
      <p data-testid="instructions">{ selectedMeal.strInstructions }</p>
      {
        (selectedMeal.strYoutube !== undefined)
          ? (
            <iframe
              data-testid="video"
              src={ selectedMeal.strYoutube.replace('watch?v=', 'embed/') }
              title="Recipe"
            />
          ) : null
      }
      <Carousel>
        { selectedDrinksSugestions !== null && selectedDrinksSugestions.length > 0
          && selectedDrinksSugestions.map((drink, i) => {
            if (i <= numberDrinksSugestions) {
              return (
                <Carousel.Item>
                  <Link to={ `/bebidas/${drink.idDrink}` }>
                    <img
                      data-testid={ `${i}-recomendation-card` }
                      src={ drink.strDrinkThumb }
                      alt="Foto do Drink"
                      className="d-block w-100"
                    />
                    <Carousel.Caption>
                      <h3
                        data-testid={ `${i}-recomendation-title` }
                      >
                        { drink.strDrink }
                      </h3>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              );
            }
            return null;
          }) }
      </Carousel>
      <Link to={ `/comidas/${id}/in-progress` }>
        {
          checkRecipeInProgress(id)
            ? (
              <button
                // style={ { position: 'fixed' } }
                type="button"
                data-testid="start-recipe-btn"
              >
                Continuar Receita
              </button>)
            : (
              <button
                // style={ { position: 'fixed' } }
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => (
                  initialRecipe(id)
                ) }
              >
                Iniciar Receita
              </button>
            )
        }
      </Link>
    </div>
  );
}
