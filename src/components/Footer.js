import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import iconDrinks from '../images/drinkIcon.svg';
import iconMeals from '../images/mealIcon.svg';
import iconExplorer from '../images/exploreIcon.svg';

function Footer() {
  return (
    <Card.Footer data-testid="footer" className="footerClass">
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" src={ iconDrinks } alt="Menu de Drinks" />
      </Link>
      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          src={ iconExplorer }
          alt="Menu de Usuario"
        />
      </Link>
      <Link to="/comidas">
        <img data-testid="food-bottom-btn" src={ iconMeals } alt="Menu de Comidas" />
      </Link>
    </Card.Footer>
  );
}

export default Footer;
