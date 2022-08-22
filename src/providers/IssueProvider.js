import React, { createContext, useReducer } from 'react';
export const IssueContext = createContext();

const initialState = {};

const ACTION_TYPE_ADD = 'ACTION_TYPE_ADD';
const ACTION_TYPE_REMOVE = 'ACTION_TYPE_REMOVE';

export const actionAdd = (payload) => {
  return {
    type: ACTION_TYPE_ADD,
    payload
  };
};

export const actionRemove = (payload) => {
  return {
    type: ACTION_TYPE_REMOVE,
    payload
  };
};


const isssueReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_ADD:
      return [...state] + action.payload;
    case ACTION_TYPE_REMOVE:
      return setLightTheme();
    default:
      throw new Error(`action ${action.type} not handled`);
  }
};

const IssueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const value = { state, dispatch };
  return (
    <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
  );
};

export default IssueProvider;
