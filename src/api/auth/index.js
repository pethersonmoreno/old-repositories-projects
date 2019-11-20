import { auth } from '../firebase';
import { translateMessageErrorInCatch } from './translations';
import {
  signUpUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateCurrentUserPassword
} from './providerEmailPassword';
import {
  signInGoogleWithPopup,
  signInGoogleWithRedirect
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

const getRedirectResult = () =>
  auth.getRedirectResult().catch(translateMessageErrorInCatch);
const signOut = () => auth.signOut().catch(translateMessageErrorInCatch);

const getCurrentUser = () => auth.currentUser;

export {
  getRedirectResult,
  signOut,
  getCurrentUser,
  signUpUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateCurrentUserPassword,
  signInGoogleWithPopup,
  signInGoogleWithRedirect,
  checkAuthState,
  startListenAuthChanges,
  stopListenAuthChanges,
  setMillisecondsToReloadUser,
  startListenUserReloads,
  stopListenUserReloads
};
