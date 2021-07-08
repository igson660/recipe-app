import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';

export default function ButtonsProfile() {
  return (
    <Container fluid>
      <Row>
        <Col className="mt-2">
          <strong>Seu Email</strong>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <span data-testid="profile-email">
            { localStorage.user && JSON.parse(localStorage.user).email }
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/receitas-favoritas">
            <Button
              variant="warning"
              className="btn-block mb-1"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </Button>
          </Link>
          <Link to="/receitas-feitas">
            <Button
              variant="success"
              className="btn-block mb-1"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="dark"
              className="btn-block"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
