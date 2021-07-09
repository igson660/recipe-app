import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import { getDrinkApi, getMealApiSugestions } from '../services/api';
import iconShared from '../images/shareIcon.svg';
import iconFavorite from '../images/whiteHeartIcon.svg';
import Footer from '../components/Footer';

export default function DrinkDetail() {
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];
  const { selectedDrink, setSelectedDrink } = useSearchBar();
  const [ingredientsDrink, setIngredientsDrink] = useState([]);
  const [mealsSugestions, setMealsSugestions] = useState({});
  const numberMealsSugestions = 5;

  useEffect(() => {
    const handleStateDrink = async () => {
      const drinks = await getDrinkApi(id);
      setSelectedDrink(drinks[0]);
      const limit = 20;
      for (let ind = 0; ind <= limit; ind += 1) {
        setIngredientsDrink((oldValue) => [
          ...oldValue,
          `${drinks[0][`strIngredient${ind}`]} - ${drinks[0][`strMeasure${ind}`]}`]);
      }
    };
    handleStateDrink();
  }, [setSelectedDrink, pathname, id]);

  useState(() => {
    const handleStateMealSugestions = async () => {
      const meals = await getMealApiSugestions();
      setMealsSugestions(meals);
    };
    handleStateMealSugestions();
  }, []);

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
            <img
              data-testid="share-btn"
              src={ iconShared }
              alt="Compartilhar Drink"
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
      <p data-testid="recipe-category">{ selectedDrink.strAlcoholic }</p>
      <ul>
        { (ingredientsDrink !== null && ingredientsDrink.length > 0)
          ? ingredientsDrink.map((ingred, indice) => {
            if (ingred !== ' - ' && ingred !== 'null - null'
              && ingred !== 'undefined - undefined') {
              return (
                <li
                  data-testid={ `${indice - 1}-ingredient-name-and-measure` }
                  key={ ingred }
                >
                  { ingred }
                </li>
              );
            }
            return null;
          }) : <h3>Carregando...</h3>}
      </ul>
      <p data-testid="instructions">{ selectedDrink.strInstructions }</p>
      <Carousel>
        {
          mealsSugestions !== null && mealsSugestions.length > 0
            && mealsSugestions.map((meal, i) => {
              if (i <= numberMealsSugestions) {
                return (
                  <Carousel.Item>
                    <Link to={ `/comidas/${meal.idMeal}` }>
                      <img
                        data-testid={ `${i}-recomendation-card` }
                        src={ meal.strMealThumb }
                        alt="Foto Comida Sugestionada"
                        className="d-block w-100"
                      />
                      <Carousel.Caption>
                        <h3
                          data-testid={ `${i}-recomendation-title` }
                        >
                          { meal.strMeal }
                        </h3>
                      </Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                );
              }
              return null;
            })
        }
      </Carousel>
      <button
        style={ { position: 'fixed' } }
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
      <Footer />
    </div>
  );
}
