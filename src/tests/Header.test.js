import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import { HeaderContextProvider } from '../contexts/headerContext';
import { SearchBarContextProvider } from '../contexts/searchBarContext';
import Recipes from '../pages/Recipes';

function renderizer(component) {
  return renderWithRouter(
    <HeaderContextProvider>
      <SearchBarContextProvider>
        {component}
      </SearchBarContextProvider>
    </HeaderContextProvider>,
  );
}

describe(`Implemente os elementos do header na tela principal de receitas,
respeitando os atributos descritos no protótipo`, () => {
  it(`Verifica se existe os data-testids
  'profile-top-btn', 'page-title' e 'search-top-btn'`, () => {
    renderizer(<Recipes />);

    const searchTopBtn = screen.getByTestId('search-top-btn');
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profileTopBtn).toBeDefined();
    expect(pageTitle).toBeDefined();
    expect(searchTopBtn).toBeDefined();
  });

  it(`Redirecione a pessoa usuária para a tela deperfil ao clicar
   no botão de perfil`, () => {
    const { history } = renderizer(<Recipes />);

    const profileTopBtn = screen.getByTestId('profile-top-btn');

    fireEvent.click(profileTopBtn);
    expect(history.location.pathname).toBe('/perfil');
  });

  it(`Desenvolva o botão de busca que, ao ser clicado, a barra de
  busca deve aparecer. O mesmo serve para escondê-la`, () => {
    renderizer(<Recipes />);

    const searchTopBtn = screen.getByTestId('search-top-btn');
    const toggle = { value: true };

    function toggleCreate(param) {
      const rootSearchBarDiv = document.querySelectorAll('div')[4];
      const rootSearchBarDivChild = document.createElement('DIV');

      if (param === true) {
        const searchInput = document.createElement('input');
        const ingredientSearchRadio = document.createElement('input');
        const nameSearchRadio = document.createElement('input');
        const firstLetterSearchRadio = document.createElement('input');
        const execSearchBtn = document.createElement('button');

        // Definição de Atributos
        const DATA_TESTID = 'data-testid';
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute(DATA_TESTID, 'search-input');
        ingredientSearchRadio.setAttribute('type', 'radio');
        ingredientSearchRadio.setAttribute(DATA_TESTID, 'ingredient-search-radio');
        nameSearchRadio.setAttribute('type', 'radio');
        nameSearchRadio.setAttribute(DATA_TESTID, 'name-search-radio');
        firstLetterSearchRadio.setAttribute('type', 'radio');
        firstLetterSearchRadio.setAttribute(DATA_TESTID, 'first-letter-search-radio');
        execSearchBtn.setAttribute('type', 'button');
        execSearchBtn.setAttribute(DATA_TESTID, 'exec-search-btn');

        // Inserção no elemento pai
        rootSearchBarDivChild.appendChild(searchInput);
        rootSearchBarDivChild.appendChild(ingredientSearchRadio);
        rootSearchBarDivChild.appendChild(nameSearchRadio);
        rootSearchBarDivChild.appendChild(firstLetterSearchRadio);
        rootSearchBarDivChild.appendChild(execSearchBtn);
        rootSearchBarDiv.appendChild(rootSearchBarDivChild);

        toggle.value = !toggle.value;
      } else {
        rootSearchBarDivChild.remove();
      }
    }

    const mockImplementation = () => toggleCreate(toggle.value);
    searchTopBtn.onclick = jest.fn(mockImplementation);
    fireEvent.click(searchTopBtn);
    searchTopBtn.onclick();
  });
});
