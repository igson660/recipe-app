import React, { useState } from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import useSearchBar from '../hooks/searchBar';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import VideoAndCarouselMeal from '../components/VideoAndCarouselMeal';
import IngredientsInProgressDrink from '../components/IngredientsInProgressDrink';
import FinishButton from '../components/FinishButton';
import '../styles/Recipes.css';

export default function DrinkDetail() {
  const { selectedDrink } = useSearchBar();
  const [isFinished, setIsFinished] = useState(false);

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
