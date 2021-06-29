import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          data-testid="email-input"
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          data-testid="password-input"
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button
        data-testid="login-submit-btn"
        variant="primary"
        type="submit"
      >
        Entrar
      </Button>
    </Form>
  );
}

export default Login;
