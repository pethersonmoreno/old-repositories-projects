import { firebase, auth } from '../firebase';
import { translateMessageErrorInCatch } from './translations';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const signInGoogleWithPopup = () =>
  auth.signInWithPopup(googleAuthProvider).catch(translateMessageErrorInCatch);
export const signInGoogleWithRedirect = () =>
  auth.signInWithRedirect(googleAuthProvider);
