import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreButtons from '../components/ExploreButtons';

function ExplorerRecipe() {
  return (
    <>
      <Header title="Explorar Comidas" withIconSearch={ false } />
      <ExploreButtons />
      <Footer />
    </>
  );
}

export default ExplorerRecipe;
