import React, { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
