import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { SearchBarContextProvider } from '../contexts/searchBarContext';
import { HeaderContextProvider } from '../contexts/headerContext';
import Recipes from '../pages/Recipes';
import tomatoesMock from './mocks/searchBar/Tomatoes';
import * as api from '../services/api';
import lasagnaMock from './mocks/searchBar/lasagnaMock';
import firstLetterRecipeMock from './mocks/searchBar/firstLetterRecipeMock';

const SEARCH_INPUT = 'search-input';
const SEARCH_BUTTON = 'search-top-btn';
const EXEC_SEARCH = 'exec-search-btn';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';

describe('Teste da página de comidas', () => {
  afterEach(cleanup);
  test(
    `1 -Verifica se ao fazer uma busca em /comidas
    com ingredientes retorna os elementos corretos`,
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
    `2 -Verifica se ao fazer uma busca em /comidas
    com nome retorna os elementos corretos`,
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
        .spyOn(api, 'searchRecipesByName')
        .mockResolvedValue(lasagnaMock.meals);

      const searchBtn = screen.getByTestId(SEARCH_BUTTON);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(SEARCH_INPUT);
      userEvent.type(searchInput, 'lasagna');
      const nameRadio = screen.getByTestId(NAME_RADIO);
      userEvent.click(nameRadio);
      const execBtn = screen.getByTestId(EXEC_SEARCH);
      userEvent.click(execBtn);

      expect(mockRecipeApi).toHaveBeenCalledWith('/comidas', 'lasagna');

      const text = await screen.findByText('Vegan Lasagna');
      expect(text).toBeInTheDocument();

      const inexisitingCard = screen.queryByTestId('3-recipe-card');
      expect(inexisitingCard).not.toBeInTheDocument();
    },
  );
  test(
    `3 -Verifica se ao fazer uma busca em /comidas
    com primeira letra retorna os elementos corretos`,
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
        .spyOn(api, 'searchRecipesByFirstLetter')
        .mockResolvedValue(firstLetterRecipeMock.meals);

      const searchBtn = screen.getByTestId(SEARCH_BUTTON);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(SEARCH_INPUT);
      userEvent.type(searchInput, 'w');
      const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
      userEvent.click(firstLetterRadio);
      const execBtn = screen.getByTestId(EXEC_SEARCH);
      userEvent.click(execBtn);

      expect(mockRecipeApi).toHaveBeenCalledWith('/comidas', 'w');

      const text = await screen.findByText('White chocolate creme brulee');
      expect(text).toBeInTheDocument();

      const inexisitingCard = screen.queryByTestId('2-recipe-card');
      expect(inexisitingCard).not.toBeInTheDocument();
    },
  );
  test(
    `4 -Verifica se ao fazer uma busca em /comidas
    com nome retorna os elementos corretos`,
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

      expect(mockRecipeApi).toHaveBeenCalledWith('/comidas', 'xablau');

      const inexisitingCard = screen.queryByTestId('0-recipe-card');
      expect(inexisitingCard).not.toBeInTheDocument();
    },
  );
});
