import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../Components/Footer';
import renderWithRouter from './renderWithRouter';

describe('Teste componente Footer', () => {
  test('Ao clicar no botao Drink, renderiza bebidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinkIcon = screen.getByRole('img', {
      name: /Menu de Drinks/i,
    });
    expect(drinkIcon).toHaveAttribute('src', 'drinkIcon.svg');

    userEvent.click(drinkIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  test('Ao clicar no botao Explorar, renderiza login', () => {
    const { history } = renderWithRouter(<Footer />);

    const exploreIcon = screen.getByRole('img', {
      name: /Menu de Usuario/i,
    });
    expect(exploreIcon).toHaveAttribute('src', 'exploreIcon.svg');

    userEvent.click(exploreIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  test('Ao clicar no botao Receitas, renderiza Comidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const mealIcon = screen.getByRole('img', {
      name: /Menu de comidas/i,
    });
    expect(mealIcon).toHaveAttribute('src', 'mealIcon.svg');

    userEvent.click(mealIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
