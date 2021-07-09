import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import iconShared from '../images/shareIcon.svg';
import iconFavorite from '../images/whiteHeartIcon.svg';
import { getMealApi, getDrinkApiSugestions } from '../services/api';
import useRecipesInProgressContext from '../hooks/mealInProgress';
import Footer from '../components/Footer';

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
      for (let ind = 1; ind <= limit; ind += 1) {
        if (`${meals[0][`strIngredient${ind}`]}` === ''
        || `${meals[0][`strIngredient${ind}`]}` === null
        || `${meals[0][`strIngredient${ind}`]}` === undefined
        || `${meals[0][`strIngredient${ind}`]}` === 'null'
        || `${meals[0][`strIngredient${ind}`]}` === 'undefined'
        ) {
          return;
        }
        setIngredientsMeal((oldArray) => [
          ...oldArray,
          `${meals[0][`strIngredient${ind}`]} - ${meals[0][`strMeasure${ind}`]}`,
        ]);
        // expressão `${meals[0][`strIngredient${ind}`]}` retirada da solução do Grupo 6 - Turma 9
      }
    };
    handleStateMeal();
  }, [pathname, setSelectedMeal, setSelectedDrinksSugestions, id]);

  useEffect(() => {
    const handleStateDrinkSugestions = async () => {
      const drinks = await getDrinkApiSugestions();
      setSelectedDrinksSugestions(drinks);
      localStorage.setItem('doneRecipes', JSON.stringify([{ id: 52775 }]));
    };
    handleStateDrinkSugestions();
  }, []);

  function checkRecipeInProgress(checkId) {
    const allRecipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || {};
    if (!allRecipesInProgress.meals) {
      return false;
    }
    return Object.keys(allRecipesInProgress.meals).find((key) => key === checkId);
  }

  function initialRecipe(mealId) {
    const newLocalStorage = {
      ...recipeInProgress,
      meals: { ...recipeInProgress.meals, [mealId]: ingredientsMeal } };
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
            />
          </Col>
        </Row>
      </Container>
      <p data-testid="recipe-category">{ selectedMeal.strCategory }</p>
      <ul>
        {
          (ingredientsMeal !== null && ingredientsMeal.length > 0)
            && ingredientsMeal.map((ingred, indice) => (
              <li
                data-testid={ `${indice - 1}-ingredient-name-and-measure` }
                key={ ingred }
              >
                { ingred }
              </li>
            ))
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
                <Carousel.Item key={ drink.idDrink }>
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
