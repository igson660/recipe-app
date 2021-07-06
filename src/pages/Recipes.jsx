import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipesList from '../components/RecipesList';
import useSearchBar from '../hooks/searchBar';
import { searchRecipes } from '../services/api';

function Recipes() {
  const maxNumberOfCategories = 5;
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
      <Header title="Comidas" />
      <SearchBar />
      <RecipesList />
      <Footer />
    </>
  );
}

export default Recipes;
