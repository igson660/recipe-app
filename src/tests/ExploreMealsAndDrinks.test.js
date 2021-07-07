import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { cleanup, wait } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ExplorerRecipe from '../pages/ExplorerRecipe';
import { SearchBarContextProvider } from '../contexts/searchBarContext';
import { HeaderContextProvider } from '../contexts/headerContext';
import ExplorerDrink from '../pages/ExplorerDrink';
import * as api from '../services/api';
import randomMealMock from './mocks/ExploreMealsAndDrinks/randomMealMock';
import randomDrinkMock from './mocks/ExploreMealsAndDrinks/randomDrinkMock';

const MEALS_PATH = '/explorar/comidas';
const DRINKS_PATH = '/explorar/bebidas';
const EXPLORE_INGREDIENT = 'explore-by-ingredient';
const EXPLORE_AREA = 'explore-by-area';
const EXPLORE_SURPRISE = 'explore-surprise';

describe('Testa pagina de explorar', () => {
  afterEach(cleanup);
  test('implementa os elementos corretos em explorar comidas', () => {
    renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <ExplorerRecipe />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
      MEALS_PATH,
    );
    const ingredientButton = screen.getByTestId(EXPLORE_INGREDIENT);
    const areaButton = screen.getByTestId(EXPLORE_AREA);
    const surpriseButton = screen.getByTestId(EXPLORE_SURPRISE);

    expect(ingredientButton).toBeInTheDocument();
    expect(areaButton).toBeInTheDocument();
    expect(surpriseButton).toBeInTheDocument();
  });
  test('implementa os elementos corretos em explorar bebidas', () => {
    renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <ExplorerDrink />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
      DRINKS_PATH,
    );
    const ingredientButton = screen.getByTestId(EXPLORE_INGREDIENT);
    const areaButton = screen.queryByTestId(EXPLORE_AREA);
    const surpriseButton = screen.getByTestId(EXPLORE_SURPRISE);

    expect(ingredientButton).toBeInTheDocument();
    expect(areaButton).not.toBeInTheDocument();
    expect(surpriseButton).toBeInTheDocument();
  });
  test('ao clicar no botao de ingredientes em comidas redireciona corretamente', () => {
    const { history } = renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <ExplorerRecipe />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
      MEALS_PATH,
    );
    const ingredientButton = screen.getByTestId(EXPLORE_INGREDIENT);
    userEvent.click(ingredientButton);

    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });
  test('ao clicar no botao de origem em comidas redireciona corretamente', () => {
    const { history } = renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <ExplorerRecipe />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
      MEALS_PATH,
    );
    const areaButton = screen.queryByTestId(EXPLORE_AREA);
    userEvent.click(areaButton);

    expect(history.location.pathname).toBe('/explorar/comidas/area');
  });
  test.only('ao clicar no botao de surpresa em comidas redireciona corretamente', async () => {
    const { history } = renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <ExplorerRecipe />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
      MEALS_PATH,
    );
    const timeout = 3000;

    const mockRecipeApi = jest
      .spyOn(api, 'RandomRecipe')
      .mockResolvedValue(randomMealMock.meals);

    const surpriseButton = screen.getByTestId(EXPLORE_SURPRISE);

    await wait(() => {
      // userEvent.click(surpriseButton);
      // expect(mockRecipeApi).toHaveBeenCalledWith('comidas');
      expect(history.location.pathname).toBe('/comidas/52920');
    });

    // await wait(async () => {
    //   const text = await screen.findByText('Detalhes');
    //   expect(text).toBeInTheDocument();
    // }, { timeout });

    // setTimeout(async () => {
    //   await checkRandomMealPath(history);
    // }, timeout);
  });
  test('ao clicar no botao de ingredientes em bebidas redireciona corretamente', () => {
    const { history } = renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <ExplorerDrink />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
      DRINKS_PATH,
    );
    const ingredientButton = screen.getByTestId(EXPLORE_INGREDIENT);
    userEvent.click(ingredientButton);

    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });
  test('não existe botão de local de origem em bebidas ', () => {
    renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <ExplorerDrink />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
      DRINKS_PATH,
    );
    const areaButton = screen.queryByTestId(EXPLORE_AREA);
    expect(areaButton).not.toBeInTheDocument();
  });
  test('ao clicar no botao de surpresa em bebidas redireciona corretamente', async () => {
    const { history } = renderWithRouter(
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <ExplorerDrink />
        </SearchBarContextProvider>
      </HeaderContextProvider>,
      DRINKS_PATH,
    );
    const timeout = 3000;

    const mockRecipeApi = jest
      .spyOn(api, 'RandomRecipe')
      .mockResolvedValue(randomDrinkMock.drinks);

    const surpriseButton = screen.getByTestId(EXPLORE_SURPRISE);

    setTimeout(async () => {
      userEvent.click(surpriseButton);
      await expect(mockRecipeApi).toHaveBeenCalledWith('bebidas');
      expect(history.location.pathname).toBe('/bebidas/17223');
    }, timeout);
  });
});
