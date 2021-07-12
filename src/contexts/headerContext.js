import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const HeaderContext = createContext();

export function HeaderContextProvider({ children }) {
  const [toggleSearchBar, setToggleSearchBar] = useState(false); // test

  return (
    <HeaderContext.Provider
      value={ { toggleSearchBar, setToggleSearchBar } }
    >
      {children}
    </HeaderContext.Provider>
  );
}

HeaderContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
