import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './providers/AppProvider';
import ThemeProvider from './providers/ThemeProvider';
import AppRoutes from './_routes';
const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
