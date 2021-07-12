import React from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function RecipeFavorite() {
  return (
    <>
      <Header title="Receitas Favoritas" withIconSearch={ false } />
      <FavoriteCard />
    </>
  );
}

export default RecipeFavorite;
