import React from 'react';
import MainRouter from './routers/MainRouter';
import AuthenticatedRouter from './routers/AuthenticatedRouter';

const App = () => (
  <MainRouter>
    <AuthenticatedRouter />
  </MainRouter>
);

export default App;
