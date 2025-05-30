import { auth } from '../firebase';
import { translateMessageErrorInCatch } from './translations';

export const signupUserWithEmailAndPassword = (email, password) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch(translateMessageErrorInCatch);

export const signinWithEmailAndPassword = (email, password) =>
  auth
    .signinWithEmailAndPassword(email, password)
    .catch(translateMessageErrorInCatch);

export const sendPasswordResetEmail = email =>
  auth.sendPasswordResetEmail(email).catch(translateMessageErrorInCatch);

export const updateCurrentUserPassword = password =>
  auth.currentUser.updatePassword(password);
