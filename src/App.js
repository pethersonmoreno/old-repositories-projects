import React from 'react';
import { Provider } from 'react-redux';
import MainRouter from './modules/router/components/MainRouter';
import { RootRouter } from './modules/router/components';
import store from './store';
import '@morenobr/guideline-style/all.min.css';
import './modules/utils/styles/index.scss';


const App = () => (
  <Provider store={store}>
    <RootRouter>
      <MainRouter />
    </RootRouter>
  </Provider>
);

export default App;
