import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { SearchBarContextProvider } from '../contexts/searchBarContext';
import { HeaderContextProvider } from '../contexts/headerContext';
import Recipes from '../pages/Recipes';
import tomatoesMock from './mocks/searchBar/Tomatoes';
import * as api from '../services/api';

const SEARCH_INPUT = 'search-input';
const SEARCH_BUTTON = 'search-top-btn';
const EXEC_SEARCH = 'exec-search-btn';
const INGREDIENT_RADIO = 'ingredient-search-radio';

describe('Teste componente SearchBar', () => {
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
  test('4 -Verifica se ao fazer uma busca retorna os elementos corretos', async () => {
    renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <Recipes />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
    );
    const apiResponse = Promise.resolve({
      json: () => Promise.resolve(tomatoesMock),
      ok: true,
    });

    const mockRecipeApi = jest
      .spyOn(api, 'searchRecipesByIngredients')
      .mockImplementation(() => apiResponse);
      // .mockResolvedValue(apiResponse);

    const searchBtn = screen.getByTestId(SEARCH_BUTTON);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'Tomatoes');
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    userEvent.click(ingredientRadio);
    const execBtn = screen.getByTestId(EXEC_SEARCH);
    userEvent.click(execBtn);
    expect(mockRecipeApi).toHaveBeenCalled();

    const text = await screen.findByText('Baingan Bharta');
    expect(text).toBeInTheDocument();
  });
});
