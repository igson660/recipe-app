import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import iconShared from '../images/shareIcon.svg';
import iconFavorite from '../images/whiteHeartIcon.svg';
import { getMealApi, getDrinkApi } from '../services/api';

export default function RecipeDetail(index) {
  const numberDrinks = 5;
  const { selectedMeal, setSelectedMeal } = useSearchBar();
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];
  const [selectedDrinks, setSelectedDrinks] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    // const id = pathname.split('/')[2];
    const handleStateMeal = async () => {
      const meals = await getMealApi(id);
      setSelectedMeal(meals[0]);
      for (let ind = 0; ind <= 20; ind += 1) {
        // expressão `${meals[0][`strIngredient${ind}`]}` retirada da solução do Grupo 6 - Turma 9
        setIngredients((oldArray) => [...oldArray, `${meals[0][`strIngredient${ind}`]}`]);
      }
    };
    handleStateMeal();
  }, [pathname, setSelectedMeal, setSelectedDrinks, id]);

  useEffect(() => {
    const handleStateDrink = async () => {
      const drinks = await getDrinkApi();
      setSelectedDrinks(drinks);
    };
    handleStateDrink();
  }, []);

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
            <h4 data-testid="recipe-title">{ selectedMeal.strMeal }</h4>
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
        {
          (ingredients !== null && ingredients.length > 0)
            ? ingredients.map((ingred) => {
              if (ingred !== '' && ingred !== 'undefined' && ingred !== 'null') {
                return (
                  <li key={ ingred }>{ ingred }</li>
                );
              }
            }) : <h4>Carregando...</h4>
        }
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
      <Carousel data-testid={ `${index}-h-card` }>
        { selectedDrinks !== null && selectedDrinks.length > 0
          && selectedDrinks.map((drink, i) => {
            if (i <= numberDrinks) {
              return (
                <Carousel.Item>
                  <img
                    src={ drink.strDrinkThumb }
                    alt="Foto do Drink"
                    className="d-block w-100"
                  />
                </Carousel.Item>
              );
            }
          }) }
      </Carousel>
      <Link to={ `/comidas/${id}/in-progress` }>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </Link>
    </div>
  );
}
