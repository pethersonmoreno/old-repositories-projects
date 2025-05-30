import { auth } from '../firebase';
import { translateMessageErrorInCatch } from './translations';
import {
  signupUserWithEmailAndPassword,
  signinWithEmailAndPassword,
  sendPasswordResetEmail,
  updateCurrentUserPassword
} from './providerEmailPassword';
import {
  signinGoogleWithPopup,
  signinGoogleWithRedirect
} from './providerGoogle';
import {
  checkAuthState,
  startListenAuthChanges,
  stopListenAuthChanges
} from './authState';
import {
  setMillisecondsToReloadUser,
  startListenUserReloads,
  stopListenUserReloads
} from './userReloads';
import isValidEmail from './isValidEmail';

const getRedirectResult = () =>
  auth.getRedirectResult().catch(translateMessageErrorInCatch);
const signOut = () => auth.signOut().catch(translateMessageErrorInCatch);

const getCurrentUser = () => auth.currentUser;

export {
  getRedirectResult,
  signOut,
  getCurrentUser,
  signupUserWithEmailAndPassword,
  signinWithEmailAndPassword,
  sendPasswordResetEmail,
  updateCurrentUserPassword,
  signinGoogleWithPopup,
  signinGoogleWithRedirect,
  checkAuthState,
  startListenAuthChanges,
  stopListenAuthChanges,
  setMillisecondsToReloadUser,
  startListenUserReloads,
  stopListenUserReloads,
  isValidEmail
};
