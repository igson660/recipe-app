import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
import useHeader from '../hooks/header';

export default function Header({ title, withIconSearch = true }) {
  const { toggleSearchBar, setToggleSearchBar } = useHeader();
  return (
    <Container fluid>
      <Row className="p-2">
        <Link to="/perfil">
          <Image
            data-testid="profile-top-btn"
            src={ iconProfile }
          />
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
              <span className="text-right">
                <Image
                  onClick={ () => setToggleSearchBar(!toggleSearchBar) }
                  data-testid="search-top-btn"
                  src={ iconSearch }
                />
              </span>)}
      </Row>
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  withIconSearch: PropTypes.bool,
}.isRequired;
