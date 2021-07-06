import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { SearchBarContextProvider } from '../contexts/searchBarContext';
import { HeaderContextProvider } from '../contexts/headerContext';
import Recipes from '../pages/Recipes';
import tomatoesMock from './mocks/searchBar/Tomatoes';
import * as api from '../services/api';
import drinksMock from './mocks/searchBar/drinkMock';

const SEARCH_INPUT = 'search-input';
const SEARCH_BUTTON = 'search-top-btn';
const EXEC_SEARCH = 'exec-search-btn';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';

describe('Teste componente SearchBar', () => {
  afterEach(cleanup);
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
  test(
    '4 -Verifica se ao fazer uma busca em /comidas com retorna os elementos corretos',
    async () => {
      renderWithRouter(
        <HeaderContextProvider>
          <SearchBarContextProvider>
            <Recipes />
          </SearchBarContextProvider>
        </HeaderContextProvider>,
        '/comidas',
      );

      const mockRecipeApi = jest
        .spyOn(api, 'searchRecipesByIngredients')
        .mockResolvedValue(tomatoesMock.meals);

      const searchBtn = screen.getByTestId(SEARCH_BUTTON);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(SEARCH_INPUT);
      userEvent.type(searchInput, 'Tomatoes');
      const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
      userEvent.click(ingredientRadio);
      const execBtn = screen.getByTestId(EXEC_SEARCH);
      userEvent.click(execBtn);

      expect(mockRecipeApi).toHaveBeenCalledWith('/comidas', 'Tomatoes');
      const MAX_NUMBER_OF_CARDS = 12;
      const tomatoesArray = [...Array(MAX_NUMBER_OF_CARDS).keys()]
        .map((item, index) => `${index}-recipe-card`);
      const promisesArray = tomatoesArray.map((id) => screen.findByTestId(id));
      const resolvedArray = await Promise.all(promisesArray);
      resolvedArray.forEach((item) => expect(item).toBeInTheDocument());

      const inexisitingCard = screen.queryByTestId('12-recipe-card');
      expect(inexisitingCard).not.toBeInTheDocument();
    },
  );
  test(
    '5 -Verifica se ao fazer uma busca em /bebidas retorna os elementos corretos',
    async () => {
      renderWithRouter(
        <HeaderContextProvider>
          <SearchBarContextProvider>
            <Recipes />
          </SearchBarContextProvider>
        </HeaderContextProvider>,
        '/bebidas',
      );

      const mockRecipeApi = jest
        .spyOn(api, 'searchRecipesByName')
        .mockResolvedValue(drinksMock.drinks);

      const searchBtn = screen.getByTestId(SEARCH_BUTTON);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(SEARCH_INPUT);
      userEvent.type(searchInput, 'Bloody');
      const nameRadio = screen.getByTestId(NAME_RADIO);
      userEvent.click(nameRadio);
      const execBtn = screen.getByTestId(EXEC_SEARCH);
      userEvent.click(execBtn);

      expect(mockRecipeApi).toHaveBeenCalledWith('/bebidas', 'Bloody');
      const NUMBER_OF_CARDS = 3;
      const indexArray = [...Array(NUMBER_OF_CARDS).keys()]
        .map((item, index) => `${index}-recipe-card`);
      const promisesArray = indexArray.map((id) => screen.findByTestId(id));
      const resolvedArray = await Promise.all(promisesArray);
      resolvedArray.forEach((item) => expect(item).toBeInTheDocument());
    },
  );
});
