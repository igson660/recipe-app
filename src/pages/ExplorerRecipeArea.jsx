import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import SelectArea from '../components/SelectArea';
import useSearchBar from '../hooks/searchBar';
import { getMealsAreas, searchRecipes } from '../services/api';

function ExplorerRecipeArea() {
  const [areaList, setAreaList] = useState([]);
  const { setRecipes } = useSearchBar();

  useEffect(() => {
    async function fetchArea() {
      const data = await getMealsAreas();
      setAreaList(data);
    }
    async function handleRecipes() {
      const data = await searchRecipes('/comidas');
      setRecipes(data);
    }
    fetchArea();
    handleRecipes();
  }, [setRecipes]);

  return (
    <>
      <Header title="Explorar Origem" />
      <div id="recipeDone">
        <SelectArea options={ areaList } />
        <RecipesList />
      </div>
      <Footer />
    </>
  );
}

export default ExplorerRecipeArea;
