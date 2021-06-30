import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';

export default class Header extends Component {
  render() {
    const { title, withIconSearch = true } = this.props;
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
                <Image data-testid="search-top-btn" src={ iconSearch } />
              </Col>)}
        </Row>
      </Container>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  withIconSearch: PropTypes.bool,
}.isRequired;
