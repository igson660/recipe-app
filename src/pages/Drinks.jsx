import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksList from '../components/DrinksList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import useSearchBar from '../hooks/searchBar';
import {
  searchRecipes, searchCategories, searchRecipesByCategory } from '../services/api';

function Drinks() {
  const maxNumberOfCategories = 5;
  const { location: { pathname } } = useHistory();
  const { setRecipes, setLoading, categories, setCategories } = useSearchBar();

  async function handleRecipesByCategory(category) {
    setLoading(true);
    const data = await searchRecipesByCategory(pathname, category);
    setRecipes(data);
    setLoading(false);
  }

  useEffect(() => {
    async function handleRecipes() {
      setLoading(true);
      const data = await searchRecipes(pathname);
      setRecipes(data);
    }

    async function handleCategories() {
      setLoading(true);
      const data = await searchCategories(pathname);
      setCategories(data);
    }
    handleRecipes();
    handleCategories();
    setLoading(false);
  }, [setLoading, pathname, setCategories, setRecipes]);

  return (
    <>
      <Header title="Bebidas" />
      <SearchBar />
      <div>
        { (categories !== null && categories.length > 0)
        && categories.map((category, index) => {
          if (index < maxNumberOfCategories) {
            return (
              <button
                key={ index }
                type="button"
                value={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ (e) => handleRecipesByCategory(e.target.value) }
              >
                {category.strCategory}
              </button>
            );
          }
          return null;
        }) }
      </div>
      <DrinksList />
      <Footer />
    </>
  );
}

export default Drinks;
