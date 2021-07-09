import React, { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import { getMealApi } from '../services/api';
import Footer from '../components/Footer';
import IngredientsMeal from '../components/IngredientsMeal';
import CarouselDrink from '../components/VideoAndCarouselDrink';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import ButtonsMeal from '../components/ButtonsMeal';

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
        // expressão `${meals[0][`strIngredient${ind}`]}` retirada da solução do Grupo 6 - Turma 9
      }
    };
    handleStateMeal();
  }, [pathname, setSelectedMeal, id, setIngredientsMeal]);

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
      <ButtonsMeal />
      <Footer />
    </div>
  );
}
