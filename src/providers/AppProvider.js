import React, { createContext, useReducer } from 'react';
const AppContext = createContext();

const initialState = {};

const appReducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error(`action {action.type} not handled`);
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
