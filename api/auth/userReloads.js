import { auth } from "../firebase";

let millisecondsToReloadUser = 3000;
const setMillisecondsToReloadUser = milliseconds => {
  millisecondsToReloadUser = milliseconds;
};
const basicUserToJson = user => {
  const keys = [
    "displayName",
    "email",
    "emailVerified",
    "isAnonymous",
    "phoneNumber",
    "photoURL",
    // "providerId",
    "refreshToken",
    "uid"
  ];
  const objectToJson = keys.reduce((ret, key) => {
    ret[key] = user[key];
    return ret;
  }, {});
  return JSON.stringify(objectToJson);
};
const basicUsersInfoAreEqual = users => {
  if (users.length === 0) {
    return false;
  } else if (users.length === 1) {
    return true;
  } else {
    const firstUser = users[0];
    const jsonFirstUser = basicUserToJson(firstUser);
    const differentUser = users.find(user => {
      if (user === firstUser) {
        return false;
      }
      const jsonUser = basicUserToJson(user);
      return jsonUser !== jsonFirstUser;
    });
    return differentUser === undefined;
  }
};
let listObserverCurrentUserReloads = [];
const reloadCurrentUserInMilliseconds = () => {
  if (listObserverCurrentUserReloads.length === 0) {
    return;
  }
  setTimeout(() => {
    if (!auth.currentUser) {
      reloadCurrentUserInMilliseconds();
      return;
    }
    const userBefore = { ...auth.currentUser };
    auth.currentUser
      .reload()
      .then(() => {
        const userAfter = auth.currentUser;
        if (!basicUsersInfoAreEqual([userBefore, userAfter])) {
          listObserverCurrentUserReloads.forEach(callback =>
            callback(userAfter)
          );
        }
      })
      .catch(error =>
        listObserverCurrentUserReloads.forEach(callback => {
          if (
            error.code === "auth/invalid-user-token" ||
            error.code === "auth/user-token-expired"
          ) {
            callback(null);
          } else {
            callback(null, error);
          }
        })
      )
      .finally(reloadCurrentUserInMilliseconds);
  }, millisecondsToReloadUser);
};
const startListenUserReloads = listenCallBack => {
  if (listObserverCurrentUserReloads.indexOf(listenCallBack) === -1) {
    listObserverCurrentUserReloads.push(listenCallBack);
    reloadCurrentUserInMilliseconds();
  }
};
const stopListenUserReloads = listenCallBack => {
  const index = listObserverCurrentUserReloads.indexOf(listenCallBack);
  if (index !== -1) {
    listObserverCurrentUserReloads.splice(index, 1);
  }
};
export {
  setMillisecondsToReloadUser,
  startListenUserReloads,
  stopListenUserReloads
};
