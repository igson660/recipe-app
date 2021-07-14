import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import RootProvider from '../contexts/RootProvider';
import ExplorerRecipeArea from '../pages/ExplorerRecipeArea';
import * as api from '../services/api';
import areasMealsMock from './mocks/ExploreByArea/AreasMock';
import thaiMealsMock from './mocks/ExploreByArea/ThaiMealsMock';
import NotFound from '../components/NotFound';

const PATH = '/explorar/comidas/area';
const DROPDOWN = 'explore-by-area-dropdown';
describe('Testa tela de explorar por local', () => {
  test('1- Verifica se os chamadas para a API foram feitas corretamente', () => {
    renderWithRouter(
      <RootProvider>
        <ExplorerRecipeArea />
      </RootProvider>,
      PATH,
    );

    const dropdown = screen.getByTestId(DROPDOWN);
    expect(dropdown).toBeInTheDocument();
  });
  test('2- Verifica se ao selecionar uma opção os elementos voltam corretamente',
    async () => {
      const mockAreaMealsApi = jest
        .spyOn(api, 'getMealsAreas')
        .mockResolvedValueOnce(areasMealsMock.meals);

      const mockGetMealsApi = jest
        .spyOn(api, 'fetchMealsByArea')
        .mockResolvedValueOnce(thaiMealsMock.meals);

      renderWithRouter(
        <RootProvider>
          <ExplorerRecipeArea />
        </RootProvider>,
        PATH,
      );

      expect(mockAreaMealsApi).toHaveBeenCalled();

      await waitFor(async () => {
        const dropdown = screen.getByTestId(DROPDOWN);
        fireEvent.change(dropdown, { target: { value: 'Thai' } });
        expect(mockGetMealsApi).toHaveBeenCalledWith('Thai');
        const NUMBER_OF_CARDS = 3;
        const indexArray = [...Array(NUMBER_OF_CARDS).keys()]
          .map((item, index) => `${index}-recipe-card`);
        const promisesArray = indexArray.map((id) => screen.findByTestId(id));
        const resolvedArray = await Promise.all(promisesArray);
        resolvedArray.forEach((item) => expect(item).toBeInTheDocument());

        const inexisitingCard = screen.queryByTestId('3-recipe-card');
        expect(inexisitingCard).not.toBeInTheDocument();
      });
    });
  test('3- Verifica se ao clicar em um card é redirecionado corretamente',
    async () => {
      const mockAreaMealsApi = jest
        .spyOn(api, 'getMealsAreas')
        .mockResolvedValueOnce(areasMealsMock.meals);

      const mockGetMealsApi = jest
        .spyOn(api, 'fetchMealsByArea')
        .mockResolvedValueOnce(thaiMealsMock.meals);

      const { history } = renderWithRouter(
        <RootProvider>
          <ExplorerRecipeArea />
        </RootProvider>,
        PATH,
      );

      expect(mockAreaMealsApi).toHaveBeenCalled();

      await waitFor(async () => {
        const dropdown = screen.getByTestId(DROPDOWN);
        fireEvent.change(dropdown, { target: { value: 'Thai' } });
        expect(mockGetMealsApi).toHaveBeenCalledWith('Thai');

        const thaiMealCard = await screen.findByTestId('0-card-name');
        userEvent.click(thaiMealCard);

        expect(history.location.pathname).toBe('/comidas/52827');
      });
    });
  test('5- Verifica que ao entrar na rota /explorar/bebidas/area um erro é mostrado',
    () => {
      renderWithRouter(
        <RootProvider>
          <NotFound />
        </RootProvider>,
        '/explorar/bebidas/area',
      );

      const text = screen.getByText('Not Found');
      expect(text).toBeInTheDocument();
    });
});
