import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

export default function FavoriteCard({ thumbnail, name, index, id }) {
  return (
    <Container>
      <Row>
        <Col data-testid={ `${index}-recipe-card` }>
          <Link to={ `/comidas/${id}` }>
            <img
              src={ thumbnail }
              alt={ `foto do prato ${name}` }
              data-testid={ `${index}-card-img` }
            />
          </Link>
        </Col>
        <Col>
          <h2 data-testid={ `${index}-card-name` }>{name}</h2>
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
