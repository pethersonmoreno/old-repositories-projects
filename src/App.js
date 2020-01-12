import React from 'react';
import MainRouter from './modules/router/components/MainRouter';
import RootRouter from './modules/router/components/RootRouter';
import './modules/utils/styles/index.scss';
import { DataProvider } from './redux/data';


const App = () => (
  <DataProvider>
    <RootRouter>
      <MainRouter />
    </RootRouter>
  </DataProvider>
);

export default App;
