import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import MainRouter from './routers/MainRouter';
import Spinner from './components/Spinner';
import { start } from './actions/auth';
import useAuthState from './hooks/useAuthState';
import Box from './components/Box';

const NavigationRouter = process.env.NODE_ENV !== 'development' ? HashRouter : BrowserRouter;
const App = () => {
  const [{ loading }, , unlinkAuthState] = useAuthState();
  useEffect(() => {
    start();
    return unlinkAuthState;
  }, [unlinkAuthState]);
  return (
    <NavigationRouter basename={process.env.PUBLIC_URL}>
      {loading && (
        <Box center fill>
          <Spinner />
        </Box>
      )}
      {!loading && (
      <MainRouter />
      )}
    </NavigationRouter>
  );
};

export default App;
