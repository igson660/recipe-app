import React, { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import { getMealApi } from '../services/api';
import useRecipesInProgressContext from '../hooks/mealInProgress';
import Footer from '../components/Footer';
import IngredientsMeal from '../components/IngredientsMeal';
import CarouselDrink from '../components/VideoAndCarouselDrink';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

export default function RecipeDetail() {
  const { selectedMeal,
    setSelectedMeal, ingredientsMeal, setIngredientsMeal } = useSearchBar();
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
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
  }, [pathname, setSelectedMeal, id, setIngredientsMeal]);

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
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || {};
    if (Object.keys(doneRecipes).length === 0) {
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
            <ShareButton />
          </Col>
          <Col>
            <FavoriteButton />
          </Col>
        </Row>
      </Container>
      <p data-testid="recipe-category">{ selectedMeal.strCategory }</p>
      <IngredientsMeal />
      <p data-testid="instructions">{ selectedMeal.strInstructions }</p>
      <CarouselDrink />
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
