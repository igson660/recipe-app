import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Image } from 'react-bootstrap';
import RecipeFavoriteButton from './RecipeFavoriteButton';
import iShar from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteCard({ area,
  category, thumbnail, name, index, id, setFavoritesFiltered, type, alcoholicOrNot }) {
  const [copyClipboard, setCopyClipboard] = useState(false);
  const idShared = 'horizontal-share-btn';

  function handleShareButton() {
    setCopyClipboard(true);
    copy(`http://localhost:3000/${type}s/${id}`);
  }

  return (
    <Container>
      <Row>
        <Col data-testid={ `${index}-recipe-card` }>
          <Link to={ (type === 'comida') ? `/comidas/${id}` : `/bebidas/${id}` }>
            <Image
              src={ thumbnail }
              alt={ `foto do prato ${id}` }
              data-testid={ `${index}-horizontal-image` }
              thumbnail
            />
          </Link>
        </Col>
        <Col>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { (type === 'comida') ? `${area} - ${category}` : `${alcoholicOrNot}` }
          </p>
          <Link to={ (type === 'comida') ? `/comidas/${id}` : `/bebidas/${id}` }>
            <h4 data-testid={ `${index}-horizontal-name` }>{name}</h4>
          </Link>
          <button
            type="button"
            onClick={ () => handleShareButton() }
          >
            { copyClipboard
              ? <span>Link copiado!</span>
              : <img data-testid={ `${index}-${idShared}` } src={ iShar } alt="Share" />}
          </button>
          <span>
            <RecipeFavoriteButton
              setFavoritesFiltered={ setFavoritesFiltered }
              id={ id }
              index={ index }
            />
          </span>
        </Col>
      </Row>
    </Container>
  );
}

FavoriteCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
