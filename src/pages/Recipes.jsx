import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipesList from '../components/RecipesList';

function Recipes() {
  return (
    <>
      <Header title="Comidas" />
      <SearchBar />
      <RecipesList />
      <Footer />
    </>
  );
}

export default Recipes;
