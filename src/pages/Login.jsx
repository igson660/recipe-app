import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import LogoPrincipal from '../images/Logo.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValidLogin: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { email } = this.state;
    const pessoa = { email };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(pessoa));
    this.setState({ isValidLogin: true });
  }

  render() {
    const { email, password, isValidLogin } = this.state;
    const minPasswordLength = 6;
    return (
      <main id="loginLayout">
        <img src={ LogoPrincipal } alt="logotipo principal do aplicativo" />
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              data-testid="email-input"
              type="email"
              placeholder="Enter email"
              value={ email }
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              data-testid="password-input"
              type="password"
              placeholder="Password"
              value={ password }
              onChange={ (e) => this.setState({ password: e.target.value }) }
            />
          </Form.Group>
          <Button
            className="btn-block rounded-pill border-light"
            data-testid="login-submit-btn"
            variant="primary"
            type="submit"
            onClick={ this.handleClick }
            disabled={ !(password.length > minPasswordLength
              && email.includes('.com') && email.includes('@')) }
          >
            Entrar
          </Button>
        </Form>
        { isValidLogin ? <Redirect to="/comidas" /> : null }
      </main>
    );
  }
}

export default Login;
