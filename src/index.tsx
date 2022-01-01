import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { App } from './App';
import theme from './theme';
import {
  AppContextProvider,
  UserContextProvider,
  DbContextProvider
} from './contexts';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <AppContextProvider>
        <UserContextProvider>
          <DbContextProvider>
            <App/>
          </DbContextProvider>
        </UserContextProvider>
      </AppContextProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('app')
);
