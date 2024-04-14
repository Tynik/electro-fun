import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { App } from './App';
import { AppContextProvider, UserProvider, DbContextProvider } from './providers';
import theme from './theme';

const root = createRoot(document.getElementById('app'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <UserProvider>
            <DbContextProvider>
              <App />
            </DbContextProvider>
          </UserProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
