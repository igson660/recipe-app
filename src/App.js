import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import DrinkList from './Components/DrinkList';
import ExplorerList from './Components/ExplorerList';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Recipes } />
      <Route exact path="/bebidas" component={ DrinkList } />
      <Route exact path="/explorar" component={ ExplorerList } />
    </Switch>
  );
}

export default App;
