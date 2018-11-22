import { auth as authApi } from "../../../../api";
import onAuthUserChanges from "./onAuthUserChanges";

let listenUserReloadsCallback = null;
const startListenUserReloads = () => (dispatch, getState) => {
  if (!listenUserReloadsCallback) {
    return new Promise((resolve, reject) => {
      let executedBefore = false;
      listenUserReloadsCallback = (user, error) => {
        if (!error) {
          onAuthUserChanges(dispatch, getState, user);
        }
        if (!executedBefore) {
          executedBefore = true;
          if (!error) {
            resolve(user);
          } else {
            reject(error);
          }
        }
      };
      authApi.startListenUserReloads(listenUserReloadsCallback);
    }).finally(() => {
      authApi.setMillisecondsToReloadUser(3000);
    });
  }
  return Promise.reject("Listen alread started");
};
const stopListenUserReloads = () => () => {
  if (listenUserReloadsCallback) {
    authApi.stopListenUserReloads(listenUserReloadsCallback);
    listenUserReloadsCallback = null;
  }
};

export { startListenUserReloads, stopListenUserReloads };
