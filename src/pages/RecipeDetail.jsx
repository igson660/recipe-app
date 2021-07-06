import React, { useEffect, useState } from 'react';
import { Card, Container, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useSearchBar from '../hooks/searchBar';
import iconShared from '../images/shareIcon.svg';
import iconFavorite from '../images/whiteHeartIcon.svg';

export default function RecipeDetail(index) {
  const { recipes, selectedMeal, setSelectedMeal } = useSearchBar();
  const { location: { pathname } } = useHistory();
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState({});

  useEffect(() => {
    const getMealApi = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=lasagna';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setDatas(results);
      setLoading(true);
    };
    getMealApi();
  }, []);

  // useEffect(() => {
  //   const id = pathname.split('/')[2];
  //   const recipe = recipes.filter((meal) => meal.idMeal === id);
  //   setSelectedMeal(recipe[0]);
  // }, [recipes, setSelectedMeal, pathname]);

  return (
    <div>
      <Image
        data-testid="recipe-photo"
        src={ selectedMeal.strMealThumb }
        alt={ `Foto do Prato ${selectedMeal.strMeal}` }
        fluid
      />
      <Container>
        <strong data-testid="recipe-title">{ selectedMeal.strMeal }</strong>
        <img
          src={ iconShared }
          alt="Compartilhar Receita"
          data-testid="share-btn"
        />
        <img
          src={ iconFavorite }
          alt="Clique para Favoritar esta Receita"
          data-testid="favorite-btn"
        />
      </Container>
      <p data-testid="recipe-category">{ selectedMeal.strCategory }</p>
      <ul data-testid={ `${index}-ingredient-name-and-measure` }>
        <li>{ selectedMeal.strIngredient1 }</li>
      </ul>
      <p data-testid="instructions">{ selectedMeal.strInstructions }</p>
      <iframe
        width="853"
        height="480"
        src={ selectedMeal.strYoutube }
        frameBorder="0"
        allowFullScreen
        title="Embedded youtube"
        data-testid="video"
      />
      <Card data-testid={ `${index}-recomendation-card` } />
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}
