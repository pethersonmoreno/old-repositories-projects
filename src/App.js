import React from 'react';
import MainRouter from './modules/router/components/MainRouter';
import RootRouter from './modules/router/components/RootRouter';
import './modules/utils/styles/index.scss';
import useAuth from './modules/auth/hooks/useAuth';

const App = () => {
  const { loadingAuth } = useAuth();
  return (
    <RootRouter basename={process.env.PUBLIC_URL} loading={loadingAuth}>
      <MainRouter />
    </RootRouter>
  );
};

export default App;
