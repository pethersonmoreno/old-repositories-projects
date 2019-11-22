import React, { useEffect } from 'react';
import * as firebase from 'firebase/app';
import { Grommet } from 'grommet';
import MainRouter from './routers/MainRouter';
import { getRedirectResult, isValidEmail } from '../api/auth';
import AppContext from './contexts/AppContext';
import Spinner from './components/Spinner';
import useAuthState, { getState as getAuthState, setState as setAuthState } from './states/useAuthState';
import { updateLoading } from './actions/auth';


const updateIsValidEmail = async () => {
  const { token } = getAuthState();
  const isValidEmailBool = token ? await isValidEmail(token) : false;
  localStorage.setItem('isValidEmail', JSON.stringify(isValidEmailBool));
  await setAuthState({
    isValidEmail: isValidEmailBool
  });
};

const updateUserProfile = async userProfile => {
  let token = null;
  if (userProfile) {
    token = await userProfile.getIdToken();
  }
  if (userProfile) {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('token', JSON.stringify(token));
  } else {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('token');
  }
  await setAuthState({
    authenticated: !!userProfile,
    userProfile,
    token,
  });
  await updateIsValidEmail();
};

const captureAuthChanges = () => {
  let firstAuthChanged = true;
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(async user => {
      await updateUserProfile(user);
      if (firstAuthChanged) {
        firstAuthChanged = false;
        resolve();
      }
    });
  });
};

const captureSigInRedirectResult = async () => {
  const userCredential = await getRedirectResult();
  if (userCredential.user) {
    await updateUserProfile(userCredential.user);
  }
};

const start = async () => {
  const startLoading = Promise.all([
    captureSigInRedirectResult(),
    captureAuthChanges()]);
  const { startedAuth, loading } = getAuthState();
  if (!startedAuth || loading) {
    await startLoading;
  }
  await updateLoading(false);
  localStorage.setItem('startedAuth', true);
  await setAuthState({ startedAuth: true });
};


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
  const [state] = useAuthState();
  useEffect(() => {
    // Called just after component mount
    start();
    return () => {
      // Called just before the component unmount
    };
  }, []);


  const { startedAuth, loading } = state;
  return (
    <AppContext.Provider value={{
      ...state
    }}
    >
      <Grommet theme={theme} full>
        {(!startedAuth || loading) && (
        <Spinner />
        )}
        {(startedAuth && !loading) && (
        <MainRouter />
        )}
      </Grommet>
    </AppContext.Provider>
  );
};

export default App;
