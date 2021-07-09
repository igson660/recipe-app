import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipesList from '../components/RecipesList';
import useSearchBar from '../hooks/searchBar';
import useIngredients from '../hooks/ingredients';
import {
  searchRecipes, searchCategories, searchRecipesByCategory } from '../services/api';

export default function Recipes() {
  const maxNumberOfCategories = 5;
  const { setRecipes, setLoading, categories, setCategories,
    currentCategory, setCurrentCategory } = useSearchBar();
  const { location: { pathname } } = useHistory();
  const { fetchingIngredients } = useIngredients();

  async function handleClick(category) {
    setCurrentCategory(category);
    if (currentCategory === category) {
      setLoading(true);
      const data = await searchRecipes(pathname);
      setRecipes(data);
      setLoading(false);
    } else {
      setLoading(true);
      const data = await searchRecipesByCategory(pathname, category);
      setRecipes(data);
      setLoading(false);
    }
  }

  async function handleAllRecipes() {
    setLoading(true);
    const data = await searchRecipes(pathname);
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
    if (!fetchingIngredients) {
      handleRecipes();
    }
    handleCategories();
    setLoading(false);
  }, [setLoading, pathname, setCategories, setRecipes, fetchingIngredients]);

  return (
    <>
      <Header title="Comidas" />
      <SearchBar />
      <div>
        <button
          type="submit"
          data-testid="All-category-filter"
          onClick={ () => handleAllRecipes() }
        >
          All
        </button>
        { (categories !== null && categories.length > 0)
        && categories.map((category, index) => {
          if (index < maxNumberOfCategories) {
            return (
              <button
                key={ index }
                type="submit"
                value={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ () => handleClick(category.strCategory) }
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
