import { auth as authApi } from "../../../../api";
import actions from "../actions";
import {
  signUpUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "./providerEmailPassword";
import { startListenAuthChanges, stopListenAuthChanges } from "./authState";
import { startListenUserReloads, stopListenUserReloads } from "./userReloads";

const signOut = () => actions.signOut(authApi.signOut());

export default {
  signUpUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  startListenAuthChanges,
  stopListenAuthChanges,
  startListenUserReloads,
  stopListenUserReloads
};
