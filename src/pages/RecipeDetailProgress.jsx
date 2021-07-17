import React, { useState } from 'react'; // import React
import { Container, Image, Row } from 'react-bootstrap';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import CarouselDrink from '../components/VideoAndCarouselDrink';
import IngredientsInProgressMeal from '../components/IngredientsInProgressMeal';
import useSearchBar from '../hooks/searchBar';
import FinishButton from '../components/FinishButton';
import '../styles/Recipes.css';

function RecipeDetailProgress() {
  const { selectedMeal } = useSearchBar();
  const [isFinished, setIsFinished] = useState(false);

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
      <IngredientsInProgressMeal isFinished={ setIsFinished } />
      <p data-testid="instructions">{ selectedMeal.strInstructions }</p>
      <CarouselDrink />
      <FinishButton isFinished={ !isFinished } />
    </div>
  );
}

export default RecipeDetailProgress;
