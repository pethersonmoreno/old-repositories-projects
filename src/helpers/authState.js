/* eslint-disable no-console */
import { auth as authApi } from '../api';

let listenChangesCallback = null;
const startListenAuthChanges = () => {
  if (!listenChangesCallback) {
    return new Promise((resolve, reject) => {
      let executedBefore = false;
      listenChangesCallback = user => {
        console.log('auth changes');
        if (!executedBefore) {
          executedBefore = true;
          resolve(user);
        }
      };
      authApi.startListenAuthChanges(listenChangesCallback, error => {
        reject(error);
      });
    });
  }
  return Promise.reject(new Error('Listen alread started'));
};
const stopListenAuthChanges = () => {
  if (listenChangesCallback) {
    authApi.stopListenAuthChanges(listenChangesCallback);
    listenChangesCallback = null;
  }
};
export { startListenAuthChanges, stopListenAuthChanges };
