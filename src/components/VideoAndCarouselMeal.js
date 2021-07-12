import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getMealApiSugestions } from '../services/api';

function VideoAndCarouselMeal() {
  const numberMealsSugestions = 5;
  const [mealsSugestions, setMealsSugestions] = useState({});

  useState(() => {
    const handleStateMealSugestions = async () => {
      const meals = await getMealApiSugestions();
      setMealsSugestions(meals);
    };
    handleStateMealSugestions();
  }, []);

  return (
    <Carousel>
      {
        mealsSugestions !== null && mealsSugestions.length > 0
            && mealsSugestions.map((meal, i) => {
              if (i <= numberMealsSugestions) {
                return (
                  <Carousel.Item key={ meal.idMeal }>
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
  );
}

export default VideoAndCarouselMeal;
