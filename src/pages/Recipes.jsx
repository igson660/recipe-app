import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipesList from '../components/RecipesList';
import useSearchBar from '../hooks/searchBar';
import {
  searchRecipes, searchCategories, searchRecipesByCategory } from '../services/api';

export default function Recipes() {
  const maxNumberOfCategories = 5;
  const { setRecipes, setLoading, categories, setCategories } = useSearchBar();
  const { location: { pathname } } = useHistory();

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
      <Header title="Comidas" />
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
      <RecipesList />
      <Footer />
    </>
  );
}
