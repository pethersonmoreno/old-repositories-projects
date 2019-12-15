import * as firebase from 'firebase/app';
import {
  signinGoogleWithRedirect, signOut, getRedirectResult, isValidEmail
} from '../../utils/api/auth';
import { setState as setAuthState } from '../hooks/useAuthState';


const signin = async () => {
  setAuthState({ loading: true });
  signinGoogleWithRedirect();
};

const updateUserProfile = async userProfile => {
  let token = null;
  let isValidEmailBool = false;
  if (userProfile) {
    try {
      token = await userProfile.getIdToken();
      isValidEmailBool = token ? await isValidEmail(token) : false;
    } catch (error) {
      // TODO: Remove it after fix the bugs
      signOut();
      return;
    }
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
  signin,
  start
};
