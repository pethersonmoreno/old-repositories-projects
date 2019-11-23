import * as firebase from 'firebase/app';
import { signInGoogleWithRedirect, getRedirectResult, isValidEmail } from '../../api/auth';
import { setState as setAuthState } from '../hooks/useAuthState';


const signIn = async () => {
  setAuthState({ loading: true });
  signInGoogleWithRedirect();
};


const toggleSideBar = () => {
  setAuthState(prevState => ({ showSidebar: !prevState.showSidebar }));
};

const hideSideBar = () => {
  setAuthState({ showSidebar: false });
};

const setPageTitle = pageTitle => {
  setAuthState({ pageTitle });
};

const updateUserProfile = async userProfile => {
  let token = null;
  let isValidEmailBool = false;
  if (userProfile) {
    token = await userProfile.getIdToken();
    isValidEmailBool = token ? await isValidEmail(token) : false;
  }
  await setAuthState({
    loading: false,
    authenticated: !!userProfile,
    userProfile,
    token,
    isValidEmail: isValidEmailBool,
  });
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
