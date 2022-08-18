import React, { createContext, useReducer } from 'react';
export const ThemeContext = createContext();

const handleThemeChange = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const setDarkTheme = () => {
  localStorage.theme = 'dark';
  handleThemeChange();
  return 'dark';
};

const setLightTheme = () => {
  localStorage.theme = 'light';
  handleThemeChange();
  return 'light';
};

const setSystemTheme = () => {
  localStorage.removeItem('theme');
  handleThemeChange();
  return 'system';
};

handleThemeChange();

const initialState = localStorage.getItem('theme') || 'system';

const ACTION_TYPE_SET_DARK_THEME = 'ACTION_TYPE_SET_DARK_THEME';
const ACTION_TYPE_SET_LIGHT_THEME = 'ACTION_TYPE_SET_LIGHT_THEME';
const ACTION_TYPE_SET_SYSTEM_THEME = 'ACTION_TYPE_SET_SYSTEM_THEME';

export const actionSetDarkTheme = () => {
  return {
    type: ACTION_TYPE_SET_DARK_THEME,
  };
};

export const actionSetLightTheme = () => {
  return {
    type: ACTION_TYPE_SET_LIGHT_THEME,
  };
};

export const actionSetSystemTheme = () => {
  return {
    type: ACTION_TYPE_SET_SYSTEM_THEME,
  };
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_DARK_THEME:
      return setDarkTheme();
    case ACTION_TYPE_SET_LIGHT_THEME:
      return setLightTheme();
    case ACTION_TYPE_SET_SYSTEM_THEME:
      return setSystemTheme();

    default:
      throw new Error(`action ${action.type} not handled`);
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const value = { state, dispatch };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default AppProvider;
