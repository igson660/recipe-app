import React, { useEffect } from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import { getMealApi } from '../services/api';
import IngredientsMeal from '../components/IngredientsMeal';
import CarouselDrink from '../components/VideoAndCarouselDrink';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import ButtonsMeal from '../components/ButtonsMeal';
import '../styles/Recipes.css';

export default function RecipeDetail() {
  const { selectedMeal,
    setSelectedMeal, setIngredientsMeal } = useSearchBar();
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];

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
      }
    };
    handleStateMeal();
  }, []);

  return (
    <div id="recipeDetail">
      <Image
        data-testid="recipe-photo"
        src={ selectedMeal.strMealThumb }
        alt={ `Foto do Prato ${selectedMeal.strMeal}` }
        fluid
      />
      <Container>
        <>
          <Row>
            <p data-testid="recipe-category">{ selectedMeal.strCategory }</p>
          </Row>
          <Row>
            <h3 data-testid="recipe-title">{ selectedMeal.strMeal }</h3>
          </Row>
          <Row>
            <FavoriteButton />
            <ShareButton />
          </Row>
        </>
      </Container>
      <IngredientsMeal />
      <p data-testid="instructions">{ selectedMeal.strInstructions }</p>
      <CarouselDrink />
      <ButtonsMeal />
    </div>
  );
}
