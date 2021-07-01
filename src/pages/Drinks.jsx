import React from 'react';
import DrinksList from '../components/DrinksList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <>
      <Header title="Bebidas" />
      <SearchBar />
      <DrinksList />
      <Footer />
    </>
  );
}

export default Drinks;
