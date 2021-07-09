import React, { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import { getDrinkApi } from '../services/api';
import Footer from '../components/Footer';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import VideoAndCarouselMeal from '../components/VideoAndCarouselMeal';
import IngredientsDrink from '../components/IngredientsDrink';
import ButtonsDrink from '../components/ButtonsDrink';

export default function DrinkDetail() {
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];
  const { selectedDrink,
    setSelectedDrink, setIngredientsDrink } = useSearchBar();

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
  }, [setSelectedDrink, pathname, id, setIngredientsDrink]);

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
            <ShareButton />
          </Col>
          <Col>
            <FavoriteButton />
          </Col>
        </Row>
      </Container>
      <p data-testid="recipe-category">{ selectedDrink.strAlcoholic }</p>
      <IngredientsDrink />
      <p data-testid="instructions">{ selectedDrink.strInstructions }</p>
      <VideoAndCarouselMeal />
      <ButtonsDrink />
      <Footer />
    </div>
  );
}
