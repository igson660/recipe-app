import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { SearchBarContextProvider } from '../contexts/searchBarContext';
import { HeaderContextProvider } from '../contexts/headerContext';
import Recipes from '../pages/Recipes';

const SEARCH_INPUT = 'search-input';
const SEARCH_BUTTON = 'search-top-btn';
const EXEC_SEARCH = 'exec-search-btn';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';

describe('teste do componnte SearchBar', () => {
  test('1 -Verifica se ao fazer login a barra de pesquisa não está na tela', () => {
    renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <Recipes />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
    );
    const searchInput = screen.queryByTestId(SEARCH_INPUT);
    expect(searchInput).not.toBeInTheDocument();
  });
  test('2 -Verifica se ao clicar no botão de busca a barra de pesquisa renderiza', () => {
    renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <Recipes />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
    );
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
  });
  test('3 -Verifica se existem todos os radios e inputs', () => {
    renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <Recipes />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
    );
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    const nameRadio = screen.getByTestId(NAME_RADIO);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    const execBtn = screen.getByTestId(EXEC_SEARCH);
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(execBtn).toBeInTheDocument();
  });
  test(
    '3 -Verifica se ao clicar no botão de busca 2x a barra de pesquisa não renderiza',
    () => {
      renderWithRouter(
        <HeaderContextProvider>
          <SearchBarContextProvider>
            <Recipes />
          </SearchBarContextProvider>
        </HeaderContextProvider>,
      );
      const searchBtn = screen.getByTestId(SEARCH_BUTTON);
      userEvent.click(searchBtn);
      userEvent.click(searchBtn);
      const searchInput = screen.queryByTestId(SEARCH_INPUT);
      expect(searchInput).not.toBeInTheDocument();
    },
  );
});
