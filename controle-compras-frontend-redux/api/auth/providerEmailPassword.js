import { auth } from "../firebase";
import { translateMessageErrorInCatch } from "./translations";
export const signUpUserWithEmailAndPassword = (email, password) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch(translateMessageErrorInCatch);

export const signInWithEmailAndPassword = (email, password) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(translateMessageErrorInCatch);

export const sendPasswordResetEmail = email =>
  auth.sendPasswordResetEmail(email).catch(translateMessageErrorInCatch);

export const updateCurrentUserPassword = password =>
  auth.currentUser.updatePassword(password);
