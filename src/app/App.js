import React, { useEffect } from 'react';
import { Grommet } from 'grommet';
import MainRouter from './routers/MainRouter';
import Spinner from './components/Spinner';
import { start } from './actions/auth';
import useAuthState from './hooks/useAuthState';


const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};
const App = () => {
  const [{ loading }, , unlinkAuthState] = useAuthState();
  useEffect(() => {
    start();
    return unlinkAuthState;
  }, [unlinkAuthState]);
  return (
    <Grommet theme={theme} full>
      {loading && (
        <Spinner />
      )}
      {!loading && (
        <MainRouter />
      )}
    </Grommet>
  );
};

export default App;
