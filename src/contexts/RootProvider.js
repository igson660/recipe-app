import React from 'react';
import PropTypes from 'prop-types';
import { SearchBarContextProvider } from './searchBarContext';
import { HeaderContextProvider } from './headerContext';
import { IngredientsContextProvider } from './ingredientsContext';
import { RecipesInProgressContextProvider } from './recipesInProgressContext';
import { RecipesDoneProvider } from './recipesDoneContext';

function RootProvider({ children }) {
  return (
    <HeaderContextProvider>
      <SearchBarContextProvider>
        <IngredientsContextProvider>
          <RecipesInProgressContextProvider>
            <RecipesDoneProvider>
              {children}
            </RecipesDoneProvider>
          </RecipesInProgressContextProvider>
        </IngredientsContextProvider>
      </SearchBarContextProvider>
    </HeaderContextProvider>
  );
}

RootProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RootProvider;
