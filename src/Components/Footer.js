import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import iconDrinks from '../images/drinkIcon.svg';
import iconMeals from '../images/mealIcon.svg';
import iconExplorer from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer>
      <Card.Footer data-testid="footer">
        <img data-testid="drinks-bottom-btn" src={ iconDrinks } alt="Menu de Drinks" />
        <img
          data-testid="explore-bottom-btn"
          src={ iconExplorer }
          alt="Menu de Usuario"
        />
        <img data-testid="food-bottom-btn" src={ iconMeals } alt="Menu de Comidas" />
      </Card.Footer>
    </footer>
  );
}

export default Footer;
