import React from 'react';
import ExploreButtons from '../components/ExploreButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorerDrink() {
  return (
    <>
      <Header title="Explorar Bebidas" withIconSearch={ false } />
      <ExploreButtons exploreByArea={ false } />
      <Footer />
    </>
  );
}

export default ExplorerDrink;
