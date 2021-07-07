import React, { useEffect } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import iconShared from '../images/shareIcon.svg';
import iconFavorite from '../images/whiteHeartIcon.svg';
import { getMealApi, getDrinkApi } from '../services/api';

export default function RecipeDetail(index) {
  const { selectedMeal, setSelectedMeal } = useSearchBar();
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const id = pathname.split('/')[2];
    const handleState = async () => {
      const meals = await getMealApi(id);
      const drinks = await getDrinkApi();
      setSelectedMeal(meals[0]);
      console.log(drinks);
    };
    handleState();
  }, [pathname, setSelectedMeal]);

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
            <strong data-testid="recipe-title">{ selectedMeal.strMeal }</strong>
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
      <ul data-testid={ `${index}-ingredient-name-and-measure` }>
        <li>{ selectedMeal.strIngredient1 }</li>
      </ul>
      <p data-testid="instructions">{ selectedMeal.strInstructions }</p>
      {
        selectedMeal.strYoutube !== undefined
          ? <iframe
              data-testid="video"
              src={ selectedMeal.strYoutube.replace('watch?v=', 'embed/') }
              title="Recipe"
          /> : null
      }
      <Card data-testid={ `${index}-h-card` } />
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}
