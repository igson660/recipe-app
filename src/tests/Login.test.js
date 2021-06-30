import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = '1234567';

describe(`1 - verifica se a página inicial de login contém os seguintes campos e 
características:`, () => {
  test('Rota para esta página', () => {
    const { history } = renderWithRouter(<Login />, '/');
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica local para que o usuário insira seu email e senha', () => {
    renderWithRouter(<Login />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Verifica se existe um botão ', () => {
    renderWithRouter(<Login />, '/');

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeInTheDocument();
  });
});

describe(`Verifica as seguintes verificações nos campos de email,
senha e botão:`, () => {
  test('Verifica se o botão de "Entrar" está desabilitado ao entrar na página', () => {
    renderWithRouter(<Login />, '/');

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();
  });

  test(`Verifica se i botão de "Entrar está desabilitado quando um email 
  inválido é digitado`, () => {
    renderWithRouter(<Login />, '/');

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, 'email');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'test@test@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'test@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'test@test.');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
  });

  test(`Verifica se o botão de "Entrar está desabilitado quando uma senha 
inválida é digitada`, () => {
    renderWithRouter(<Login />, '/');

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, '23456');
    expect(button).toBeDisabled();
  });

  test(`Verifica se o botão de "Entrar" está habilitado 
  quando um email e uma senha válidos são passados`, () => {
    renderWithRouter(<Login />, '/');

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });

  test('Verifica se a rota muda para \'/comidas\' após o clique no botão.', () => {
    const { history } = renderWithRouter(<Login />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/comidas');
  });
});
