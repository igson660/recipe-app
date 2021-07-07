import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import ButtonsProfile from '../components/ButtonsProfile';

function Profile() {
  return (
    <>
      <Header title="Perfil" withIconSearch={ false } />
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
            { ButtonsProfile() }
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Profile;

// <Route path="/receitas-feitas" exact component={ RecipeDone } />
// <Route path="/receitas-favoritas" exact component={ RecipeFavorite } />
