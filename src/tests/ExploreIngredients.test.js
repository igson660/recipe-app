import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { SearchBarContextProvider } from '../contexts/searchBarContext';
import { HeaderContextProvider } from '../contexts/headerContext';
import ExplorerRecipeIngredients from '../pages/ExplorerRecipeIngredients';
import * as api from '../services/api';
import exploreIngredientsMealsMock from
  './mocks/ExploreIngredients/ExploreIngredientsMealsMock';
import { IngredientsContextProvider } from '../contexts/ingredientsContext';
import exploreIngredientsDrinksMock from
  './mocks/ExploreIngredients/ExploreIngredientsDrinksMock';
import chickenMealsMock from './mocks/ExploreIngredients/ChickenMealsMock';
import ExplorerDrinkIngredients from '../pages/ExplorerDrinkIngredients';
import appleJackDrinksMock from './mocks/ExploreIngredients/appleJackDrinksMock';

describe('Testa a tela de ingredientes', () => {
  test('1-Verifica se em /comidas os elementos estão corretos', async () => {
    const mockRecipeApi = jest
      .spyOn(api, 'getIngredients')
      .mockResolvedValueOnce(exploreIngredientsMealsMock.meals);

    renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <IngredientsContextProvider>
            <ExplorerRecipeIngredients />
          </IngredientsContextProvider>
        </SearchBarContextProvider>
      </HeaderContextProvider>,
      '/explorar/comidas/ingredientes',
    );

    expect(mockRecipeApi).toHaveBeenCalledWith('comidas');

    const MAX_NUMBER_OF_CARDS = 12;
    const indexArray = [...Array(MAX_NUMBER_OF_CARDS).keys()]
      .map((item, index) => `${index}-ingredient-card`);
    const promisesArray = indexArray.map((id) => screen.findByTestId(id));
    const resolvedArray = await Promise.all(promisesArray);
    resolvedArray.forEach((item) => expect(item).toBeInTheDocument());

    const inexisitingCard = screen.queryByTestId('12-ingredient-card');
    expect(inexisitingCard).not.toBeInTheDocument();
  });

  test('2-Verifica se em /bebidas os elementos estão corretos', async () => {
    const mockRecipeApi = jest
      .spyOn(api, 'getIngredients')
      .mockResolvedValueOnce(exploreIngredientsDrinksMock.drinks);

    renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <IngredientsContextProvider>
            <ExplorerDrinkIngredients />
          </IngredientsContextProvider>
        </SearchBarContextProvider>
      </HeaderContextProvider>,
      '/explorar/bebidas/ingredientes',
    );

    expect(mockRecipeApi).toHaveBeenCalledWith('bebidas');

    const MAX_NUMBER_OF_CARDS = 12;
    const indexArray = [...Array(MAX_NUMBER_OF_CARDS).keys()]
      .map((item, index) => `${index}-ingredient-card`);
    const promisesArray = indexArray.map((id) => screen.findByTestId(id));
    const resolvedArray = await Promise.all(promisesArray);
    resolvedArray.forEach((item) => expect(item).toBeInTheDocument());

    const inexisitingCard = screen.queryByTestId('12-ingredient-card');
    expect(inexisitingCard).not.toBeInTheDocument();
  });
  test('3-Verifica se ao clicar no ingrediente em /comidas o redirecionamento é correto',
    async () => {
      const mockIngredientsApi = jest
        .spyOn(api, 'getIngredients')
        .mockResolvedValueOnce(exploreIngredientsMealsMock.meals);
      const mockRecipeApi = jest
        .spyOn(api, 'searchRecipesByIngredients')
        .mockResolvedValueOnce(chickenMealsMock.meals);

      const { history } = renderWithRouter(
        <HeaderContextProvider>
          <SearchBarContextProvider>
            <IngredientsContextProvider>
              <ExplorerRecipeIngredients />
            </IngredientsContextProvider>
          </SearchBarContextProvider>
        </HeaderContextProvider>,
        '/explorar/comidas/ingredientes',
      );

      expect(mockIngredientsApi).toHaveBeenCalledWith('comidas');

      await waitFor(async () => {
        const ckickenCard = await screen.findByTestId('0-ingredient-card');
        userEvent.click(ckickenCard);

        expect(mockRecipeApi).toHaveBeenCalledWith('/comidas', 'Chicken');
        expect(history.location.pathname).toBe('/comidas');
      });
    });
  test('4-Verifica se ao clicar no ingrediente em /bebidas o redirecionamento é correto',
    async () => {
      const mockIngredientsApi = jest
        .spyOn(api, 'getIngredients')
        .mockResolvedValueOnce(exploreIngredientsDrinksMock.drinks);

      const { history } = renderWithRouter(
        <HeaderContextProvider>
          <SearchBarContextProvider>
            <IngredientsContextProvider>
              <ExplorerDrinkIngredients />
            </IngredientsContextProvider>
          </SearchBarContextProvider>
        </HeaderContextProvider>,
        '/explorar/bebidas/ingredientes',
      );

      const mockRecipeApi = jest
        .spyOn(api, 'searchRecipesByIngredients')
        .mockResolvedValueOnce(appleJackDrinksMock.drinks);

      expect(mockIngredientsApi).toHaveBeenCalledWith('bebidas');

      await waitFor(async () => {
        const drinkCard = await screen.findByTestId('1-ingredient-card');
        userEvent.click(drinkCard);

        expect(mockRecipeApi).toHaveBeenCalledWith('/bebidas', 'Applejack');
        expect(history.location.pathname).toBe('/bebidas');
      });
    });
});
