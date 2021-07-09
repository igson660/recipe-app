import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import { getDrinkApi, getMealApiSugestions } from '../services/api';
import iconShared from '../images/shareIcon.svg';
import iconFavorite from '../images/whiteHeartIcon.svg';
import Footer from '../components/Footer';
import useRecipesInProgressContext from '../hooks/mealInProgress';

export default function DrinkDetail() {
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];
  const { selectedDrink, setSelectedDrink } = useSearchBar();
  const [ingredientsDrink, setIngredientsDrink] = useState([]);
  const [mealsSugestions, setMealsSugestions] = useState({});
  const numberMealsSugestions = 5;
  const { recipeInProgress, setRecipeInProgress } = useRecipesInProgressContext();

  useEffect(() => {
    const handleStateDrink = async () => {
      const drinks = await getDrinkApi(id);
      setSelectedDrink(drinks[0]);
      const limit = 20;
      for (let ind = 1; ind <= limit; ind += 1) {
        if (`${drinks[0][`strIngredient${ind}`]}` === 'null'
        || `${drinks[0][`strIngredient${ind}`]}` === ''
        || `${drinks[0][`strIngredient${ind}`]}` === 'undefined'
        || `${drinks[0][`strIngredient${ind}`]}` === null
        || `${drinks[0][`strIngredient${ind}`]}` === undefined
        ) {
          return;
        }
        setIngredientsDrink((oldArray) => [
          ...oldArray,
          `${drinks[0][`strIngredient${ind}`]} - ${drinks[0][`strMeasure${ind}`]}`,
        ]);
        // expressão `${meals[0][`strIngredient${ind}`]}` retirada da solução do Grupo 6 - Turma 9
      }
    };
    handleStateDrink();
  }, [setSelectedDrink, pathname, id]);

  useState(() => {
    const handleStateMealSugestions = async () => {
      const meals = await getMealApiSugestions();
      setMealsSugestions(meals);
    };
    handleStateMealSugestions();
  }, []);

  function checkRecipeInProgress(checkId) {
    const allRecipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || {};
    if (!allRecipesInProgress.cocktails) {
      return false;
    }
    return Object.keys(allRecipesInProgress.cocktails).find((key) => key === checkId);
  }

  function initialRecipe(drinkId) {
    const newLocalStorage = {
      ...recipeInProgress,
      cocktails: { ...recipeInProgress.cocktails, [drinkId]: ingredientsDrink } };
    setRecipeInProgress(newLocalStorage);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
  }

  function checkRecipeDone(mealId) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes[0].id) {
      return false;
    }
    return doneRecipes.find((recipe) => Number(recipe.id) === Number(mealId));
  }

  return (
    <div>
      <Image
        data-testid="recipe-photo"
        src={ selectedDrink.strDrinkThumb }
        alt={ `Foto drinksda Bebida ${selectedDrink.strDrink}` }
        fluid
      />
      <Container>
        <Row>
          <Col>
            <h3 data-testid="recipe-title">{ selectedDrink.strDrink }</h3>
          </Col>
          <Col>
            <img
              data-testid="share-btn"
              src={ iconShared }
              alt="Compartilhar Drink"
            />
          </Col>
          <Col>
            <img
              src={ iconFavorite }
              alt="Clique para Favoritar esta Receita"
              data-testid="favorite-btn"
            />
          </Col>
        </Row>
      </Container>
      <p data-testid="recipe-category">{ selectedDrink.strAlcoholic }</p>
      <ul>
        {
          (ingredientsDrink !== null && ingredientsDrink.length > 0)
            && ingredientsDrink.map((ingred, indice) => (
              <li
                data-testid={ `${indice - 1}-ingredient-name-and-measure` }
                key={ ingred }
              >
                { ingred }
              </li>
            ))
        }
      </ul>
      <p data-testid="instructions">{ selectedDrink.strInstructions }</p>
      <Carousel>
        {
          mealsSugestions !== null && mealsSugestions.length > 0
            && mealsSugestions.map((meal, i) => {
              if (i <= numberMealsSugestions) {
                return (
                  <Carousel.Item key={ meal.idMeal }>
                    <Link to={ `/comidas/${meal.idMeal}` }>
                      <img
                        data-testid={ `${i}-recomendation-card` }
                        src={ meal.strMealThumb }
                        alt="Foto Comida Sugestionada"
                        className="d-block w-100"
                      />
                      <Carousel.Caption>
                        <h3
                          data-testid={ `${i}-recomendation-title` }
                        >
                          { meal.strMeal }
                        </h3>
                      </Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                );
              }
              return null;
            })
        }
      </Carousel>
      <Link to={ `/bebidas/${id}/in-progress` }>
        { !checkRecipeDone(id)
          && (checkRecipeInProgress(id)
            ? (
              <button
                style={ { position: 'fixed', bottom: '0', left: 0, zIndex: '10' } }
                type="button"
                data-testid="start-recipe-btn"
              >
                Continuar Receita
              </button>)
            : (
              <button
                style={ { position: 'fixed', bottom: '0', right: 0, zIndex: '10' } }
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => (
                  initialRecipe(id)
                ) }
              >
                Iniciar Receita
              </button>)
          )}
      </Link>
      <Footer />
    </div>
  );
}
