import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientsList from '../components/IngredientsList';

function ExplorerRecipeIngredients() {
  return (
    <>
      <Header title="Explorar Ingredientes" withIconSearch={ false } />
      <IngredientsList />
      <Footer />
    </>
  );
}

export default ExplorerRecipeIngredients;
