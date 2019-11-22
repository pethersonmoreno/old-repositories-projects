import React, { useEffect } from 'react';
import { Grommet } from 'grommet';
import MainRouter from './routers/MainRouter';
import Spinner from './components/Spinner';
import useAuthState from './states/useAuthState';
import { start } from './actions/auth';


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
  const [state, , unlinkState] = useAuthState();
  useEffect(() => {
    // Called just after component mount
    start();
    return () => {
      unlinkState();
      // Called just before the component unmount
    };
  }, [unlinkState]);


  const { startedAuth, loading } = state;
  return (
    <Grommet theme={theme} full>
      {(!startedAuth || loading) && (
        <Spinner />
      )}
      {(startedAuth && !loading) && (
        <MainRouter />
      )}
    </Grommet>
  );
};

export default App;
