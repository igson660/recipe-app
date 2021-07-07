import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';

export default function ButtonsProfile() {
  return (
    <>
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
    </>
  );
}
