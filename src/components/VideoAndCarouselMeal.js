import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getDrinkApiSugestions } from '../services/api';
import useSearchBar from '../hooks/searchBar';

function VideoAndCarouselDrink() {
  const { selectedDrink } = useSearchBar();
  const numberDrinksSugestions = 5;
  const [selectedDrinksSugestions, setSelectedDrinksSugestions] = useState({});

  useEffect(() => {
    const handleStateDrinkSugestions = async () => {
      const drinks = await getDrinkApiSugestions();
      setSelectedDrinksSugestions(drinks);
    };
    handleStateDrinkSugestions();
  }, []);

  return (
    <>
      {
        (selectedDrink.strYoutube !== undefined)
          ? (
            <iframe
              data-testid="video"
              src={ selectedDrink.strYoutube.replace('watch?v=', 'embed/') }
              title="Recipe"
            />
          ) : null
      }
      <Carousel>
        { selectedDrinksSugestions !== null && selectedDrinksSugestions.length > 0
          && selectedDrinksSugestions.map((drink, i) => {
            if (i <= numberDrinksSugestions) {
              return (
                <Carousel.Item key={ drink.idDrink }>
                  <Link to={ `/bebidas/${drink.idDrink}` }>
                    <img
                      data-testid={ `${i}-recomendation-card` }
                      src={ drink.strDrinkThumb }
                      alt="Foto do Drink"
                      className="d-block w-100"
                    />
                    <Carousel.Caption>
                      <h3
                        data-testid={ `${i}-recomendation-title` }
                      >
                        { drink.strDrink }
                      </h3>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              );
            }
            return null;
          }) }
      </Carousel>
    </>
  );
}

export default VideoAndCarouselDrink;
