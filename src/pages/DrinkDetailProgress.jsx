import React, { useEffect, useState } from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import { getDrinkApi } from '../services/api';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import VideoAndCarouselMeal from '../components/VideoAndCarouselMeal';
import IngredientsInProgressDrink from '../components/IngredientsInProgressDrink';
import FinishButton from '../components/FinishButton';
import '../styles/Recipes.css';

export default function DrinkDetail() {
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];
  const { selectedDrink,
    setSelectedDrink, setIngredientsDrink } = useSearchBar();
  const [isFinished, setIsFinished] = useState(false);

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
      }
    };
    handleStateDrink();
  }, [setSelectedDrink, pathname, id, setIngredientsDrink]);

  return (
    <div id="recipeDetail">
      <Image
        data-testid="recipe-photo"
        src={ selectedDrink.strDrinkThumb }
        alt={ `Foto drinksda Bebida ${selectedDrink.strDrink}` }
        fluid
      />
      <Container>
        <>
          <Row>
            <p data-testid="recipe-category">{ selectedDrink.strAlcoholic }</p>
          </Row>
          <Row>
            <h3 data-testid="recipe-title">{ selectedDrink.strDrink }</h3>
          </Row>
          <Row>
            <FavoriteButton />
            <ShareButton />
          </Row>
        </>
      </Container>
      <IngredientsInProgressDrink isFinished={ setIsFinished } />
      <p data-testid="instructions">{ selectedDrink.strInstructions }</p>
      <VideoAndCarouselMeal />
      <FinishButton isFinished={ !isFinished } />
    </div>
  );
}
