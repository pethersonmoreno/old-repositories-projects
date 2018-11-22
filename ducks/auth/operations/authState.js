import { auth as authApi } from "../../../api";
import onAuthUserChanges from "./onAuthUserChanges";
let listenChangesCallback = null;
const startListenAuthChanges = () => dispatch => {
  if (!listenChangesCallback) {
    return new Promise((resolve, reject) => {
      let executedBefore = false;
      listenChangesCallback = user => {
        onAuthUserChanges(dispatch, user);
        if (!executedBefore) {
          executedBefore = true;
          resolve(user);
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
export { startListenAuthChanges, stopListenAuthChanges };
