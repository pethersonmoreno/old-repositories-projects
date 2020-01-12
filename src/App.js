import React from 'react';
import { Provider } from 'react-redux';
import MainRouter from './modules/router/components/MainRouter';
import { RootRouter } from './modules/router/components';
import './modules/utils/styles/index.scss';
import store from './store';


const App = () => (
  <Provider store={store}>
    <RootRouter>
      <MainRouter />
    </RootRouter>
  </Provider>
);

export default App;
