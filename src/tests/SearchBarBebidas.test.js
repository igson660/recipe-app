import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { SearchBarContextProvider } from '../contexts/searchBarContext';
import { HeaderContextProvider } from '../contexts/headerContext';
import Drinks from '../pages/Drinks';
import * as api from '../services/api';
import drinksMock from './mocks/searchBar/drinksMock';
import limeMock from './mocks/searchBar/limeMock';
import firstLetterDrinkMock from './mocks/searchBar/firstLetterDrinkMock';

const SEARCH_INPUT = 'search-input';
const SEARCH_BUTTON = 'search-top-btn';
const EXEC_SEARCH = 'exec-search-btn';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';
describe('Teste da página /bebidas', () => {
  afterEach(cleanup);
  test(
    `1 -Verifica se ao fazer uma busca em /bebidas
    com ingredientes retorna os elementos corretos`,
    async () => {
      renderWithRouter(
        <HeaderContextProvider>
          <SearchBarContextProvider>
            <Drinks />
          </SearchBarContextProvider>
        </HeaderContextProvider>,
        '/bebidas',
      );

      const mockRecipeApi = jest
        .spyOn(api, 'searchRecipesByIngredients')
        .mockResolvedValue(limeMock.drinks);

      const searchBtn = screen.getByTestId(SEARCH_BUTTON);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(SEARCH_INPUT);
      userEvent.type(searchInput, 'Lime');
      const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
      userEvent.click(ingredientRadio);
      const execBtn = screen.getByTestId(EXEC_SEARCH);
      userEvent.click(execBtn);

      expect(mockRecipeApi).toHaveBeenCalledWith('/bebidas', 'Lime');
      const MAX_NUMBER_OF_CARDS = 12;
      const indexArray = [...Array(MAX_NUMBER_OF_CARDS).keys()]
        .map((item, index) => `${index}-recipe-card`);
      const promisesArray = indexArray.map((id) => screen.findByTestId(id));
      const resolvedArray = await Promise.all(promisesArray);
      resolvedArray.forEach((item) => expect(item).toBeInTheDocument());

      const inexisitingCard = screen.queryByTestId('12-recipe-card');
      expect(inexisitingCard).not.toBeInTheDocument();
    },
  );
  test(
    `2 -Verifica se ao fazer uma busca em /bebidas com nome
    retorna os elementos corretos`,
    async () => {
      renderWithRouter(
        <HeaderContextProvider>
          <SearchBarContextProvider>
            <Drinks />
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
  test(
    `3 -Verifica se ao fazer uma busca em /bebidas
    com primeira letra retorna os elementos corretos`,
    async () => {
      renderWithRouter(
        <HeaderContextProvider>
          <SearchBarContextProvider>
            <Drinks />
          </SearchBarContextProvider>
        </HeaderContextProvider>,
        '/bebidas',
      );

      const mockRecipeApi = jest
        .spyOn(api, 'searchRecipesByFirstLetter')
        .mockResolvedValue(firstLetterDrinkMock.drinks);

      const searchBtn = screen.getByTestId(SEARCH_BUTTON);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(SEARCH_INPUT);
      userEvent.type(searchInput, 'y');
      const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
      userEvent.click(firstLetterRadio);
      const execBtn = screen.getByTestId(EXEC_SEARCH);
      userEvent.click(execBtn);

      expect(mockRecipeApi).toHaveBeenCalledWith('/bebidas', 'y');

      const text = await screen.findByText('Yellow Bird');
      expect(text).toBeInTheDocument();

      const inexisitingCard = screen.queryByTestId('2-recipe-card');
      expect(inexisitingCard).not.toBeInTheDocument();
    },
  );
  test(
    `4 -Verifica se ao fazer uma busca em /bebidas
    sem resultados retorna corrretamente`,
    async () => {
      renderWithRouter(
        <HeaderContextProvider>
          <SearchBarContextProvider>
            <Drinks />
          </SearchBarContextProvider>
        </HeaderContextProvider>,
        '/bebidas',
      );

      const mockRecipeApi = jest
        .spyOn(api, 'searchRecipesByName')
        .mockResolvedValue(null);

      const searchBtn = screen.getByTestId(SEARCH_BUTTON);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(SEARCH_INPUT);
      userEvent.type(searchInput, 'xablau');
      const nameRadio = screen.getByTestId(NAME_RADIO);
      userEvent.click(nameRadio);
      const execBtn = screen.getByTestId(EXEC_SEARCH);
      userEvent.click(execBtn);

      expect(mockRecipeApi).toHaveBeenCalledWith('/bebidas', 'xablau');

      const inexisitingCard = screen.queryByTestId('0-recipe-card');
      expect(inexisitingCard).not.toBeInTheDocument();
    },
  );
});
