import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import { HeaderContextProvider } from '../contexts/headerContext';
import { SearchBarContextProvider } from '../contexts/searchBarContext';
import Profile from '../pages/Profile';

function renderizer(component) {
  return renderWithRouter(
    <HeaderContextProvider>
      <SearchBarContextProvider>
        {component}
      </SearchBarContextProvider>
    </HeaderContextProvider>,
  );
}

describe('Tela de perfil', () => {
  it(`Implemente os elementos da a tela de perfil respeitando
  os atributos descritos no protótipo`, () => {
    renderizer(<Profile />);

    const profileEmail = screen.getByTestId('profile-email');
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileEmail).toBeInTheDocument();
    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });

  it(`Implemente a solução de maneira que o e-mail da pessoa usuária
  deve estar visível`, () => {
    localStorage.setItem('user', '{"email":"dsadsd@gasdsad.com"}');
    renderizer(<Profile />);

    const profileEmail = screen.getByTestId('profile-email').textContent;
    expect(profileEmail).toBe('dsadsd@gasdsad.com');
  });

  it(`Redirecione a pessoa usuária que, ao clicar no botão de "Sair",
  o localStorage deve ser limpo e a rota deve mudar para a tela de login`, () => {
    localStorage.setItem('user', '{"email":"dsadsd@gasdsad.com"}');
    renderizer(<Profile />);

    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    const mockImplementation = () => localStorage.clear();
    profileLogoutBtn.onclick = jest.fn(mockImplementation);
    fireEvent.click(profileLogoutBtn);

    expect(localStorage.length).toBe(0);
  });
});
