import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
import useHeader from '../hooks/header';

export default function Header({ title, withIconSearch = true }) {
  const { toggleSearchBar, setToggleSearchBar } = useHeader();
  return (
    <Container className="m-1" fluid>
      <Row>
        <Link to="/perfil">
          <Col>
            <Image
              data-testid="profile-top-btn"
              src={ iconProfile }
            />
          </Col>
        </Link>
        <Col
          xs
          lg="2"
          className="text-center"
          data-testid="page-title"
        >
          {title}
        </Col>
        {withIconSearch
            && (
              <Col className="text-right">
                <Image
                  onClick={ () => setToggleSearchBar(!toggleSearchBar) }
                  data-testid="search-top-btn"
                  src={ iconSearch }
                />
              </Col>)}
      </Row>
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  withIconSearch: PropTypes.bool,
}.isRequired;
