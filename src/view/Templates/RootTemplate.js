import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { route } from 'Pages';
import store from 'state/store';
import MainTemplate from './MainTemplate';
import './RootTemplate.css';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
});
const NavigationRouter = process.env.NODE_ENV !== 'development' ? HashRouter : BrowserRouter;

const RootTemplate = () => (
  <MuiThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <NavigationRouter basename={process.env.PUBLIC_URL}>
        <MainTemplate>{route}</MainTemplate>
      </NavigationRouter>
    </ReduxProvider>
  </MuiThemeProvider>
);

export default RootTemplate;
