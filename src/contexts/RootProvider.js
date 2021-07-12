import React from 'react';
import PropTypes from 'prop-types';
import { SearchBarContextProvider } from './searchBarContext';
import { HeaderContextProvider } from './headerContext';
import { IngredientsContextProvider } from './ingredientsContext';
import { RecipesInProgressContextProvider } from './recipesInProgressContext';

function RootProvider({ children }) {
  return (
    <HeaderContextProvider>
      <SearchBarContextProvider>
        <IngredientsContextProvider>
          <RecipesInProgressContextProvider>
            {children}
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
