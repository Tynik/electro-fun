import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Box
} from '@material-ui/core';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { App } from './App';
import { theme } from './theme';

ReactDOM.render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline/>
        <App/>
      </Box>
    </ThemeProvider>
  </HashRouter>,
  document.getElementById('app')
);
