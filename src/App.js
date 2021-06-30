import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import { SearchBarContextProvider } from './contexts/searchBarContext';

function App() {
  return (
    <Switch>
      <SearchBarContextProvider>
        <Route exact path="/" component={ Login } />
      </SearchBarContextProvider>
    </Switch>
  );
}

export default App;
