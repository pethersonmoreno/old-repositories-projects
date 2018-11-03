import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux'
import { Provider } from 'react-redux'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import MainTemplate from './Templates/MainTemplate';
import reducers from './reducers';
import {route} from './Pages';
import './index.css';

const store = createStore(reducers)

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
});
console.log(process.env);
const NavigationRouter = (process.env.NODE_ENV!=='development'?HashRouter:BrowserRouter);

console.log(route);
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <NavigationRouter basename={process.env.PUBLIC_URL}>
        <MainTemplate>
          {route}
        </MainTemplate>
      </NavigationRouter>
    </Provider>
  </MuiThemeProvider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
