import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipesList from '../components/RecipesList';
import useSearchBar from '../hooks/searchBar';
import { searchRecipes, searchCategories } from '../services/api';

export default function Recipes() {
  const maxNumberOfCategories = 5;
  const { location: { pathname } } = useHistory();
  const { setRecipes, setLoading, categories, setCategories } = useSearchBar();

  async function handleCategories() {
    setLoading(true);
    const data = await searchCategories(pathname);
    setCategories(data);
  }

  async function handleRecipes() {
    setLoading(true);
    const data = await searchRecipes(pathname);
    setRecipes(data);
  }

  useEffect(() => {
    handleRecipes();
    handleCategories();
    setLoading(false);
  });

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
                data-testid={ `${category.strCategory}-category-filter` }
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
