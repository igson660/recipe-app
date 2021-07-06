import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksList from '../components/DrinksList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import useSearchBar from '../hooks/searchBar';
import { searchRecipes } from '../services/api';

function Drinks() {
  const { location: { pathname } } = useHistory();
  const { setRecipes, setLoading } = useSearchBar();

  async function handleRecipes() {
    setLoading(true);
    const data = await searchRecipes(pathname);
    setRecipes(data);
  }

  useEffect(() => {
    handleRecipes();
    setLoading(false);
  });

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
