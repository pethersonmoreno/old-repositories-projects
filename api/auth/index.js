import { auth } from "../firebase";
import { translateMessageErrorInCatch } from "./translations";
import {
  signUpUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateCurrentUserPassword
} from "./providerEmailPassword";
import {
  checkAuthState,
  startListenAuthChanges,
  stopListenAuthChanges
} from "./authState";
import {
  setMillisecondsToReloadUser,
  startListenUserReloads,
  stopListenUserReloads
} from "./userReloads";

const signOut = () => auth.signOut().catch(translateMessageErrorInCatch);

const getCurrentUser = () => auth.currentUser;

export {
  signOut,
  getCurrentUser,
  signUpUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateCurrentUserPassword,
  checkAuthState,
  startListenAuthChanges,
  stopListenAuthChanges,
  setMillisecondsToReloadUser,
  startListenUserReloads,
  stopListenUserReloads
};
