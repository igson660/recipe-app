import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Col, Container, Row, Image } from 'react-bootstrap';
import RecipeFavoriteButton from './RecipeFavoriteButton';
// import iShar from '../images/shareIcon.svg';

// const copy = require('clipboard-copy');

export default function FavoriteCard({ area,
  category, thumbnail, name, index, id, setFavoritesFiltered, type, alcoholicOrNot }) {
  // const [copyClipboard, setCopyClipboard] = useState(false);
  // const idShared = 'horizontal-share-btn';

  // function handleShareButton() {
  //   setCopyClipboard(true);
  //   copy(`http://localhost:3000/${type}s/${id}`);
  // }

  return (
    <div className="listItems">
      <div className="recipeDoneCard" data-testid={ `${index}-recipe-card` }>
        <Link to={ (type === 'comida') ? `/comidas/${id}` : `/bebidas/${id}` }>
          <img
            src={ thumbnail }
            alt={ `foto do prato ${id}` }
            data-testid={ `${index}-horizontal-image` }
            thumbnail
          />
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        </Link>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {(type === 'comida') ? `${area} - ${category}` : `${alcoholicOrNot}`}
        </p>
        <span>
          <RecipeFavoriteButton
            setFavoritesFiltered={ setFavoritesFiltered }
            id={ id }
            index={ index }
          />
        </span>
        {/* <button
          type="button"
          onClick={() => handleShareButton()}
        >
          {copyClipboard
            ? <span>Link copiado!</span>
            : <img data-testid={`${index}-${idShared}`} src={iShar} alt="Share" />}
        </button> */}
        {/* <Link to={(type === 'comida') ? `/comidas/${id}` : `/bebidas/${id}`}>
        </Link> */}
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  area: PropTypes.string,
  category: PropTypes.string,
  setFavoritesFiltered: PropTypes.func,
  alcoholicOrNot: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
