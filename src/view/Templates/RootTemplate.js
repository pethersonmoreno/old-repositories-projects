import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import MainTemplate from './MainTemplate';
import { getReducers } from '../helpers';
import { route } from '../Pages';
import './RootTemplate.css';

const store = createStore(getReducers(), applyMiddleware(thunk));
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
});
const NavigationRouter = process.env.NODE_ENV !== 'development' ? HashRouter : BrowserRouter;

const RootTemplate = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <NavigationRouter basename={process.env.PUBLIC_URL}>
        <MainTemplate>{route}</MainTemplate>
      </NavigationRouter>
    </Provider>
  </MuiThemeProvider>
);

export default RootTemplate;
