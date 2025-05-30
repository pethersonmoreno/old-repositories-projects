import { firebase, auth } from '../firebase';
import { translateMessageErrorInCatch } from './translations';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const signinGoogleWithPopup = () =>
  auth.signInWithPopup(googleAuthProvider).catch(translateMessageErrorInCatch);
export const signinGoogleWithRedirect = () =>
  auth.signInWithRedirect(googleAuthProvider);
