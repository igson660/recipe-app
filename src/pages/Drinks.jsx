import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksList from '../components/DrinksList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import useSearchBar from '../hooks/searchBar';
import useIngredients from '../hooks/ingredients';
import {
  searchRecipes, searchCategories, searchRecipesByCategory } from '../services/api';

function Drinks() {
  const maxNumberOfCategories = 5;
  const history = useHistory();
  const { location: { pathname } } = history;
  const { setRecipes, setLoading, categories, setCategories,
    currentCategory, setCurrentCategory } = useSearchBar();
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
  }

  useEffect(() => {
    async function handleRecipes() {
      setLoading(true);
      const data = await searchRecipes(pathname);
      setRecipes(data);
      setLoading(false);
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
  },
  [setLoading,
    pathname,
    setCategories,
    setRecipes,
    fetchingIngredients]);

  return (
    <>
      <Header title="Bebidas" />
      <SearchBar />
      <div id="recipeDone" className="recipeDoneSearchBtn">
        <div className="drinkFilterBtn">
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
        <DrinksList />
      </div>
      <div />
      <Footer />
    </>
  );
}

export default Drinks;
