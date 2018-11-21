import { auth as authApi } from "../../api";
import actions from "./actions";

const signUpUserWithEmailAndPassword = (email, password) =>
  actions.signIn(authApi.signUpUserWithEmailAndPassword(email, password));
const signInWithEmailAndPassword = (email, password) =>
  actions.signIn(authApi.signInWithEmailAndPassword(email, password));
const signOut = () => actions.signOut(authApi.signOut());

let listenChangesCallback = null;
const startListenAuthChanges = () => dispatch => {
  if (!listenChangesCallback) {
    return new Promise((resolve, reject) => {
      let executedBefore = false;
      listenChangesCallback = authUser => {
        if (authUser) {
          dispatch(actions.signInFulfilled(authUser));
        } else {
          dispatch(actions.signInRejected(null));
        }
        if (!executedBefore) {
          executedBefore = true;
          resolve(authUser);
        }
      };
      authApi.startListenAuthChanges(listenChangesCallback, error =>
        reject(error)
      );
    });
  }
  return Promise.reject("Listen alread started");
};
const stopListenAuthChanges = () => () => {
  if (listenChangesCallback) {
    authApi.stopListenAuthChanges(listenChangesCallback);
    listenChangesCallback = null;
  }
};
export default {
  signUpUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  startListenAuthChanges,
  stopListenAuthChanges
};
