import * as firebase from 'firebase/app';
import { signInGoogleWithRedirect, getRedirectResult, isValidEmail } from '../../api/auth';
import { initialState, setState } from '../states/useAuthState';


const signIn = async () => {
  setState({ ...initialState, loading: true });
  signInGoogleWithRedirect();
};


const toggleSideBar = () => {
  setState(prevState => ({ showSidebar: !prevState.showSidebar }));
};

const hideSideBar = () => {
  setState({ showSidebar: false });
};

const setPageTitle = pageTitle => {
  setState({ pageTitle });
};

const updateUserProfile = async userProfile => {
  let token = null;
  if (userProfile) {
    token = await userProfile.getIdToken();
    const isValidEmailBool = token ? await isValidEmail(token) : false;
    await setState({
      authenticated: true,
      userProfile,
      token,
      isValidEmail: isValidEmailBool,
      startedAuth: true,
      loading: false
    });
  } else {
    await setState({
      authenticated: false,
      userProfile: null,
      token: null,
      isValidEmail: false,
      startedAuth: true,
      loading: false
    });
  }
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
  await captureSigInRedirectResult();
  await captureAuthChanges();
};

export {
  signIn,
  toggleSideBar,
  hideSideBar,
  setPageTitle,
  start
};
