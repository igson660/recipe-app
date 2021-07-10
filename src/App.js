// App de Receitas
import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import RecipeDetailProgress from './pages/RecipeDetailProgress';
import Drinks from './pages/Drinks';
import DrinkDetail from './pages/DrinkDetail';
import DrinkDetailProgress from './pages/DrinkDetailProgress';
import Explorer from './pages/Explorer';
import ExplorerRecipe from './pages/ExplorerRecipe';
import ExplorerRecipeArea from './pages/ExplorerRecipeArea';
import ExplorerRecipeIngredients from './pages/ExplorerRecipeIngredients';
import ExplorerDrink from './pages/ExplorerDrink';
import ExplorerDrinkIngredients from './pages/ExplorerDrinkIngredients';
import Profile from './pages/Profile';
import RecipeDone from './pages/RecipeDone';
import RecipeFavorite from './pages/RecipeFavorite';
import { SearchBarContextProvider } from './contexts/searchBarContext';
import { HeaderContextProvider } from './contexts/headerContext';
import { RecipesDoneProvider } from './contexts/recipesDoneContext';

// verificar as rotas
function App() {
  return (
    <Switch>
      <HeaderContextProvider>
        <SearchBarContextProvider>
          <RecipesDoneProvider>
            <Route path="/" exact component={ Login } />
            <Route path="/comidas" exact component={ Recipes } />
            <Route path="/comidas/:id" exact component={ RecipeDetail } />
            <Route
              path="/comidas/:id/in-progress"
              exact
              component={ RecipeDetailProgress }
            />
            <Route path="/bebidas" exact component={ Drinks } />
            <Route path="/bebidas/:id" exact component={ DrinkDetail } />
            <Route
              path="/bebidas/:id/in-progress"
              exact
              component={ DrinkDetailProgress }
            />
            <Route path="/explorar" exact component={ Explorer } />
            <Route path="/explorar/comidas" exact component={ ExplorerRecipe } />
            <Route path="/explorar/comidas/area" exact component={ ExplorerRecipeArea } />
            <Route
              path="/explorar/comidas/ingredientes"
              component={ ExplorerRecipeIngredients }
            />
            <Route path="/explorar/bebidas" exact component={ ExplorerDrink } />
            <Route
              path="/explorar/bebidas/ingredientes"
              component={ ExplorerDrinkIngredients }
            />
            <Route path="/perfil" exact component={ Profile } />
            <Route path="/receitas-feitas" exact component={ RecipeDone } />
            <Route path="/receitas-favoritas" exact component={ RecipeFavorite } />
          </RecipesDoneProvider>
        </SearchBarContextProvider>
      </HeaderContextProvider>
    </Switch>
  );
}

export default App;
